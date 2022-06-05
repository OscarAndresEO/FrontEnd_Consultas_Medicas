import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset = UTF-8';
const EXCEL_EXT = '.xlsx';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class SolicitudesService {

  baseUrl: string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }

  public insertSolicitud(solicitud: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/solicitudes/muestras/medicas`,solicitud)
  }

  public insertHistorial(solicitud: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/historial/estados`,solicitud)
  }

  public eliminarSolicitud(solicitud: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/solicitudes/eliminar`, solicitud)
  }

  public asignarSolicitud(solicitud: any):Observable<any>{
    console.log('datos a enviar ' ,solicitud)
    return this.http.put(`${this.baseUrl}/asignar`, solicitud)
  }

  public actualizarUsuario(usuario: any):Observable<any>{
    console.log('datos a enviar ' ,usuario)
    return this.http.put(`${this.baseUrl}/usuarios`, usuario)
  }

  public getSolicitudes(codigoSolicitud: any, no_expediente: any, no_soporte: any, usuario_asignacion: any, nit: any, codigo_tipo_solicitud: any, codigo_estado: any, fecha_inicio: any, fecha_fin: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/${codigoSolicitud}/${no_expediente}/${no_soporte}/${usuario_asignacion}/${nit}/${codigo_tipo_solicitud}/${codigo_estado}/${fecha_inicio}/${fecha_fin}`);
  }

  public getSolicitudesExcel(codigoSolicitud: any, no_expediente: any, no_soporte: any, usuario_asignacion: any, nit: any, codigo_tipo_solicitud: any, codigo_estado: any, fecha_inicio: any, fecha_fin: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/excel/${codigoSolicitud}/${no_expediente}/${no_soporte}/${usuario_asignacion}/${nit}/${codigo_tipo_solicitud}/${codigo_estado}/${fecha_inicio}/${fecha_fin}`);
  }

  public getSolicitudesByCodigo(codigoSolicitud: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/por/codigo/${codigoSolicitud}`);
  }

  public getLogin(user: any, pass: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/login/${user}/${pass}`);
  }

  public getSolicitudesByCentralizador(usuarioAsignacion: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/centralizador/${usuarioAsignacion}`);
  }

  public getSolicitudesByUsuarioCreacion(usuarioCreacion: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/usuario/creacion/${usuarioCreacion}`);
  }

  public getHistorialEstados(codigoSolicitud: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/historial/estados/${codigoSolicitud}`);
  }

  public getComentarioByCodigoAndEstado(codigoSolicitud: any, codigoEstado: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/comentarios/solicitud/estado/${codigoSolicitud}/${codigoEstado}`);
  }

  public getCentralizador():Observable<any>{
    return this.http.get(`${this.baseUrl}/obtener/usuarios/rnd`);
  }

  public getAnalista():Observable<any>{
    return this.http.get(`${this.baseUrl}/obtener/analistas/rnd`);
  }

  public getRevisor():Observable<any>{
    return this.http.get(`${this.baseUrl}/obtener/revisor/rnd`);
  }

  public getEtiquetas(codigo_solicitud: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/etiquetas/${codigo_solicitud}`);
  }

  public getDatosUsuario(nit_usuario: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/datos/user/${nit_usuario}`);
  }

  public getSolicitudesByEstadoAndUsuario(estado: any, usuario: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/estado/usuario/${estado}/${usuario}`);
  }

  public exportToExcel(json:any[], excelFileName: string): void{
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet},
    SheetNames:['data']
    };
    const excelBuffer: any= XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    // llamar al metodo
    this.saveExcel(excelBuffer, excelFileName);
  }

  private saveExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXT);
  }
}
