import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { SolicitudesService } from '../Services/solicitudes.service';

@Component({
  selector: 'app-cambio-estado',
  templateUrl: './cambio-estado.component.html',
  styleUrls: ['./cambio-estado.component.scss']
})
export class CambioEstadoComponent implements OnInit {
  informacionFormGroup: FormGroup;
  nitCentralizador: any;
  nombreCentralizador: any;
  codigoSolicitud: any;
  date: Date;
  codigoEstado: any;
  nitLogin: any;
  usuarioCrea: any;
  selectedFile: any;
  usuarioAnterior: any;
  ultimoCentralizador: any;

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

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        this.codigoSolicitud = res.get('codigo_solicitud');
        this.nitLogin = res.get('nit_login')
        this.solicitudesService.getSolicitudes(this.codigoSolicitud, '0', '0', '0', '0', '0', '0', '0', '0').subscribe(res => {
          if(res.length !== 0) {
            for(let i = 0; i< res.length; i++) {
              res[i].fecha_creacion = String(moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY'))
            }
            console.log(res)
            this.usuarioAnterior = res[0].usuario_asignacion;
            this.informacionFormGroup.get('codigoSolicitudFormControl')?.setValue(this.codigoSolicitud);
            this.informacionFormGroup.get('descripcionFormControl')?.setValue(res[0].descripcion);
            this.informacionFormGroup.get('estadoActualFormControl')?.setValue(res[0].estado)
            this.codigoEstado = res[0].codigo_estado;
            this.usuarioCrea = res[0].usuario_creacion;
            this.ultimoCentralizador = res[0].revisor_anterior;
            switch(res[0].codigo_estado) {
              
              case 8:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Enviado");
                break;

              case 9:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Asignado");
                break;

              case 11:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Revision");
              break;

              case 12:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Autorizar");
                break;

              case 14:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Reasignar");
              break;
            }
          }
        })
      }
    })
  }

  cambiarEstado() {
    switch(this.codigoEstado) {
      case 8:
      this.enviar();
      break;
      case 9:
      this.asignar();
      break;
      case 12:
      this.autorizar();
      break;
      case 14:
      this.reasignar();
      break;
    }
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

  reasignar() {

    this.solicitudesService.getDatosUsuario(this.ultimoCentralizador).subscribe(res=>{
      this.nombreCentralizador = res[0].nombre_usuario;
    })
    const solicitud = {
      codigo_solicitud: this.codigoSolicitud,
      usuario_asignacion: this.ultimoCentralizador,
      codigo_estado: 10,
      fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_modificacion: this.nitLogin,
      ip_usuario_modificacion: '192.168.1.18',
      usuario_anterior: this.usuarioAnterior
    }

    this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
      Swal.fire({
        titleText: `El cambio de estado a la solicitud se realizó con éxito. Se ha asignado la solicitud al centralizador con los siguientes datos:`,
        html: `<b>NIT: </b> ${this.ultimoCentralizador} <br> <b>Nombre: </b> ${this.nombreCentralizador}`,
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
      usuario: this.nitLogin,
      codigo_estado: 10,
      fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_creacion: this.nitLogin,
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

    this.regresarAMantenimientoSolicitudes();
  }

  asignar() {
    this.solicitudesService.getCentralizador().subscribe(res => {
      this.nitCentralizador = res[0].nit_usuario
      this.nombreCentralizador = res[0].nombre_usuario
      const solicitud = {
        codigo_solicitud: this.codigoSolicitud,
        usuario_asignacion: this.nitCentralizador,
        codigo_estado: 10,
        fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
        usuario_modificacion: this.nitLogin,
        ip_usuario_modificacion: '192.168.1.18',
        usuario_anterior: this.usuarioAnterior
      }
      console.log(solicitud)
      this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
        Swal.fire({
          titleText: `El cambio de estado a la solicitud se realizó con éxito. Se ha asignado la solicitud al centralizador con los siguientes datos:`,
          html: `<b>NIT: </b> ${this.nitCentralizador} <br> <b>Nombre: </b> ${this.nombreCentralizador}`,
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
        usuario: this.nitLogin,
        codigo_estado: 10,
        fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
        usuario_creacion: this.nitLogin,
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

      const usuario = {
        fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
        usuario_modificacion: this.nitLogin,
        ip_usuario_modificacion: '192.168.1.18',
        nit_usuario: this.nitCentralizador
      }

      this.solicitudesService.actualizarUsuario(usuario).subscribe(res => {
        console.log('se creo correctamente la actualizacion de usuario')
      }, err => {
        console.log('no se pudo actualizar el usuario.')
      })
      this.regresarAMantenimientoSolicitudes();
    })
  }

  enviar() {
    const solicitud = {
      codigo_solicitud: this.codigoSolicitud,
      usuario_asignacion: this.nitLogin,
      codigo_estado: 9,
      fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_modificacion: this.nitLogin,
      ip_usuario_modificacion: '192.168.1.18',
      usuario_anterior: null
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
      usuario: this.nitLogin,
      codigo_estado: 9,
      fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_creacion: this.nitLogin,
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
    this.regresarAMantenimientoSolicitudes();
  }

  autorizar() {
    const solicitud = {
      codigo_solicitud: this.codigoSolicitud,
      usuario_asignacion: this.usuarioCrea,
      codigo_estado: 15,
      fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_modificacion: this.nitLogin,
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
      usuario: this.nitLogin,
      codigo_estado: 15,
      fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_creacion: this.nitLogin,
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
    this.regresarAMantenimientoSolicitudes();
  }



  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['bandeja-analista/', this.nitLogin]);
  }

}
