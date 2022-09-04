import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departamentos } from 'src/app/models/departamentos';
import { Maquina } from 'src/app/models/maquina';
import { DepartamentoService } from 'src/app/services/departamentos.service';
import { MaquinaService } from 'src/app/services/maquina.service';

@Component({
  selector: 'app-maquina-create',
  templateUrl: './maquina-create.component.html',
  styleUrls: ['./maquina-create.component.css']
})
export class MaquinaCreateComponent implements OnInit {

  maquina: Maquina = {
    nome:  '',
    departamento:      '',
    observacoes:      '',
    nomeDepartamento: ''
    }

    departamentos: Departamentos[] = [];

  nome:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  departamento:    FormControl = new FormControl(null, [Validators.required]);
  
  constructor(
    private maquinaService: MaquinaService,
    private toastService:    ToastrService,
    private departamentoService: DepartamentoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllDepartamentos();
  }

  create(): void {
    this.maquinaService.create(this.maquina).subscribe(resposta => {
      this.toastService.success('Maquina adicionada com sucesso', 'Nova Maquina');
      this.router.navigate(['maquinas']);
    }, ex => {
      console.log(ex);
      
      this.toastService.error(ex.error.error);
    })
  }

  findAllDepartamentos(): void {
    this.departamentoService.findAll().subscribe(resposta => {
      this.departamentos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.observacoes.valid && this.nome.valid 
  }
}