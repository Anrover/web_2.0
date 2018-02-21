import postgresql

db = postgresql.open('pq://postgres:*******@localhost:5432/mydb')
db.execute("DROP TABLE IF EXISTS users")
db.execute("DROP TABLE IF EXISTS paymentsByCards")
db.execute("DROP TABLE IF EXISTS reqPaymentsByCards")
db.execute("CREATE TABLE paymentsByCards"
           " (id SERIAL PRIMARY KEY,"
           " numCard VARCHAR(64),"
           " dateCard VARCHAR(64),"
           " pinCard VARCHAR(64),"
           " sumPay INTEGER,"
           " comment VARCHAR(500),"
           " email VARCHAR(100),"
           " notSafe BOOLEAN DEFAULT False)"
)
db.execute("CREATE TABLE reqPaymentsByCards"
           " (id SERIAL PRIMARY KEY,"
           " payer VARCHAR(64),"
           " bik VARCHAR(64),"
           " numAccount VARCHAR(64),"
           " nds INTEGER,"
           " sumPay INTEGER,"
           " email VARCHAR(64),"
           " numTelephone VARCHAR(64))"
)

db.execute("CREATE TABLE users"
           " (id SERIAL PRIMARY KEY,"
           " login VARCHAR(64),"
           " password VARCHAR(64),"
           " token VARCHAR(300))"
)
print(1)