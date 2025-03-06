import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioComum } from 'src/app/models/usuariocomum';
import { UsuarioComumService } from 'src/app/services/usuariocomum.service';

@Component({
  selector: 'app-usuario-comum-create',
  templateUrl: './usuario-comum-create.component.html',
  styleUrls: ['./usuario-comum-create.component.css']
})
export class UsuarioComumCreateComponent implements OnInit {

  usuariocomum: UsuarioComum = {
     id:         '',
     nome:       '',
     cpf:        '',
     email:      '',
     senha:      '',
     perfis:     [],
     dataCriacao: ''
   }
 
   nome: FormControl = new FormControl(null, Validators.minLength(3));
   cpf: FormControl = new FormControl(null, Validators.required);
   email: FormControl = new FormControl(null, Validators.email);
   senha: FormControl = new FormControl(null, Validators.minLength(3));
 
   constructor(
     private service: UsuarioComumService,
     private toast: ToastrService,
     private router: Router) { }
 
   ngOnInit(): void {
   }
 
   
   create(): void {
     this.service.create(this.usuariocomum).subscribe(() => {
       this.toast.success('Cliente cadastrado com sucesso', 'cadastro');
       this.router.navigate(['usuariocomum'])
     }, ex => {
       console.log(ex);
       if(ex.error.errors) {
         ex.error.errors.forEach(element => {
           this.toast.error(element.message);
         });
       } else {
         this.toast.error(ex.error.message);
       }
     })
   }
 
   addPerfil(perfil: any): void {
     if(this.usuariocomum.perfis.includes(perfil)) {
       this.usuariocomum.perfis.splice(this.usuariocomum.perfis.indexOf(perfil), 1);
     } else {
       this.usuariocomum.perfis.push(perfil);
     }
 
   }
 
   validaCampos(): boolean {
     return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
   }

}
