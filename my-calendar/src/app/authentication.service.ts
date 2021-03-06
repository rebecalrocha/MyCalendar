import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //se currentUser não é null e se tem token
        this.token = currentUser && currentUser.token;
    }

    login(email, password): Observable<any> {
        return this.http.post('http://127.0.0.1:5000/login', JSON.stringify({ email: email, password: password }))
            .pipe(
                map((data: any)  => {
                    //login successful if there's a jwt token in the response
                    let token = data && data.token;
                    if (token) {
                        // set token property
                        this.token = token;

                        // store email and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));
                    }
                    return data;
                })
            );
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}