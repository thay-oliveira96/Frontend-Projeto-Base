import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Defeitos } from 'src/app/models/defeitos';
import { DefeitoService } from 'src/app/services/defeitos.service';

@Component({
  selector: 'app-defeitos-create',
  templateUrl: './defeitos-create.component.html',
  styleUrls: ['./defeitos-create.component.css']
})
export class DefeitosCreateComponent implements OnInit {

  defeitos: Defeitos = {
    id:         '',
    descricao:       ''
  }

  descricao: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: DefeitoService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.defeitos).subscribe(() => {
      this.toast.success('Defeito cadastrado com sucesso', 'cadastro');
      this.router.navigate(['defeitos'])
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
    return this.descricao.valid
  }
  
}

