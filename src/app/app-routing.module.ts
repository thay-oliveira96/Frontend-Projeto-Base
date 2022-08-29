import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { GestorListComponent } from './components/gestor/gestor-list/gestor-list.component';
import { GestorCreateComponent } from './components/gestor/gestor-create/gestor-create.component';
import { GestorUpdateComponent } from './components/gestor/gestor-update/gestor-update.component';
import { GestorDeleteComponent } from './components/gestor/gestor-delete/gestor-delete.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { MaquinaListComponent } from './components/maquina/maquina-list/maquina-list.component';
import { MaquinaCreateComponent } from './components/maquina/maquina-create/maquina-create.component';
import { MaquinaUpdateComponent } from './components/maquina/maquina-update/maquina-update.component';
import { MaquinaDeleteComponent } from './components/maquina/maquina-delete/maquina-delete.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent},

      { path: 'tecnicos',            component: TecnicoListComponent },
      { path: 'tecnicos/create',     component: TecnicoCreateComponent },
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

      { path: 'clientes', component: ClienteListComponent},
      { path: 'clientes/create', component: ClienteCreateComponent},
      { path: 'clientes/update/:id', component: ClienteUpdateComponent},
      {path: 'clientes/delete/:id', component: ClienteDeleteComponent},

      {path: 'gestores', component: GestorListComponent},
      {path: 'gestores/create', component: GestorCreateComponent},
      {path: 'gestores/update/:id', component: GestorUpdateComponent},
      {path: 'gestores/delete/:id', component: GestorDeleteComponent},

      {path: 'chamados', component: ChamadoListComponent},
      {path: 'chamados/create', component: ChamadoCreateComponent},
      {path: 'chamados/update/:id', component: ChamadoUpdateComponent},
      {path: 'chamados/read/:id', component: ChamadoReadComponent},

      {path: 'maquinas', component: MaquinaListComponent},
      {path: 'maquinas/create', component: MaquinaCreateComponent},
      {path: 'maquinas/update/:id', component: MaquinaUpdateComponent},
      {path: 'maquinas/delete/:id', component: MaquinaDeleteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
