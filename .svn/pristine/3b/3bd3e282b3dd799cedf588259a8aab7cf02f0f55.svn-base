import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MuestrasService } from '../Services/muestras.service';
import { SolicitudesService } from '../Services/solicitudes.service';

interface Opciones2{
  value : string;
  viewValue: string;
}

@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.scss']
})
export class AsociarComponent implements OnInit {
isLinear=false;
AsociarFormGroup:FormGroup;
InformacionMuestra:FormGroup;
itemsFormGroup: FormGroup;
Cod: any;
habilitarBtnSiguiente: boolean;
datosSolicitud: any;
nitLogin: any;
codigoSolicitud: any;
tipoMuestra: any;
habilitarAsociar: boolean = false;
cantidadItems: number = 0;
items: any;
date: Date;
comentarioRecibido: any = [];
noCodigoMuestra: any;
expediente: any;

  constructor(private _formBuilder: FormBuilder,
              private muestraService: MuestrasService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private solicitudesService: SolicitudesService,
              private datePipe: DatePipe) {
    this.AsociarFormGroup= this._formBuilder.group({
      codigoMuestraFormControl: ['', [Validators.required]],
    })

    this.InformacionMuestra= this._formBuilder.group({
      codigoMuestra1FormControl: ['', []],
      codigoTipoMuestraFormControl: ['', []],
      unidadMedicaFormControl: ['', []],
      presentacionFormControl: ['', []],
      cantidadUnidadFormControl: ['', []],
      fechaCreacionFormControl: ['', []],
      fechaVencimientoFormControl: ['', []],
      userCreacionFormControl: ['', []],
      adjuntoFormControl: ['', []],
      codigoSolicitudFormControl: ['', []],
      noExpedienteFormControl: ['', []],
      nitFormControl: ['', []],
      usuarioAsignacionFormControl: ['', []],
      usuarioCreacionFormControl: ['', []],
      estadoFormControl: ['', []],
      itemsFormControl: ['', []]
    })

    this.itemsFormGroup = this._formBuilder.group({
      microbioticoFormControl: [''],
      trigliceridosFormControl:[''],
      diabetesFormControl: [''],
      embarazoFormControl: [''],
      testDrogasFormControl: [''],
      testEnfermedadesFormControl: [''],
      bacterianaFormControl: [''],
      descripcion: ['', [Validators.required]]
    })

    this.habilitarBtnSiguiente = false;
    this.date = new Date();
  } 

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        this.codigoSolicitud = res.get('codigo_solicitud');
        this.nitLogin = res.get('nit_login');
        this.InformacionMuestra.get('codigoSolicitudFormControl')?.setValue(this.codigoSolicitud)
      }
    });
  }

   /**
   * Metodo para obtener codigo muestra en base a un numero de expediente
   */
    async getMuestra() {
      this.solicitudesService.getSolicitudesByCodigo(this.codigoSolicitud).subscribe(res => {
        console.log('el res con los datos es', res)
        this.InformacionMuestra.get('noExpedienteFormControl')?.setValue(res[0].no_expediente)
        this.expediente = res[0].no_expediente
        this.InformacionMuestra.get('nitFormControl')?.setValue(res[0].nit)
        this.InformacionMuestra.get('usuarioAsignacionFormControl')?.setValue(res[0].usuario)
        this.InformacionMuestra.get('usuarioCreacionFormControl')?.setValue(res[0].usuario_creacion)
        this.InformacionMuestra.get('estadoFormControl')?.setValue(res[0].estado)
        this.InformacionMuestra.get('itemsFormControl')?.setValue(res[0].dias_de_items)
      })

       this.noCodigoMuestra = this.AsociarFormGroup.get('codigoMuestraFormControl')?.value;

       

       await this.muestraService.getMuestraByCodigoMuestra(this.noCodigoMuestra).subscribe(res =>{
        this.Cod=res;
        if(res.length !== 0){
          console.log(res)
          this.tipoMuestra = res[0].tipo_muestra;
          this.habilitarBtnSiguiente = true;
          this.InformacionMuestra.get('codigoMuestra1FormControl')?.setValue(res[0].codigo_muestra),
          this.InformacionMuestra.get('codigoTipoMuestraFormControl')?.setValue(res[0].tipo_muestra),
          this.InformacionMuestra.get('unidadMedicaFormControl')?.setValue(res[0].nombre_unidad),
          this.InformacionMuestra.get('presentacionFormControl')?.setValue(res[0].presentacion),
          this.InformacionMuestra.get('cantidadUnidadFormControl')?.setValue(res[0].cantidadUnidades),
          this.InformacionMuestra.get('fechaCreacionFormControl')?.setValue(moment(res[0].fecha_creacion).format('DD-MM-YYYY')),
          this.InformacionMuestra.get('fechaVencimientoFormControl')?.setValue(moment(res[0].fecha_vencimiento).format('DD-MM-YYYY')),
          this.InformacionMuestra.get('userCreacionFormControl')?.setValue(res[0].usuario_creacion),
          this.InformacionMuestra.get('adjuntoFormControl')?.setValue(res[0].adjunto);
          Swal.fire({
            icon: 'success',
            title: 'Muestra encontrada, puede continuar'
                 })
        }
        else {
          this.habilitarBtnSiguiente = false;
          Swal.fire({
          icon: 'error',
          title: 'No se encontro ninguna Muestra con el codigo proporcionado'
               })

              }
         })

         this.inicializarToggles()
      
    }
    

  codigoMuestra: Opciones2[] = [
    {value: '1', viewValue: 'Gramos '},
    {value: '2', viewValue: 'Miligramos'}
  ];

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['bandeja-analista/', this.nitLogin]);
  }

  async inicializarToggles() {
    try  {
       await this.muestraService.getItemsAsociados(this.noCodigoMuestra).subscribe(res => {
         this.comentarioRecibido = JSON.parse(res[0].itemsAsociados) 
         if(res[0].itemsAsociados !== null) {
          if (this.tipoMuestra === 'Cultivo') {
            this.itemsFormGroup.get('microbioticoFormControl')?.setValue(this.comentarioRecibido.items[0].aprobado)
          } else if (this.tipoMuestra === 'Plaquetas') {
           this.itemsFormGroup.get('trigliceridosFormControl')?.setValue(this.comentarioRecibido.items[0].aprobado)
           this.itemsFormGroup.get('diabetesFormControl')?.setValue(this.comentarioRecibido.items[1].aprobado)
           this.itemsFormGroup.get('embarazoFormControl')?.setValue(this.comentarioRecibido.items[2].aprobado) 
            
          } else if (this.tipoMuestra === 'Eses') {
           this.itemsFormGroup.get('testDrogasFormControl')?.setValue(this.comentarioRecibido.items[0].aprobado)
           this.itemsFormGroup.get('testEnfermedadesFormControl')?.setValue(this.comentarioRecibido.items[1].aprobado)
          } else if (this.tipoMuestra === 'Orina') {
           this.itemsFormGroup.get('bacterianaFormControl')?.setValue(this.comentarioRecibido.items[0].aprobado)
          }
         }
         
       })
       
    }catch(e) {
     this.comentarioRecibido = null;
     console.log('null')
    }
  }

  validarSlideToggles() {
    if (this.tipoMuestra === 'Cultivo') {
      if(this.itemsFormGroup.get('microbioticoFormControl')?.value === true) {
        this.habilitarAsociar = true;
      } else {
        this.habilitarAsociar = false;
      }
    } else if (this.tipoMuestra === 'Plaquetas') {
      if(this.itemsFormGroup.get('trigliceridosFormControl')?.value === true || this.itemsFormGroup.get('diabetesFormControl')?.value === true || this.itemsFormGroup.get('embarazoFormControl')?.value === true) {
        this.habilitarAsociar = true;        
      } else {
        this.habilitarAsociar = false;
      }
    } else if (this.tipoMuestra === 'Eses') {
      if(this.itemsFormGroup.get('testDrogasFormControl')?.value === true || this.itemsFormGroup.get('testEnfermedadesFormControl')?.value === true) {
        this.habilitarAsociar = true;
      } else {
        this.habilitarAsociar = false;
      }
    } else if (this.tipoMuestra === 'Orina') {
      if(this.itemsFormGroup.get('bacterianaFormControl')?.value === true) {
        this.habilitarAsociar = true;
      } else {
        this.habilitarAsociar = false;
      }
    }
  }

  async asociar() {
    if (this.tipoMuestra === 'Cultivo') {
      this.items = {
        items: [
          {
            id: 'microbiotico',
            aprobado: (this.itemsFormGroup.get('microbioticoFormControl')?.value != "")? this.itemsFormGroup.get('microbioticoFormControl')?.value: false
          }     
        ]
      }
      if(this.itemsFormGroup.get('microbioticoFormControl')?.value === true) {
        this.cantidadItems = 1;
      } else {
        this.cantidadItems = 0;
      }
    } else if (this.tipoMuestra === 'Plaquetas') {
      this.items = {
        items: [
          {
            id: 'trigliceridos',
            aprobado: (this.itemsFormGroup.get('trigliceridosFormControl')?.value != "")? this.itemsFormGroup.get('trigliceridosFormControl')?.value: false
          },
          {
            id: 'diabetes',
            aprobado: (this.itemsFormGroup.get('diabetesFormControl')?.value != "")?this.itemsFormGroup.get('diabetesFormControl')?.value: false
          },
          {
            id: 'embarazo',
            aprobado: (this.itemsFormGroup.get('embarazoFormControl')?.value != "")?this.itemsFormGroup.get('embarazoFormControl')?.value: false
          }     
        ]
      }

      if (this.itemsFormGroup.get('trigliceridosFormControl')?.value === true && this.itemsFormGroup.get('diabetesFormControl')?.value === true && this.itemsFormGroup.get('embarazoFormControl')?.value === true) {
        this.cantidadItems = 3;
      } else if ((this.itemsFormGroup.get('trigliceridosFormControl')?.value === true && this.itemsFormGroup.get('diabetesFormControl')?.value === true) ||
                 (this.itemsFormGroup.get('trigliceridosFormControl')?.value === true && this.itemsFormGroup.get('embarazoFormControl')?.value === true) ||
                 (this.itemsFormGroup.get('diabetesFormControl')?.value === true && this.itemsFormGroup.get('embarazoFormControl')?.value === true)) {
        this.cantidadItems = 2;
      } else {
        this.cantidadItems = 1;
      }
      
    } else if (this.tipoMuestra === 'Eses') {
      this.items = {
        items: [
          {
            id: 'drogas',
            aprobado: (this.itemsFormGroup.get('testDrogasFormControl')?.value != "")?this.itemsFormGroup.get('testDrogasFormControl')?.value: false
          },
          {
            id: 'enfermedades',
            aprobado: (this.itemsFormGroup.get('testEnfermedadesFormControl')?.value != "")?this.itemsFormGroup.get('testEnfermedadesFormControl')?.value: false
          }  
        ]
      }
      if (this.itemsFormGroup.get('testDrogasFormControl')?.value === true && this.itemsFormGroup.get('testEnfermedadesFormControl')?.value === true) {
        this.cantidadItems = 2;
      } else {
        this.cantidadItems = 1;
      }
      
    } else if (this.tipoMuestra === 'Orina') {
      this.items = {
        items: [
          {
            id: 'bacteriana',
            aprobado: (this.itemsFormGroup.get('bacterianaFormControl')?.value != undefined)?this.itemsFormGroup.get('bacterianaFormControl')?.value: false
          }
        ]
      }
      if(this.itemsFormGroup.get('bacterianaFormControl')?.value === true) {
        this.cantidadItems = 1;
      } else {
        this.cantidadItems = 0;
      }

      
    }
    
    Swal.fire({
      title: 'Desea confirmar la asociacion?',
      //text: `Codigo Solicitud: ` + ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      
    }).then((result) => {
      if (result.isConfirmed) {
        const it = {
          cantidadMuestras: this.cantidadItems,
          itemsAsociados: JSON.stringify(this.items),
          fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
          usuario_modificacion: 'Elio Raymundo',
          ip_usuario_modificacion: '192.168.1.19',
          codigo_muestra: this.AsociarFormGroup.get('codigoMuestraFormControl')?.value
        }

        const etiqueta = {
          codigo_etiqueta: 0,
          codigo_muestra: this.noCodigoMuestra,
          codigo_solicitud: this.codigoSolicitud, 
          no_expediente: this.expediente,
          codigo_qr: 'QR',
          descripcion: this.itemsFormGroup.get('descripcion')?.value,
          fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
          codigo_estado: 35,
          usuario_creacion: 'usuario',
          ip_usuario_creacion: '192.168.1.18'

        }

        this.muestraService.insertEtiqueta(etiqueta).subscribe(res => {
          console.log('se creo la etiqueta', res)
        })

        this.muestraService.insertarItems(it).subscribe(res => {
          console.log('se enviaron los dato ',res)
        })

        const solicitud = {
          cantidad_de_muestras: this.cantidadItems,
          dias_de_items: this.cantidadItems,
          fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
          usuario_modificacion: 'fer y oscar',
          ip_usuario_modificacion: '154.45.1.4.4',
          codigo_solicitud: this.codigoSolicitud
        }

        this.muestraService.insertarItemsSolicitudes(solicitud).subscribe(res => {
          console.log('se enviaron los datos', res)
         // this.router.navigate(['bandeja-analista/', this.nitLogin]);
        })
        Swal.fire({
          title: 'La asociacion se realizo correctamente',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          
        })
       this.regresarAMantenimientoSolicitudes();
      } 
    })
  }

}