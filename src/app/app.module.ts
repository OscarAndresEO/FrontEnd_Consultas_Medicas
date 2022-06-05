import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './angular-material';
import { ReactiveFormsModule } from '@angular/forms';
import { CreacionSolicitudComponent } from './creacion-solicitud/creacion-solicitud.component';
import { CatalogosService } from './Services/catalogos.service';
import { HttpClientModule } from '@angular/common/http';
import { CrearMuestraComponent } from './crear-muestra/crear-muestra.component';
import { AsociarComponent } from './asociar/asociar.component';
import { DatePipe } from '@angular/common';
import { ClientesService } from './Services/clientes.service';
import { ExpedientesService } from './Services/expedientes.service';
import { SolicitudesService } from './Services/solicitudes.service';
import { MantenimientoSolicitudesComponent } from './mantenimiento-solicitudes/mantenimiento-solicitudes.component';
import { InformacionExpedienteComponent } from './mantenimiento-solicitudes/informacion-expediente/informacion-expediente.component';
import { TrazabilidadComponent } from './mantenimiento-solicitudes/trazabilidad/trazabilidad.component';
import { InformacionClienteComponent } from './mantenimiento-solicitudes/informacion-cliente/informacion-cliente.component';
import { InformacionGeneralComponent } from './mantenimiento-solicitudes/informacion-general/informacion-general.component';
import { CambioEstadoComponent } from './cambio-estado/cambio-estado.component';
import { BandejaCentralizadorComponent } from './bandeja-centralizador/bandeja-centralizador.component';
import { SeguimientoSolicitudComponent } from './seguimiento-solicitud/seguimiento-solicitud.component';
import { LoginComponent } from './login/login.component';
import { BandejaRevisorComponent } from './bandeja-revisor/bandeja-revisor.component';
import { BandejaAnalistaComponent } from './bandeja-analista/bandeja-analista.component';
import { AutorizarSolicitudComponent } from './mantenimiento-solicitudes/autorizar-solicitud/autorizar-solicitud.component';

@NgModule({
  declarations: [
    AppComponent,
    CreacionSolicitudComponent,
    CrearMuestraComponent,
    AsociarComponent,
    MantenimientoSolicitudesComponent,
    InformacionExpedienteComponent,
    TrazabilidadComponent,
    InformacionClienteComponent,
    InformacionGeneralComponent,
    CambioEstadoComponent,
    BandejaCentralizadorComponent,
    SeguimientoSolicitudComponent,
    LoginComponent,
    BandejaRevisorComponent,
    BandejaAnalistaComponent,
    AutorizarSolicitudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CatalogosService,
    ClientesService,
    ExpedientesService,
    SolicitudesService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
