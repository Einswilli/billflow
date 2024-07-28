import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

    backendBaseUrl = environment.backendBaseUrl

    constructor(
      private http : HttpClient,
    ) { }

    getOptions(){
        return new HttpHeaders({
            "Content-type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('access')!}`,
        })
    }

    list():Observable<Client[]>{
        return this.http.get<Client[]>(
            `${this.backendBaseUrl}/clients`,
            {headers:this.getOptions()}
        )
    }

    add(data:any):Observable<any>{
        return this.http.post(
            `${this.backendBaseUrl}/clients/`,
            data,{headers:this.getOptions()}
        )
    }

    delete(_id:string){
        return this.http.delete(
            `${this.backendBaseUrl}/clients/${_id}`,
            {headers:this.getOptions()}
        )
    }

    search(text:string):Observable<any>{
        return this.http.get(
            `${this.backendBaseUrl}/clients?search=${text}`,
            {headers:this.getOptions()}
        )
    }

    update(id:string,d:any):Observable<any>{
        return this.http.put(
            `${this.backendBaseUrl}/clients/${id}`,
            d,{headers:this.getOptions()}
        )
    }
}
