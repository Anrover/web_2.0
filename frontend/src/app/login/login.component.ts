import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/АuthenticationService.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    model: any = {};
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(result => {
            if (result == true) {
                this.router.navigate(['/admin-panel']);
            }
        }, error => {
            this.error = 'Неправильный логин или пароль';
        });
    }
}
