import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SolicitudesService } from 'src/app/Services/solicitudes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autorizar-solicitud',
  templateUrl: './autorizar-solicitud.component.html',
  styleUrls: ['./autorizar-solicitud.component.scss']
})
export class AutorizarSolicitudComponent implements OnInit {
  informacionFormGroup: FormGroup;
  codigoSolicitud: any;
  nitLogin: any;
  codigoEstado: any;
  selectedFile: any;
  date: Date;
  
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
            this.informacionFormGroup.get('codigoSolicitudFormControl')?.setValue(this.codigoSolicitud);
            this.informacionFormGroup.get('descripcionFormControl')?.setValue(res[0].descripcion);
            this.informacionFormGroup.get('estadoActualFormControl')?.setValue(res[0].estado)
            this.codigoEstado = res[0].codigo_estado;
            //this.usuarioCrea = res[0].usuario_creacion;
            switch(res[0].codigo_estado) {
              case 15:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Finalizado");
                break;
            }
          }
        })
      }
    })
  }

  cambiarEstado() {
    switch(this.codigoEstado) {
      case 15:
      this.finalizar();
      break;
    }
  }

  finalizar() {
    this.solicitudesService.getCentralizador().subscribe(res => {
      const solicitud = {
        codigo_solicitud: this.codigoSolicitud,
        usuario_asignacion: this.nitLogin,
        codigo_estado: 16,
        fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
        usuario_modificacion: this.nitLogin,
        ip_usuario_modificacion: '192.168.1.18'
      }
      console.log(solicitud)
      this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
        Swal.fire({
          titleText: `La solicitud finalizó con éxito.`,
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
        codigo_estado: 16,
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

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes/', this.nitLogin]);
  }

}
