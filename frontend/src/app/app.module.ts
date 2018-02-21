import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxMaskModule} from 'ngx-mask';

import { AppComponent } from './app.component';
import { UserComponent } from './payment-page/user/user.component';
import { ActionDataComponent } from './payment-page/action-data/action-data.component';
import { AboutCompanyComponent } from './payment-page/about-company/about-company.component';
import { FooterComponent } from './payment-page/footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ChoiceActionComponent } from './payment-page/action-data/choice-action/choice-action.component';
import { PaymentComponent } from './payment-page/action-data/payment/payment.component';
import { ChoicePaymentMethodComponent } from './payment-page/action-data/payment/choice-payment-method/choice-payment-method.component';
import { RequestPaymentComponent } from './payment-page/action-data/request-payment/request-payment.component';
import { AnyBankPaymentComponent } from './payment-page/action-data/payment/any-bank-payment/any-bank-payment.component';
import { SelfBankPaymentComponent } from './payment-page/action-data/payment/self-bank-payment/self-bank-payment.component';
import {HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/АuthenticationService.service'
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ListPaymentsComponent } from './admin-panel/list-payments/list-payments.component';
import { ListReqPaymentsComponent } from './admin-panel/list-req-payments/list-req-payments.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { AuthGuard } from '../app/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: PaymentPageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'admin-panel', component: AdminPanelComponent, pathMatch: 'full', canActivate: [AuthGuard] }
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ActionDataComponent,
    AboutCompanyComponent,
    FooterComponent,
    ChoiceActionComponent,
    PaymentComponent,
    ChoicePaymentMethodComponent,
    RequestPaymentComponent,
    AnyBankPaymentComponent,
    SelfBankPaymentComponent,
    LoginComponent,
    AdminPanelComponent,
    ListPaymentsComponent,
    ListReqPaymentsComponent,
    PaymentPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
