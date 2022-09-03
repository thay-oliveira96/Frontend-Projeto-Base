import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departamentos } from 'src/app/models/departamentos';
import { DepartamentoService } from 'src/app/services/departamentos.service';

@Component({
  selector: 'app-departamentos-create',
  templateUrl: './departamentos-create.component.html',
  styleUrls: ['./departamentos-create.component.css']
})
export class DepartamentosCreateComponent implements OnInit {

  departamentos: Departamentos = {
    id:         '',
    nome:       ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: DepartamentoService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.departamentos).subscribe(() => {
      this.toast.success('Departamento cadastrado com sucesso', 'cadastro');
      this.router.navigate(['departamentos'])
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

  validaCampos(): boolean {
    return this.nome.valid
  }
  
}

