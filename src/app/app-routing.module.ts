import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { UsuarioComumCreateComponent } from './components/usuario-comum/usuario-comum-create/usuario-comum-create.component';
import { UsuarioComumDeleteComponent } from './components/usuario-comum/usuario-comum-delete/usuario-comum-delete.component';       
import { UsuarioComumListComponent } from './components/usuario-comum/usuario-comum-list/usuario-comum-list.component';
import { UsuarioComumUpdateComponent } from './components/usuario-comum/usuario-comum-update/usuario-comum-update.component';
import { AdministradorListComponent } from './components/administrador/administrador-list/administrador-list.component';
import { AdministradorCreateComponent } from './components/administrador/administrador-create/administrador-create.component';
import { AdministradorUpdateComponent } from './components/administrador/administrador-update/administrador-update.component';
import { AdministradorDeleteComponent } from './components/administrador/administrador-delete/administrador-delete.component';
 
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent},

      { path: 'usuariocomum', component: UsuarioComumListComponent},
      { path: 'usuariocomum/create', component: UsuarioComumCreateComponent},
      { path: 'usuariocomum/update/:id', component: UsuarioComumUpdateComponent},
      {path: 'usuariocomum/delete/:id', component: UsuarioComumDeleteComponent},

      {path: 'administrador', component: AdministradorListComponent},
      {path: 'administrador/create', component: AdministradorCreateComponent},
      {path: 'administrador/update/:id', component: AdministradorUpdateComponent},
      {path: 'administrador/delete/:id', component: AdministradorDeleteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
