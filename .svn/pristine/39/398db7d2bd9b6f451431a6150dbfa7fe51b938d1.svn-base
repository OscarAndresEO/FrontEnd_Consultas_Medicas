import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CatalogosService } from '../Services/catalogos.service';
import { MuestrasService } from '../Services/muestras.service';

interface Opciones{
  value : string;
  viewValue: string;
}
 
@Component({
  selector: 'app-crear-muestra',
  templateUrl: './crear-muestra.component.html',
  styleUrls: ['./crear-muestra.component.scss']
})
export class CrearMuestraComponent implements OnInit {

  isLinear=false;
  selectedFile: any;
  crearMuestraFormGroup: FormGroup;
  listaTipoMuestra: any;
  listaUnidadDeMedida: any;
  numeroMuestras: any;
  cantidadMuestras: any;
  date: Date;
  nitLogin: any;
  fechaVencimiento: Date;

  constructor(private _formBuilder: FormBuilder,
              private muestrasService: MuestrasService,// preguntar a Elio  
              private servicios: CatalogosService,
              private datePipe: DatePipe,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private http:HttpClient) {
    this.crearMuestraFormGroup = this._formBuilder.group({
      tipoMuestraFormControl: ['', [Validators.required]],
      cantidadMuestraFormControl:['',[Validators.required]],
      cantidadFormControl: ['', [Validators.required, Validators.minLength(1)]],
      PresentacionFormControl: ['', [Validators.required, Validators.minLength(10)]],
      archivoMuestraFormControl:['',[Validators.required]],   
    });

      this.date = new Date();
      this.fechaVencimiento = new Date();
  }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('nit_login')) {
        this.nitLogin = res.get('nit_login'); 
      }
    })
    
    this.servicios.getTipoMuestra().subscribe(res => {
      this.listaTipoMuestra=res; 
    });

    this.servicios.getUnidadDeMedida().subscribe(res => {
      this.listaUnidadDeMedida = res;
      console.log(this.listaUnidadDeMedida)
    })

    // Obtener cantidad solicitudes
    await this.muestrasService.getAllMuesteras().subscribe(res => {
      this.cantidadMuestras = res.length;
      console.log('la cantidad de solicitudes es ', this.cantidadMuestras)
    });
  }
 

  guardarDatos() {
    Swal.fire({
      title: '¿Desea crear la solicitud?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      denyButtonText: `No guardar`,
      cancelButtonText: `Cancelar`, 
    }).then((result) => {
      if (result.isConfirmed) {
          this.generarCodigo();
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          const muestras = {
            codigo_muestra: this.numeroMuestras,
            codigo_estado: 35,
            codigo_tipo_muestra: this.crearMuestraFormGroup.get('tipoMuestraFormControl')?.value,
            unidad_medica: this.crearMuestraFormGroup.get('cantidadMuestraFormControl')?.value,
            presentacion: this.crearMuestraFormGroup.get('PresentacionFormControl')?.value,
            cantidadUnidades: Number(this.crearMuestraFormGroup.get('cantidadFormControl')?.value) ,
            adjunto: formData,
            fecha_vencimiento: this.datePipe.transform(this.fechaVencimiento, 'yyyy-MM-dd HH:mm:ss'),
            fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
            usuario_creacion: 'master' ,
            ip_usuario_creacion: '10.11.200.74',
            fecha_modificacion: null,
            usuario_modificacion: '',
            ip_usuario_modificacion:'',
           
          }
          console.log('prueba ',muestras)

       this.muestrasService.insertMuestras(muestras).subscribe(res => {
          Swal.fire(`Muestra creada con exito, el numero de su solicitud es ${this.numeroMuestras}`, '', 'success');
          this.crearMuestraFormGroup.reset();
        }, err => {
          Swal.fire('No se pudo almacenar la muestra', '', 'error')
        });
        console.log(muestras)   
        this.regresarAMantenimientoSolicitudes()
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      } else {
        console.log('cancelado')
      }
    })
  }

  generarCodigo() {
    const anio = moment().format('YYYY');
    const mes = moment().format('MM')
    const dia = moment().format('DD')
    this.cantidadMuestras += 1;
    var correlativo = this.cantidadMuestras.toString().padStart(6,'0');
    this.numeroMuestras = anio + '-' + mes + '-' + dia + '-01-' + correlativo;
    console.log(this.numeroMuestras);
  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes', this.nitLogin]);
    //this.router.navigate(['bandeja-analista/', this.nitLogin]);
  }
  
  fileSelected(event: any)
  {
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile.type !== "application/pdf") {
      Swal.fire({
        icon: 'error',
        title: 'Debe subir un archivo PDF'
      })
      this.crearMuestraFormGroup.get('archivoMuestraFormControl')?.reset()
    } 
    if (this.selectedFile.size > 5000000) {
      Swal.fire({
        icon: 'error',
        title: 'El tamaño máximo permitido es de 5 MB'
      })
      this.crearMuestraFormGroup.get('archivoMuestraFormControl')?.reset()
    }
    console.log(this.selectedFile)
  };

  subirArchivo()
  {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    if (this.selectedFile == undefined)
    {
      window.alert("Se debe seleccionar alguna imagen para poder realizar la subida del archivo al servidor.")
      return;
    }
    else
    {
      //Metodo POST 
      this.http.post<myData>('authentication/subirArchivoLogo.php', formData)
      .subscribe(data=>
      {
         //Respuesta del servidor
         console.log("Data: ", data);
      });
    }
  }

  calcularFechaVencimiento() {
    let item = this.crearMuestraFormGroup.get('tipoMuestraFormControl')?.value;
    console.log(item)
    switch(item) {
      case 1:
        this.fechaVencimiento.setDate(this.fechaVencimiento.getDate() + 10) 
        console.log(this.fechaVencimiento)
        break;

      case 2:
        this.fechaVencimiento.setDate(this.fechaVencimiento.getDate() + 2) 
        console.log(this.fechaVencimiento)
        break;

      case 3:
        this.fechaVencimiento.setDate(this.fechaVencimiento.getDate() + 1) 
        console.log(this.fechaVencimiento)
        break;

      case 4:
        this.fechaVencimiento.setDate(this.fechaVencimiento.getDate() + 2) 
        console.log(this.fechaVencimiento)
        break;
    }
  }

}


interface myData
  {
    mensaje: string;
  };