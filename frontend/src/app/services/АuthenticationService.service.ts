import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class AuthenticationService {

    public token: string;

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<boolean> {
        console.log('gogogo');
        return this.http.post('http://localhost:5000/api/authenticate/',
         JSON.stringify({ login: username, password: password }))
            .map((response: Response) => {
                console.log(response);
                // if (response.status == 401)
                //     return false;
                let token = response['token'];
                localStorage.setItem('currentUser', JSON.stringify({ login: username, token: token }));
                return true;
            });
    }

    refreshToken(username: string, token: string) {
        console.log('refresh');
        return this.http.post('http://localhost:5000/api/refresh-token/',
         JSON.stringify({ token: token })).map((response: Response) => {
            console.log('map');
            if (token != response['token'])
                localStorage.setItem('currentUser', JSON.stringify({ login: username,
                     token: response['token'] }));
            return response;
        });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}
