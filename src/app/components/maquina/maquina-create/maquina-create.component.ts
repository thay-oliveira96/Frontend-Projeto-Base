import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Maquina } from 'src/app/models/maquina';
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
    observacoes:      ''
    }

  nome:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  departamento:    FormControl = new FormControl(null, [Validators.required]);
  
  constructor(
    private maquinaService: MaquinaService,
    private toastService:    ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
   
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

  validaCampos(): boolean {
    return this.observacoes.valid && this.nome.valid 
  }
}