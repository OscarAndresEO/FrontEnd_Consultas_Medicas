import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { SolicitudesService } from '../Services/solicitudes.service';

@Component({
  selector: 'app-seguimiento-solicitud',
  templateUrl: './seguimiento-solicitud.component.html',
  styleUrls: ['./seguimiento-solicitud.component.scss']
})
export class SeguimientoSolicitudComponent implements OnInit {

  informacionFormGroup: FormGroup;
  date: Date;
  codigoSolicitud: any;
  codigoEstado: any;
  auxEstado: any;
  nit: any;
  usuarioCrea: any;
  selectedFile: any;
  nitAnalista: any;
  nombreAnalista: any;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private datePipe: DatePipe) {

      this.informacionFormGroup = this._formBuilder.group({
        codigoSolicitudFormControl: [''],
        descripcionFormControl: [''],
        estadoActualFormControl: [''],
        nuevoEstadoFormControl: [''],
        observaciones: ['', [Validators.required]],
        documento: ['', [Validators.required]]
      });

      this.date = new Date();
    }

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        this.codigoSolicitud = res.get('codigo_solicitud');
        this.auxEstado = res.get('nuevo_estado');
        this.nit = res.get('nit');
        this.solicitudesService.getSolicitudes(this.codigoSolicitud, '0', '0', '0', '0', '0', '0', '0', '0').subscribe(res => {
          if(res.length !== 0) {
            for(let i = 0; i< res.length; i++) {
              res[i].fecha_creacion = String(moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY'))
            }
            console.log('datos del indfasd', res)
            this.nitAnalista = res[0].usuario_anterior;
            console.log('analista es ', this.nitAnalista)
            this.informacionFormGroup.get('codigoSolicitudFormControl')?.setValue(this.codigoSolicitud);
            this.informacionFormGroup.get('descripcionFormControl')?.setValue(res[0].descripcion);
            this.informacionFormGroup.get('estadoActualFormControl')?.setValue(res[0].estado)
            this.codigoEstado = res[0].codigo_estado;
            this.usuarioCrea = res[0].usuario_creacion;
            switch(this.auxEstado) {
              case '1':
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Analisis");
                break;

              case '2':
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Rechazado");
                break;

              case '3':
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Espera");
                break;

                case '4':
                  this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Revision");
                  break;
  

            }
          }
        })
      }
    })
  }

  fileSelected(event: any)
  {
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile.type !== "application/pdf") {
      Swal.fire({
        icon: 'error',
        title: 'Debe subir un archivo PDF'
      })
      this.informacionFormGroup.get('documento')?.reset()
    } 
    if (this.selectedFile.size > 5000000) {
      Swal.fire({
        icon: 'error',
        title: 'El tamaño máximo permitido es de 5 MB'
      })
      this.informacionFormGroup.get('documento')?.reset()
    }
    console.log(this.selectedFile)
  };

  cambiarEstado() {
    switch(this.auxEstado) {
      case '1':
        this.analisis();
        break;

      case '2':
        this.rechazar();
        break;
      
      case '3':

        break;

      case '4':
        this.revisar();
        break;

    }
  }

  analisis() {
    this.cambioEstado(11);
  }

  regresarBandejaCentralizador() {
    this.router.navigate(['bandeja-centralizador/', this.nit]);
  }

  cambioEstado(codigo_estado: any) {
    const solicitud = {
      codigo_solicitud: this.codigoSolicitud,
      usuario_asignacion: this.nit,
      codigo_estado: codigo_estado,
      fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_modificacion: this.nit,
      usuario_anterior: this.nitAnalista,
      ip_usuario_modificacion: '192.168.1.18'
    }
    this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
      Swal.fire({
        titleText: `El cambio de estado a la solicitud se realizó con éxito.`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
    });

    const formData = new FormData();
          formData.append('file', this.selectedFile);
    const historial = {
      codigo_historial: 0,
      codigo_solicitud: this.codigoSolicitud,
      usuario: this.nit,
      codigo_estado: codigo_estado,
      fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_creacion: this.nit,
      ip_usuario_creacion: '192.168.1.18',
      adjunto: formData,
      observaciones_cambio_estado: this.informacionFormGroup.get('observaciones')?.value,
      fecha_modificacion: null,
      usuario_modificacion: null,
      ip_usuario_modificacion: null
    }
    this.solicitudesService.insertHistorial(historial).subscribe(res => {
      console.log('se creo correctamente el historial, ', historial)
    }, err => {
      Swal.fire('No se pudo almacenar la solicitud', '', 'error')
    });
    this.regresarBandejaCentralizador();
  }

  rechazar() {
    const solicitud = {
      codigo_solicitud: this.codigoSolicitud,
      usuario_asignacion: this.nitAnalista,
      usuario_anterior: this.nitAnalista,
      revisor_anterior: this.nit,
      codigo_estado: 14,
      fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_modificacion: this.nit,
      ip_usuario_modificacion: '192.168.1.18'
    }
    this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
      Swal.fire({
        titleText: `El cambio de estado a la solicitud se realizó con éxito.`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
    });

    const formData = new FormData();
          formData.append('file', this.selectedFile);
    const historial = {
      codigo_historial: 0,
      codigo_solicitud: this.codigoSolicitud,
      usuario: this.nit,
      codigo_estado: 14,
      fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_creacion: this.nit,
      ip_usuario_creacion: '192.168.1.18',
      adjunto: formData,
      observaciones_cambio_estado: this.informacionFormGroup.get('observaciones')?.value,
      fecha_modificacion: null,
      usuario_modificacion: null,
      ip_usuario_modificacion: null
    }
    this.solicitudesService.insertHistorial(historial).subscribe(res => {
      console.log('se creo correctamente el historial, ', historial)
    }, err => {
      Swal.fire('No se pudo almacenar la solicitud', '', 'error')
    });
    this.regresarBandejaCentralizador();
  }

  revisar() {
    const solicitud = {
      codigo_solicitud: this.codigoSolicitud,
      usuario_asignacion: this.nitAnalista,
      codigo_estado: 12,
      fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_modificacion: this.nit,
      ip_usuario_modificacion: '192.168.1.18'
    }
    this.solicitudesService.getDatosUsuario(this.nitAnalista).subscribe(res => {
      this.nombreAnalista = res[0].nombre_usuario
    })

    this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
      Swal.fire({
        titleText: `El cambio de estado a la solicitud se realizó con éxito.`,
        html: `La solicitud regresó a la bandeja del analista: <b>${this.nombreAnalista} </b>`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
    });

    const formData = new FormData();
          formData.append('file', this.selectedFile);
    const historial = {
      codigo_historial: 0,
      codigo_solicitud: this.codigoSolicitud,
      usuario: this.nit,
      codigo_estado: 12,
      fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_creacion: this.nit,
      ip_usuario_creacion: '192.168.1.18',
      adjunto: formData,
      observaciones_cambio_estado: this.informacionFormGroup.get('observaciones')?.value,
      fecha_modificacion: null,
      usuario_modificacion: null,
      ip_usuario_modificacion: null
    }
    this.solicitudesService.insertHistorial(historial).subscribe(res => {
      console.log('se creo correctamente el historial, ', historial)
    }, err => {
      Swal.fire('No se pudo almacenar la solicitud', '', 'error')
    });
    this.regresarBandejaCentralizador();
  }
}
