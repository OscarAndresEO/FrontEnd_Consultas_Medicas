import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SolicitudesService } from '../Services/solicitudes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  datosFormGroup: FormGroup
  login: any;
  pass: any;

  constructor(private _formBuilder: FormBuilder,
              private solicitudesService: SolicitudesService,
              private router: Router) {
    this.datosFormGroup = this._formBuilder.group({
      loginFormControl: ['', [Validators.required]],
      passFormControl: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  }

  iniciarSesion() {
    this.login = this.datosFormGroup.get('loginFormControl')?.value;
    this.pass = this.datosFormGroup.get('passFormControl')?.value;
    this.solicitudesService.getLogin(this.login, this.pass).subscribe(res => {
      if(res.length === 0) {
        Swal.fire('El usuario o contraseña son invalidos, por favor verificar.', '', 'error');
      }else {
        let nit = res[0].nit_usuario
        console.warn("NIT USUARIO LOGUEADO", nit);
        switch(res[0].codigo_rol) {
          case 26:
            this.router.navigate(['mantenimiento-solicitudes/', nit]);
            break;
          case 27:
            this.router.navigate(['bandeja-centralizador/', nit]);
            break;
          case 28:
            this.router.navigate(['bandeja-analista/', nit]);
            break;
          case 29:
            this.router.navigate(['bandeja-revisor/', nit])
            break;
        }
      }
    })
  }

}
