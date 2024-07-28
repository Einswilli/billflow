import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    backendBaseUrl = environment.backendBaseUrl
    category: Category | undefined
    private authToken!: string;

    constructor(
        private http:HttpClient,
    ) { }

    // BUILD REQUEST HEADER
    getOptions(){
        return new HttpHeaders({
        "Content-type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('access')!}`,
        })
    }

    list():Observable<Category[]>{
        return this.http.get<Category[]>(
            `${this.backendBaseUrl}/categories`,
            {headers:this.getOptions()}
        )
    }

    delete(id:string):Observable<any>{
        return this.http.delete<any>(
            `${this.backendBaseUrl}/categories/${id}`,
            {headers:this.getOptions()}
        )
    }

    add(data:any):Observable<Category>{
        return this.http.post<Category>(
            `${this.backendBaseUrl}/categories/`,
            data,{headers:this.getOptions()}
        )
    }

    search(text:string):Observable<Category[]>{
        return this.http.get<Category[]>(
            `${this.backendBaseUrl}/categories?search=${text}`,
            {headers:this.getOptions()}
        )
    }

    update(id:string,d:any):Observable<Category>{
        return this.http.put<Category>(
            `${this.backendBaseUrl}/categories/${id}`,
            d,{headers:this.getOptions()}
        )
    }

    request(url:string):Observable<Category[]>{
        return this.http.get<Category[]>(
            url,{headers:this.getOptions()}
        )
    }
}
