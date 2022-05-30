import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gestor } from 'src/app/models/gestor';
import { GestorService } from 'src/app/services/gestor.service';

@Component({
  selector: 'app-gestor-create',
  templateUrl: './gestor-create.component.html',
  styleUrls: ['./gestor-create.component.css']
})
export class GestorCreateComponent implements OnInit {


  gestor: Gestor = {
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
    private service: GestorService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.gestor).subscribe(() => {
      this.toast.success('Gestor cadastrado com sucesso', 'cadastro');
      this.router.navigate(['gestor'])
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
    if(this.gestor.perfis.includes(perfil)) {
      this.gestor.perfis.splice(this.gestor.perfis.indexOf(perfil), 1);
    } else {
      this.gestor.perfis.push(perfil);
    }

  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }
  
}
