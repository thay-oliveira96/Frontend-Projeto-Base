import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioComum } from 'src/app/models/usuariocomum';
import { UsuarioComumService } from 'src/app/services/usuariocomum.service';

@Component({
  selector: 'app-usuario-comum-update',
  templateUrl: './usuario-comum-update.component.html',
  styleUrls: ['./usuario-comum-update.component.css']
})
export class UsuarioComumUpdateComponent implements OnInit {

 
  usuariocomum: UsuarioComum = {
     id:         '',
     nome:       '',
     cpf:        '',
     email:      '',
     senha:      '',
     perfis:     [],
     dataCriacao: ''
   }
 
   nome: FormControl =  new FormControl(null, Validators.minLength(3));
   cpf: FormControl =       new FormControl(null, Validators.required);
   email: FormControl =        new FormControl(null, Validators.email);
   senha: FormControl = new FormControl(null, Validators.minLength(3));
 
   constructor(
     private service: UsuarioComumService,
     private toast:    ToastrService,
     private router:          Router,
     private route:   ActivatedRoute,
     ) { }
 
   ngOnInit(): void {
     this.usuariocomum.id = this.route.snapshot.paramMap.get('id');
     this.findById();
    }
 
   findById(): void {
     this.service.findById(this.usuariocomum.id).subscribe(resposta => {
       resposta.perfis = []
       this.usuariocomum = resposta;
     })
   }
 
   update(): void {
     this.service.update(this.usuariocomum).subscribe(() => {
       this.toast.success('Usuario atualizado com sucesso', 'Update');
       this.router.navigate(['usuariocomum'])
     }, ex => {
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
     return this.nome.valid && this.cpf.valid
      && this.email.valid && this.senha.valid
   }
}
