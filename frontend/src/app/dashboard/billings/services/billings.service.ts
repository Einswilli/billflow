import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from 'src/app/models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillingsService {

    backendBaseUrl=environment.backendBaseUrl

    constructor(
      private http:HttpClient
    ) { }

    getOptions(){
        return new HttpHeaders({
            "Content-type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('access')!}`,
        })
    }

    list():Observable<Bill[]>{
        return this.http.get<Bill[]>(
            `${this.backendBaseUrl}/billings`,
            {headers:this.getOptions()}
        )
    }

    delete(id:number):Observable<any>{
        return this.http.delete<any>(
            `${this.backendBaseUrl}/billings/${id}`,
            {headers:this.getOptions()}
        )
    }

    add(data:any):Observable<Bill>{
        return this.http.post<Bill>(
            `${this.backendBaseUrl}/billings/`,
            data,{headers:this.getOptions()}
        )
    }

    search(text:string):Observable<any>{
        return this.http.get(
            `${this.backendBaseUrl}/billings?search=${text}`,
            {headers:this.getOptions()}
        )
    }

    paid(id:number):Observable<any>{
        return this.http.put(`${this.backendBaseUrl}/billings/paid/${id}`,{headers:this.getOptions()})
    }
}
