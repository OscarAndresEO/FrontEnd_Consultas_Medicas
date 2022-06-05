import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SolicitudesService } from 'src/app/Services/solicitudes.service';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.scss']
})
export class InformacionGeneralComponent implements OnInit {

  informacionFormGroup: FormGroup;
  nitLogin: any;

  constructor(private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private router: Router) {

      this.informacionFormGroup = this._formBuilder.group({
        codigoSolicitudFormControl: [''],
        noExpedienteFormControl: [''],
        nitFormControl: [''],
        noSoporteFormControl: [''],
        tipoSoporteFormControl: [''],
        tipoSolicitanteFormControl: [''],
        tipoSolicitudFormControl: [''],
        usuarioAsignacionFormControl: [''],
        estadoSolicitudFormControl: [''],
        usuarioCreacionFormControl: [''],
        fechaCreacionFormControl: [''],
        cantidadMuestrasFormControl: [''],
        cantidadItemsFormControl: [''],
        cantidadDocumentosFormControl: [''],
        descripcionFormControl: [''],
        solicitanteFormControl: [''],
        telefonosFormControl: [''],
        emailsFormControl: [''],
      });
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        let codigoSolicitud = res.get('codigo_solicitud');
        this.nitLogin = res.get('nit_login')
        this.solicitudesService.getSolicitudes(codigoSolicitud, '0', '0', '0', '0', '0', '0', '0', '0').subscribe(res => {
          if(res.length !== 0) {
            for(let i = 0; i< res.length; i++) {
              res[i].fecha_creacion = String(moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY'))
            }
            console.log(res)
            this.informacionFormGroup.get('codigoSolicitudFormControl')?.setValue(res[0].codigo_solicitud);
            this.informacionFormGroup.get('noExpedienteFormControl')?.setValue(res[0].no_expediente);
            this.informacionFormGroup.get('nitFormControl')?.setValue(res[0].nit);
            this.informacionFormGroup.get('noSoporteFormControl')?.setValue(res[0].no_soporte);
            this.informacionFormGroup.get('tipoSoporteFormControl')?.setValue(res[0].tipo_soporte);
            this.informacionFormGroup.get('tipoSolicitanteFormControl')?.setValue(res[0].tipo_solicitante);
            this.informacionFormGroup.get('tipoSolicitudFormControl')?.setValue(res[0].tipo_solicitud);
            this.informacionFormGroup.get('usuarioAsignacionFormControl')?.setValue(res[0].usuario);
            this.informacionFormGroup.get('estadoSolicitudFormControl')?.setValue(res[0].estado);
            this.informacionFormGroup.get('usuarioCreacionFormControl')?.setValue(res[0].usuario_creacion);
            this.informacionFormGroup.get('fechaCreacionFormControl')?.setValue(res[0].fecha_creacion);
            this.informacionFormGroup.get('cantidadMuestrasFormControl')?.setValue(res[0].cantidad_de_muestras);
            this.informacionFormGroup.get('cantidadItemsFormControl')?.setValue(res[0].dias_de_items);
            this.informacionFormGroup.get('cantidadDocumentosFormControl')?.setValue(res[0].dias_de_items);
            this.informacionFormGroup.get('descripcionFormControl')?.setValue(res[0].descripcion);
            this.informacionFormGroup.get('solicitanteFormControl')?.setValue(res[0].solicitante);
            this.informacionFormGroup.get('telefonosFormControl')?.setValue(res[0].telefonos);
            this.informacionFormGroup.get('emailsFormControl')?.setValue(res[0].email);
          }
        })
      }
    })
  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes/', this.nitLogin]);
  }

}
