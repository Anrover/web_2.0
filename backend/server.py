from flask import Flask
import json
import io
import flask
import postgresql
from flask import request
import re
from flask_cors import CORS, cross_origin
import mchmodule
import jwt
import time
from flask import request
START_NUM_PAY = 4235332
KEY = 'tTi8QXGJ67q'
DICT_FIELDS = {'id': 'id', 'номер карты': 'numCard', "дата": 'dateCard', 'cvc': 'pinCard',
                'сумма': 'sumPay', 'комментарий': 'comment', 'email': 'email', 'безопасность': 'notSafe',
                'инн': 'payer', 'бик': 'bik', 'номер счета': 'numAccount', 'ндс': 'nds',
                 'номер телефона': 'numTelephone'}
app = Flask(__name__)
app.debug = True
cors = CORS(app)


def check_token(token):
    try:
        with db_conn() as db:
            dectocen = jwt.decode(token, KEY, algorithm='HS256')
            entry = db.query("SELECT token FROM users WHERE id = '{}'".format(dectocen['id']))
            if entry[0][0] != token:
                raise Exception
            entrytoken = jwt.decode(entry[0][0], KEY, algorithm='HS256')
            return entrytoken, dectocen, None
    except Exception as e:
        return None, None, e
    

def db_conn():
    return postgresql.open('pq://postgres:********@localhost:5432/mydb')

def respon(code, data):
    return flask.Response(
        status=code,
        mimetype="application/json",
        response=to_json(data)
    )

def parse_date(date):
    month = date[:2]
    year = date[2:]
    return "20{}-{}-01".format(year, month)


def theme_validate():
    errors = []
    js = json.loads(request.get_data().decode())
    if js is None:
        errors.append(
            "No JSON sent. Did you forget to set Content-Type header" +
            " to application/json?")
        return (None, errors)
    return js, errors


def to_json(data):
    return json.dumps(data) + "\n"


@app.route("/api/card-payment/", methods=['POST'])
def post_card_payment():
    js, errors = theme_validate()
    if errors:
        return respon(400, {"errors": errors})
    with db_conn() as db:
        ins = db.prepare(
            "INSERT INTO paymentsByCards (numCard, dateCard, pinCard, sumPay, comment, email)"
                 " VALUES ($1, $2, $3, $4, $5, $6)")
        ins(js['num_card'], parse_date(js['date_card']), js['pin_card'],
         int(js['sum_pay']), js['comment'], js['email'])
        return respon(200, {"ans": "Success!"})


@app.route("/api/card-req-payment/", methods=['POST'])
def post_card_req_payment():
    js, errors = theme_validate()
    if errors:
        return respon(400, {"errors": errors})
    with db_conn() as db:
        ins = db.prepare("INSERT INTO reqPaymentsByCards (payer, bik, numAccount, nds, sumPay, email, numTelephone)"
                         " VALUES ($1, $2, $3, $4, $5, $6, $7)")
        _, a = ins(js['payer'], js['bik'], js['num_account'], int(re.findall('(\d+)', js['nds'])[0]),
                   int(js['sum_pay']), js['email'], js['num_telephone'])
        a = respon(200, {"ans": "Success!"})
        return a


@app.route("/api/self-payment/", methods=['GET'])
def get_self_payment():
    try:
        req = dict(request.args)
        for key in req:
            req[key] = req[key][0]
        mchmodule.make_charge(START_NUM_PAY, req, "charge.doc")
    except:
        return respon(400, {"errors": ["Error!!!"]})
    return flask.send_file("charge.doc", as_attachment=True, attachment_filename='charge.doc',
                           mimetype='Content-Type: application/msword')


@app.route("/api/card-payment", methods=['GET'])
def get_card_payments():
    entries = []
    try:
        req = dict(request.args)
        entrytoken, dectoken, error = check_token(req['token'][0])
        if error != None:
            raise Exception
        sortfield = DICT_FIELDS[str.lower(req['sortfield'][0])]
        with db_conn() as db:
            if req['searchfield'][0] == '------':
                entries = db.query("SELECT * FROM paymentsbycards ORDER BY " + sortfield + " ASC")
            else:
                entries = db.query("SELECT id, numCard, dateCard, pinCard, sumPay, comment, email, notSafe"
                                " FROM paymentsbycards WHERE CAST({} AS TEXT) LIKE {}"
                                " ORDER BY {} ASC".format(DICT_FIELDS[str.lower(req['searchfield'][0])],
                                                        "'" + req.get('comment', [''])[0] + "'",
                                                        sortfield))
    except:
        return respon(400, {"errors": ["Error!!!"]})
    return respon(200,  {
        'header': ['ID', 'Номер карты', 'Дата', 'CVC', 'Сумма', 'Комментарий', 'email'],#, 'Безопасность'],
        'entries': entries
    })

@app.route("/api/card-req-payment", methods=['GET'])
def get_card_req_payments():
    entries = []
    try:
        req = dict(request.args)
        entrytoken, dectoken, error = check_token(req['token'][0])
        if error != None:
            raise Exception
        sortfield = DICT_FIELDS[str.lower(req['sortfield'][0])]
        with db_conn() as db:
            if req['searchfield'][0] == '------':
                entries = db.query("SELECT * FROM reqpaymentsbycards ORDER BY " + sortfield + " ASC")
            else:
                entries = db.query("SELECT id, payer, bik, numAccount, nds, sumPay, email, numTelephone"
                                " FROM reqpaymentsbycards WHERE CAST({} AS TEXT) LIKE {}"
                                " ORDER BY {} ASC".format(DICT_FIELDS[str.lower(req['searchfield'][0])],
                                                        "'" + req.get('comment', [''])[0] + "'",
                                                        sortfield))
    except:
        return respon(400, {"errors": ["Error!!!"]})
    return respon(200, {
        'header': ['ID', 'ИНН', 'БИК', 'Номер счета', 'НДС', 'Сумма', 'email', 'Номер телефона'],
        'entries': entries
    })

@app.route("/api/card-payment/", methods=['PATCH'])
def patch_self_entry():
    js, errors = theme_validate()
    try:
        entrytoken, dectoken, error = js['token']
        if error != None:
            raise Exception
        with db_conn() as db:
            res = db.query("UPDATE paymentsbycards SET notSafe = {} WHERE id = {}".format(js['notSafe'], js['id']))
    except:
        return respon(400, {"errors": ["Error!!!"]})
    return respon(200, {"ans": "Success!"})


@app.route("/api/authenticate/", methods=['POST'])
def authenticate():
    js, errors = theme_validate()
    if errors:
        return respon(400, {"errors": errors})
    try:
        with db_conn() as db:
            login = js['login']
            passw = js['password']
            entry = db.query("SELECT id, login, password, token FROM users WHERE login = '{}' AND password = '{}'"
                            .format(login, passw))
            if len(entry) == 0:
                return respon(401, {"ans": "yyyps", "errors": ["Incorrect password or login"]})
            entry = entry[0]
            token = jwt.encode({'login': entry[1], 'id': entry[0],
             'exp': time.time() + 3600*24*4, 'time': time.time() + 1800},
             KEY, algorithm='HS256').decode()
            db.query("UPDATE users SET token = '{}' WHERE id = {}".format(token, str(entry[0])))
            return respon(200, {"token": token})
    except:
        return respon(401, {"errors": ["Error!!!"]})


@app.route("/api/refresh-token/", methods=['POST'])
def refresh_token():
    js, errors = theme_validate()
    if errors:
        return respon(400, {"errors": errors})
    try:
        token = js['token']
        entrytoken, dectocen, error = check_token(token)
        if error != None:
            raise Exception
        print(entrytoken)
        with db_conn() as db:
            if dectocen['time'] < time.time():
                token = jwt.encode({'login': dectocen['login'], 'id': dectocen['id'],
                 'exp': time.time() + 3600*24*4, 'time': time.time() + 1800}, KEY, algorithm='HS256').decode()
                db.query("UPDATE users SET token = '{}' WHERE id = {}".format(token, dectocen['id']))
            print(token)
            return respon(200, {"token": token})
    except:
        return respon(401, {"errors": ["Error!!!"]})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
