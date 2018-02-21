import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../services/RestService.service';

@Component({
  selector: 'app-any-bank-payment',
  templateUrl: './any-bank-payment.component.html',
  styleUrls: ['./any-bank-payment.component.css'],
  providers: [RestService]
})
export class AnyBankPaymentComponent implements OnInit {
  signupForm: FormGroup;
  // dateCard: String;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'num_card': new FormControl(null, [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16)
      ]),
      'date_card': new FormControl(null, [
        Validators.required,
        Validators.pattern('(0[1-9]|1[0-2])(1[7-9]|2[0-9]|3[0-5])')
      ]),
      'pin_card': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]),
      'sum_pay': new FormControl(null, [
        Validators.required,
        this.notValidSumPay.bind(this)
      ]),
      'comment': new FormControl(null),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ])
    });
  }

  notValidSumPay(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && (Number(control.value) < 1000 || Number(control.value) > 75000 || control.value[0] === '0')) {
      return {'sumPayIsNotValid': true};
    }
    return null;
  }

  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onSubmit(){
    this.restService.postPayment(this.signupForm).subscribe(
      (data) => console.log(data)
    );
    this.signupForm.reset();
  }
  // maskDate(event) {
  //   if (event.charCode >= 48 && event.charCode <= 57) {
  //     if (this.dateCard.length === 0) {
  //       this.dateCard = '0';
  //     }
  //   }
  //   return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  // }
}
