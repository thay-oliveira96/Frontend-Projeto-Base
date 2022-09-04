import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departamentos } from 'src/app/models/departamentos';
import { Maquina } from 'src/app/models/maquina';
import { DepartamentoService } from 'src/app/services/departamentos.service';
import { MaquinaService } from 'src/app/services/maquina.service';

@Component({
  selector: 'app-maquina-update',
  templateUrl: './maquina-update.component.html',
  styleUrls: ['./maquina-update.component.css']
})
export class MaquinaUpdateComponent implements OnInit {

  maquina: Maquina = {
    id:               '',
    nome:             '',
    departamento:     '',
    observacoes:      '',
    nomeDepartamento: '',
  }

  departamentos: Departamentos[] = [];

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  departamento: FormControl =       new FormControl(null, Validators.required);
  observacoes: FormControl =        new FormControl(null, Validators.email);

  constructor(
    private service: MaquinaService,
    private departamentoService: DepartamentoService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.maquina.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllDepartamentos();
   }

  findById(): void {
    this.service.findById(this.maquina.id).subscribe(resposta => {
      this.maquina = resposta;
    })
  }

  update(): void {
    this.service.update(this.maquina).subscribe(() => {
      this.toast.success('Maquina atualizada com sucesso', 'Update');
      this.router.navigate(['maquina'])
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
  
  findAllDepartamentos(): void {
    this.departamentoService.findAll().subscribe(resposta => {
      this.departamentos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.nome.valid 
  }
}