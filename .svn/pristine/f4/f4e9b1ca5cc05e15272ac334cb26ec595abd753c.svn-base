import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  baseUrl: string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }
  public getMuestraByCodigoMuestra(codigoMuestra: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/muestras/${codigoMuestra}`);
  }

  public getAllSolicitudes():Observable<any>{
    return this.http.get(`${this.baseUrl}/obtener/all/solicitudes/creadas`);
  }

  public getItemsAsociados(codigo_muestra: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/muestras/items/asociados/${codigo_muestra}`);
  }

  public getAllMuesteras():Observable<any>{
    return this.http.get(`${this.baseUrl}/obtener/all/muestras`);
  }

  public insertarItems(items: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/muestras/items`, items)
  }

  public insertarItemsSolicitudes(items: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/solicitudes/items/asociados`, items)
  }

  public insertMuestras(muestras: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/muestras/muestras/medicas`,muestras)
  }

  public insertEtiqueta(etiqueta: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/etiquetea/muestra`,etiqueta)
  }
}
