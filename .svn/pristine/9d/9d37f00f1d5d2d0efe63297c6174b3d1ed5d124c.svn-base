import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SolicitudesService } from '../Services/solicitudes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bandeja-revisor',
  templateUrl: './bandeja-revisor.component.html',
  styleUrls: ['./bandeja-revisor.component.scss']
})
export class BandejaRevisorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['codigo_solicitud', 'no_expediente', 'nit', 'no_soporte', 'tipo_solicitud', 'usuario', 'estado', 'fecha_creacion', 'cantidad_de_muestras', 'dias_de_items', 'documentos', 'dias_vencimiento', 'accion'];
  dataSource = new MatTableDataSource();
  accionesFormGroup: FormGroup;
  nit: any;

  constructor(private _formBuilder: FormBuilder, private solicitudesService: SolicitudesService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.accionesFormGroup = this._formBuilder.group({
      opcionFormControl: ['']
    })

   }

  ngOnInit() {
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
            Swal.fire('Aun no tiene solicitudes asignadas.', '', 'error')
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
      case '1': // Analisis
        this.router.navigate([`bandeja-centralizador/${this.nit}/cambio-estado/${complementoRuta}/1`]);
        break;
      case '2': // Rechazado
        this.router.navigate([`bandeja-centralizador/${this.nit}/cambio-estado/${complementoRuta}/2`]);
        break;
      case '3': // Espera
        this.router.navigate([`bandeja-centralizador/${this.nit}/cambio-estado/${complementoRuta}/3`]);
        break;
      case '4': // revision
        this.router.navigate([`bandeja-centralizador/${this.nit}/cambio-estado/${complementoRuta}/4`]);
      break;
    }
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

}

