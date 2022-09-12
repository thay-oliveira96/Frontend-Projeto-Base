import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pecas } from 'src/app/models/pecas';
import { PecaService } from 'src/app/services/pecas.service';

@Component({
  selector: 'app-pecas-update',
  templateUrl: './pecas-update.component.html',
  styleUrls: ['./pecas-update.component.css']
})
export class PecasUpdateComponent implements OnInit {

  pecas: Pecas = {
    id:         '',
    nome:       ''
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  
  constructor(
    private service: PecaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.pecas.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.pecas.id).subscribe(resposta => {
      this.pecas = resposta;
    })
  }

  update(): void {
    this.service.update(this.pecas).subscribe(() => {
      this.toast.success('Peça atualizada com sucesso', 'Update');
      this.router.navigate(['pecas'])
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