import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pecas } from 'src/app/models/pecas';
import { PecaService } from 'src/app/services/pecas.service';

@Component({
  selector: 'app-pecas-create',
  templateUrl: './pecas-create.component.html',
  styleUrls: ['./pecas-create.component.css']
})
export class PecasCreateComponent implements OnInit {

  pecas: Pecas = {
    id:         '',
    nome:       ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: PecaService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.pecas).subscribe(() => {
      this.toast.success('Peça cadastrada com sucesso', 'cadastro');
      this.router.navigate(['pecas'])
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

