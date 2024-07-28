import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    backendBaseUrl = environment.backendBaseUrl
    category: Product | undefined
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

    list():Observable<Product[]>{
        return this.http.get<Product[]>(
            `${this.backendBaseUrl}/products`,
            {headers:this.getOptions()}
        )
    }

    add(data:any):Observable<any>{
        return this.http.post(
            `${this.backendBaseUrl}/products/`,
            data,{headers:this.getOptions()}
        )
    }

    delete(id:string):Observable<any>{
        return this.http.delete(
            `${this.backendBaseUrl}/products/${id}`,
            {headers:this.getOptions()}
        )
    }

    search(text:string):Observable<any>{
        return this.http.get(
            `${this.backendBaseUrl}/products/?search=${text}`,
            {headers:this.getOptions()}
        )
    }

    filter(text:string):Observable<any>{
        return this.http.get(
            `${this.backendBaseUrl}/products/?category=${text}`,
            {headers:this.getOptions()}
        )
    }

    update(id:string,d:any):Observable<any>{
        return this.http.put<any>(
            `${this.backendBaseUrl}/products/${id}`,
            d,{headers:this.getOptions()}
        )
    }

    //   stats(d:string):Observable<StatsModel[]>{
    //     return this.http.get<StatsModel[]>(`${this.backendBaseUrl}/products/stats/${d}`,{headers:this.getOptions()})
    //   }

    // productStats(id:number,d:string):Observable<StatDetailModel>{
    //     return this.http.get<StatDetailModel>(
    //         `${this.backendBaseUrl}/products/stats/${id}/${d}`,
    //         {headers:this.getOptions()}
    //     )
    // }

    // supply(id:number,q:number):Observable<StatsModel[]>{
    //     return this.http.put<any>(
    //         `${this.backendBaseUrl}/products/${id}/supply/${q}`,
    //         {headers:this.getOptions()}
    //     )
    // }


}
