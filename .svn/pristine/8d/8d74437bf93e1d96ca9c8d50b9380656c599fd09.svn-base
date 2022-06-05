import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SolicitudesService } from 'src/app/Services/solicitudes.service';

@Component({
  selector: 'app-informacion-cliente',
  templateUrl: './informacion-cliente.component.html',
  styleUrls: ['./informacion-cliente.component.scss']
})
export class InformacionClienteComponent implements OnInit {

  informacionFormGroup: FormGroup;
  nitLogin: any;

  constructor(private _formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private solicitudesService: SolicitudesService,
              private router: Router) {
    this.informacionFormGroup = this._formBuilder.group({
      nitFormControl: [''],
      nombreFormControl: [''],
      direccionFormControl: [''],
      telefonosFormControl: [''],
      emailsFormControl: ['']
    })
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        let codigoSolicitud = res.get('codigo_solicitud');
        this.nitLogin = res.get('nit_login');
        this.solicitudesService.getSolicitudes(codigoSolicitud, '0', '0', '0', '0', '0', '0', '0', '0').subscribe(res => {
          if(res.length !== 0) {
            for(let i = 0; i< res.length; i++) {
              res[i].fecha_creacion = String(moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY'))
            }
            console.log(res)
            this.informacionFormGroup.get('nitFormControl')?.setValue(res[0].nit);
            this.informacionFormGroup.get('nombreFormControl')?.setValue(res[0].solicitante);
            this.informacionFormGroup.get('direccionFormControl')?.setValue(res[0].direccion_cliente);
            this.informacionFormGroup.get('telefonosFormControl')?.setValue(res[0].telefono_cliente);
            this.informacionFormGroup.get('emailsFormControl')?.setValue(res[0].email_cliente);
          }
        })
      }
    })
  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes/', this.nitLogin]);
  }

}
