import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SolicitudesService } from 'src/app/Services/solicitudes.service';

@Component({
  selector: 'app-informacion-expediente',
  templateUrl: './informacion-expediente.component.html',
  styleUrls: ['./informacion-expediente.component.scss']
})
export class InformacionExpedienteComponent implements OnInit {
  informacionFormGroup: FormGroup;
  nitLogin: any;
  
  constructor(private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private router: Router) {
      this.informacionFormGroup = this._formBuilder.group({
        noExpedienteFormControl: [''],
        origenFormControl: [''],
        observacionesFormControl: ['']
      });
    }

  ngOnInit(){
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
            this.informacionFormGroup.get('noExpedienteFormControl')?.setValue(res[0].no_expediente);
            this.informacionFormGroup.get('origenFormControl')?.setValue(res[0].tipo_solicitante);
            this.informacionFormGroup.get('observacionesFormControl')?.setValue(res[0].observaciones_expediente);
          }
        })
      }
    })
  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes/', this.nitLogin]);
  }

}
