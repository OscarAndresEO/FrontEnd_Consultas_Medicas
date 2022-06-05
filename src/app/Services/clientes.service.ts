import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseUrl: string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }

  public getClientesByNit(nit_cliente: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/clientes/${nit_cliente}`);
   }
}
