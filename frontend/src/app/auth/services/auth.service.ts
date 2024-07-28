import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    backendBaseUrl = environment.backendBaseUrl
    user: User | undefined
    private authToken!: string;

    constructor(
        private http:HttpClient,
        private jwtHelper:JwtHelperService
    ) { }

    // IS USER AUTHENTICATED
    public isAuthenticated(): boolean{
        const token = localStorage.getItem('access')

        // alert(!this.jwtHelper.isTokenExpired(token))
        return !this.jwtHelper.isTokenExpired(token)
    }

    // BUILD REQUEST HEADERS
    getOptions(){
        return new HttpHeaders({
          "Content-type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem('access')!}`,
        })
    }

    // LOGIN
    login(data:any):Observable<any>{
        return this.http.post(`${this.backendBaseUrl}/auth/login`,data)
    }
}
