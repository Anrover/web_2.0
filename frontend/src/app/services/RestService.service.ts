import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import {RequestOptions, ResponseContentType} from '@angular/http';

@Injectable()
export class RestService {

  constructor(private http: HttpClient) { }


  httpOptionsJs = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  postPayment(form: FormGroup) {
    console.log(JSON.stringify(form.getRawValue()));
    return this.http.post('http://localhost:5000/api/card-payment/',
      JSON.stringify(form.getRawValue()));
  }

  postReqPayment(form: FormGroup) {
    console.log(JSON.stringify(form.getRawValue()));
    return this.http.post('http://localhost:5000/api/card-req-payment/',
      JSON.stringify(form.getRawValue()));
  }

  getCharge(form: FormGroup) {
    let params = new HttpParams();
    const formValue = form.value; // this.form should be a FormGroup
    for (let key in formValue) {
      console.log(key, formValue[key]);
      params = params.set(key, formValue[key]);
    }
    window.location.href='http://localhost:5000/api/self-payment?' + params.toString();
    // const requestOptions = {
    //   params: params,
    //   HttpHeaders: new HttpHeaders({ 'Content-Type': 'application/msword', 'Cache-Control': 'no-cache' })
    // };
    // console.log(params.toString());
    // return this.http.get('http://localhost:5000/api/self-payment', requestOptions);
  }

  getListPayments(model: any) {
    // let params = new HttpParams();
    let item = JSON.parse(localStorage.getItem('currentUser'));
    let params = new HttpParams().set('token', item['token']);
    for (let key in model) {
      params = params.set(key, model[key]);
    }
    return this.http.get('http://localhost:5000/api/card-payment', {params: params});
  }

  patchSafeEntry(id: Number, notSafe: boolean) {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.patch('http://localhost:5000/api/card-payment/',
     {'id': id, 'notSafe': notSafe, 'token': item['token']}, {observe: 'response'});
  }

  getListReqPayments(model: any) {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    let params = new HttpParams().set('token', item['token']);
    // let params = new HttpParams();
    for (let key in model) {
      params = params.set(key, model[key]);
    }
    return this.http.get('http://localhost:5000/api/card-req-payment', {params: params});
  }
}
