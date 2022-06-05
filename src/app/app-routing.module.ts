import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociarComponent } from './asociar/asociar.component';
import { BandejaAnalistaComponent } from './bandeja-analista/bandeja-analista.component';
import { BandejaCentralizadorComponent } from './bandeja-centralizador/bandeja-centralizador.component';
import { BandejaRevisorComponent } from './bandeja-revisor/bandeja-revisor.component';
import { CambioEstadoComponent } from './cambio-estado/cambio-estado.component';
import { CreacionSolicitudComponent } from './creacion-solicitud/creacion-solicitud.component';
import { CrearMuestraComponent } from './crear-muestra/crear-muestra.component';
import { LoginComponent } from './login/login.component';
import { AutorizarSolicitudComponent } from './mantenimiento-solicitudes/autorizar-solicitud/autorizar-solicitud.component';
import { InformacionClienteComponent } from './mantenimiento-solicitudes/informacion-cliente/informacion-cliente.component';
import { InformacionExpedienteComponent } from './mantenimiento-solicitudes/informacion-expediente/informacion-expediente.component';
import { InformacionGeneralComponent } from './mantenimiento-solicitudes/informacion-general/informacion-general.component';
import { MantenimientoSolicitudesComponent } from './mantenimiento-solicitudes/mantenimiento-solicitudes.component';
import { TrazabilidadComponent } from './mantenimiento-solicitudes/trazabilidad/trazabilidad.component';
import { SeguimientoSolicitudComponent } from './seguimiento-solicitud/seguimiento-solicitud.component';

const routes: Routes = [
  {path: 'mantenimiento-solicitudes/:nit_login/creacionSolicitud', component: CreacionSolicitudComponent},
  {path: 'mantenimiento-solicitudes/:nit_login/crearMuestra',component: CrearMuestraComponent},
  {path: 'bandeja-analista/:nit_login/asociar/:codigo_solicitud',component: AsociarComponent},
  {path: 'mantenimiento-solicitudes/:nit_login', component: MantenimientoSolicitudesComponent},
  {path: 'mantenimiento-solicitudes/:nit_login/informacion-cliente/:codigo_solicitud', component: InformacionClienteComponent},
  {path: 'mantenimiento-solicitudes/:nit_login/informacion-expediente/:codigo_solicitud', component: InformacionExpedienteComponent},
  {path: 'mantenimiento-solicitudes/:nit_login/informacion-general/:codigo_solicitud', component: InformacionGeneralComponent},
  {path: 'mantenimiento-solicitudes/:nit_login/trazabilidad/:codigo_solicitud', component: TrazabilidadComponent},
  {path: 'bandeja-analista/:nit_login/cambio-estado/:codigo_solicitud', component: CambioEstadoComponent},
  {path: 'bandeja-centralizador/:nit', component: BandejaCentralizadorComponent},
  {path: 'bandeja-centralizador/:nit/cambio-estado/:codigo_solicitud/:nuevo_estado', component: SeguimientoSolicitudComponent},
  {path: 'login', component: LoginComponent},
  {path: 'bandeja-revisor/:nit', component: BandejaRevisorComponent},
  {path: 'bandeja-analista/:nit', component: BandejaAnalistaComponent},
  {path: 'mantenimiento-solicitudes/:nit_login/autorizar/:codigo_solicitud', component: AutorizarSolicitudComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
