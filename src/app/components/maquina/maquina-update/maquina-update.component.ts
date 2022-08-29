import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Maquina } from 'src/app/models/maquina';
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
    observacoes:      ''
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  departamento: FormControl =       new FormControl(null, Validators.required);
  observacoes: FormControl =        new FormControl(null, Validators.email);

  constructor(
    private service: MaquinaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.maquina.id = this.route.snapshot.paramMap.get('id');
    this.findById();
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
  
  validaCampos(): boolean {
    return this.nome.valid 
  }
}