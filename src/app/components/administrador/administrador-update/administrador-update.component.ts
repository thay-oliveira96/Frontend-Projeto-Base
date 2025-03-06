import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Adminstrador } from 'src/app/models/adminstrador';
import { AdminstradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-administrador-update',
  templateUrl: './administrador-update.component.html',
  styleUrls: ['./administrador-update.component.css']
})
export class AdministradorUpdateComponent implements OnInit {

  
  gestor: Adminstrador = {
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
    private service: AdminstradorService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.gestor.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.gestor.id).subscribe(resposta => {
      resposta.perfis = []
      this.gestor = resposta;
    })
  }

  update(): void {
    this.service.update(this.gestor).subscribe(() => {
      this.toast.success('Tecnico atualizado com sucesso', 'Update');
      this.router.navigate(['tecnicos'])
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
    if(this.gestor.perfis.includes(perfil)) {
      this.gestor.perfis.splice(this.gestor.perfis.indexOf(perfil), 1);
    } else {
      this.gestor.perfis.push(perfil);
    }
    
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }

}
