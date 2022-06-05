import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
  baseUrl: string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }

  public getExpedienteByNoExpediente(expediente: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/expedientes/${expediente}`);
  }

  public getTipoSoporteInterno():Observable<any>{
    return this.http.get(`${this.baseUrl}/soporte/interno`);
  }

  public getTipoSoporteExterno():Observable<any>{
    return this.http.get(`${this.baseUrl}/soporte/externo`);
  }

  public getAsociarBycodigoMuestra(codigoMuestra: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/muestras/${codigoMuestra}`);
  }
}
