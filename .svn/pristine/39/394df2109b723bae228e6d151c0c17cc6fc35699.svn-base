import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { SolicitudesService } from '../Services/solicitudes.service';

@Component({
  selector: 'app-bandeja-analista',
  templateUrl: './bandeja-analista.component.html',
  styleUrls: ['./bandeja-analista.component.scss']
})
export class BandejaAnalistaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['codigo_solicitud', 'no_expediente', 'nit', 'no_soporte', 'tipo_solicitud', 'usuario', 'estado', 'fecha_creacion', 'cantidad_de_muestras', 'dias_de_items', 'dias_vencimiento', 'accion'];
  dataSource = new MatTableDataSource();
  accionesFormGroup: FormGroup;
  nit: any;
  comentarioRechazo: any;

  constructor(private _formBuilder: FormBuilder, private solicitudesService: SolicitudesService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.accionesFormGroup = this._formBuilder.group({
      opcionFormControl: ['']
    })

  }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('nit')) {
        this.nit = res.get('nit');
        this.solicitudesService.getSolicitudesByCentralizador(this.nit).subscribe(res => {
          if(res.length !== 0) {
            for(let i = 0; i< res.length; i++) {
              res[i].fecha_creacion = String(moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY'))
            }
            this.dataSource.data = res;
            console.log(res)
          } else {
          }
        })  
      }
    })
  }

  ejecutarAccion(datos: any) {
    console.log(datos)
    let complementoRuta = datos.codigo_solicitud
    let opcionSeleccionada = this.accionesFormGroup.get('opcionFormControl')?.value;
    switch(opcionSeleccionada) {
      case '4': // muestras
        this.router.navigate([`bandeja-analista/${this.nit}/asociar/`, complementoRuta]);
        break;
      case '10':
        this.solicitudesService.getEtiquetas(complementoRuta).subscribe(res => {
          if (res.length === 0) {
            Swal.fire({
              title: 'Para cambiar de estado primero debe asociar una muestra a la solicitud.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            })
            this.accionesFormGroup.get('opcionFormControl')?.reset()
          } else {
            this.router.navigate([`bandeja-analista/${this.nit}/cambio-estado/`, complementoRuta]);
          }
        })
        break;
      case '9':
        this.router.navigate([`bandeja-analista/${this.nit}/cambio-estado/`, complementoRuta]);
        break;
      case '15':
        this.router.navigate([`bandeja-analista/${this.nit}/cambio-estado/`, complementoRuta]);
        break;

      case '16':
        this.verComentarios(datos);
      break;

      case '17':
        this.router.navigate([`bandeja-analista/${this.nit}/cambio-estado/`, complementoRuta]);
        break;
    }
  }

  fueRechazado(solicitud: any): boolean {
    return solicitud.codigo_estado == 14;
  }

  verComentarios(solicitud: any) {
    this.solicitudesService.getComentarioByCodigoAndEstado(solicitud.codigo_solicitud, 14).subscribe(res=> {
      Swal.fire({
        title: 'Comentarios por rechazo:',
        text: `${res[0].observaciones_cambio_estado}`, 
        icon: 'info',      
      })
    })
    this.accionesFormGroup.get('opcionFormControl')?.reset()
  }


  cerrarSesion() {
    Swal.fire({
      title: 'Esta seguro que desea cerrar sesion?',
      //text: `Codigo Solicitud: ` + ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['login']);
      } 
    })
  }

  acciones: Opciones[] = [
    {value: '4', viewValue: 'Asociar'}
  ];

}

interface Opciones{
  value : string;
  viewValue: string;
}