import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departamentos } from 'src/app/models/departamentos';
import { DepartamentoService } from 'src/app/services/departamentos.service';

@Component({
  selector: 'app-departamentos-update',
  templateUrl: './departamentos-update.component.html',
  styleUrls: ['./departamentos-update.component.css']
})
export class DepartamentosUpdateComponent implements OnInit {

  departamentos: Departamentos = {
    id:         '',
    nome:       ''
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  
  constructor(
    private service: DepartamentoService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.departamentos.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.departamentos.id).subscribe(resposta => {
      this.departamentos = resposta;
    })
  }

  update(): void {
    this.service.update(this.departamentos).subscribe(() => {
      this.toast.success('Departamento atualizado com sucesso', 'Update');
      this.router.navigate(['departamentos'])
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
  
  validaCampos(): boolean {
    return this.nome.valid
  }
}