import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioComum } from 'src/app/models/usuariocomum';
import { UsuarioComumService } from 'src/app/services/usuariocomum.service';

@Component({
  selector: 'app-usuario-comum-delete',
  templateUrl: './usuario-comum-delete.component.html',
  styleUrls: ['./usuario-comum-delete.component.css']
})
export class UsuarioComumDeleteComponent implements OnInit {

  usuariocomum: UsuarioComum = {
     id:         '',
     nome:       '',
     cpf:        '',
     email:      '',
     senha:      '',
     perfis:     [],
     dataCriacao: ''
   }
 
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
 
   delete(): void {
     this.service.delete(this.usuariocomum.id).subscribe(() => {
       this.toast.success('Cliente Deletado com sucesso', 'Delete');
       this.router.navigate(['clientes'])
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
}
