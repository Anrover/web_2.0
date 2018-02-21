import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-action-data',
  templateUrl: './action-data.component.html',
  styleUrls: ['./action-data.component.css']
})
export class ActionDataComponent implements OnInit {
  // signupForm: FormGroup;
  // signupForm2: FormGroup;
  // signupForm3: FormGroup;
  // dateCard: String;

  ngOnInit() {
    // this.signupForm = new FormGroup({
    //   'num_card': new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(16),
    //     Validators.maxLength(16)
    //   ]),
    //   'date_card': new FormControl(null, [Validators.required]),
    //   'pin_card': new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(3)
    //   ]),
    //   'sum_pay': new FormControl(null, [
    //     Validators.required,
    //     this.notValidSumPay.bind(this)
    //   ]),
    //   'comment': new FormControl(null),
    //   'email': new FormControl(null, [
    //     Validators.required,
    //     Validators.email
    //   ])
    // });
    // this.signupForm2 = new FormGroup({
    //   'payer': new FormControl(null, [
    //     Validators.required,
    //     this.validINN.bind(this)
    //   ]),
    //   'bik': new FormControl(null, [
    //     Validators.required,
    //     Validators.maxLength(9),
    //     Validators.minLength(9)
    //   ]),
    //   'num_account': new FormControl(null, [
    //     Validators.required,
    //     Validators.maxLength(20),
    //     Validators.minLength(20)
    //   ]),
    //   'nds': new FormControl(null, [Validators.required]),
    //   'sum_pay': new FormControl(null, [
    //     Validators.required,
    //     this.notValidSumPay.bind(this)
    //   ])
    // });
    //
    // this.signupForm3 = new FormGroup({
    //   'payer': new FormControl(null, [
    //     Validators.required,
    //     this.validINN.bind(this)
    //   ]),
    //   'bik': new FormControl(null, [
    //     Validators.required,
    //     Validators.maxLength(9),
    //     Validators.minLength(9)
    //   ]),
    //   'num_account': new FormControl(null, [
    //     Validators.required,
    //     Validators.maxLength(20),
    //     Validators.minLength(20)
    //   ]),
    //   'nds': new FormControl(null, [Validators.required]),
    //   'sum_pay': new FormControl(null, [
    //     Validators.required,
    //     this.notValidSumPay.bind(this)
    //   ]),
    //   'email': new FormControl(null, [
    //     Validators.required,
    //     Validators.email
    //   ]),
    //   'num_telephone': new FormControl(null, [Validators.required])
    // });
  }

  // onSubmit() {
  //   console.log(this.signupForm);
  // }
  //
  // notValidSumPay(control: FormControl): { [s: string]: boolean } {
  //   if (control.value != null && (Number(control.value) < 1000 || Number(control.value) > 75000 || control.value[0] === '0')) {
  //     return {'sumPayIsValid': true};
  //   }
  //   return null;
  // }
  //
  // validINN(control: FormControl): { [s: string]: boolean } {
  //   if (control.value != null && (control.value.length < 10 || control.value.length > 12)) {
  //     return {'sumPayIsValid': true};
  //   }
  //   return null;
  // }
  //
  // onlyNumberKey(event) {
  //   return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  // }
  //
  // maskDate(event) {
  //   if (event.charCode >= 48 && event.charCode <= 57) {
  //     if (this.dateCard.length === 0) {
  //       this.dateCard = '0';
  //     }
  //   }
  //   return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  // }
}
