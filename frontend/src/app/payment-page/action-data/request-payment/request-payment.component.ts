import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../services/RestService.service';

@Component({
  selector: 'app-request-payment',
  templateUrl: './request-payment.component.html',
  styleUrls: ['./request-payment.component.css'],
  providers: [RestService]
})
export class RequestPaymentComponent implements OnInit {
  NDSvalue = '0';
  NDSPrint = 'НДС ' + this.NDSvalue + '%';
  signupForm3: FormGroup;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.signupForm3 = new FormGroup({
      'payer': new FormControl(null, [
        Validators.required,
        this.validINN.bind(this)
      ]),
      'bik': new FormControl(null, [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9)
      ]),
      'num_account': new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(20)
      ]),
      'nds': new FormControl(null),
      'sum_pay': new FormControl(null, [
        Validators.required,
        this.notValidSumPay.bind(this)
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'num_telephone': new FormControl(null, [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ])
    });
  }

  validINN(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && (control.value.length != 10 && control.value.length != 12)) {
      return {'sumPayIsValid': true};
    }
    return null;
  }

  notValidSumPay(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && (Number(control.value) < 1000 || Number(control.value) > 75000 || control.value[0] === '0')) {
      return {'sumPayIsNotValid': true};
    }
    return null;
  }

  chooseNDS(event: any, val: string) {
    let ndss = document.getElementsByClassName('button-nds');
    for (let i = 0; i < ndss.length; i++) {
      if (ndss[i].classList.contains('ndsActive')) {
        ndss[i].classList.remove('ndsActive');
      }
    }
    let el = <HTMLElement>event.currentTarget;
    el.classList.add('ndsActive');
    this.NDSvalue = val;
    this.updPrint();
  }

  updPrint() {
    this.NDSPrint = 'НДС ' + this.NDSvalue + '%';
  }

  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  clearInputs(event) {
    this.signupForm3.reset();
  }

  onSubmit() {
    this.restService.postReqPayment(this.signupForm3).subscribe(
      (data) => console.log(data)
    );
    this.signupForm3.reset();
  }

}
