import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Defeitos } from 'src/app/models/defeitos';
import { DefeitoService } from 'src/app/services/defeitos.service';

@Component({
  selector: 'app-defeitos-update',
  templateUrl: './defeitos-update.component.html',
  styleUrls: ['./defeitos-update.component.css']
})
export class DefeitosUpdateComponent implements OnInit {

  defeitos: Defeitos = {
    id:         '',
    descricao:       ''
  }

  descricao: FormControl =  new FormControl(null, Validators.minLength(3));
  
  constructor(
    private service: DefeitoService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.defeitos.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.defeitos.id).subscribe(resposta => {
      this.defeitos = resposta;
    })
  }

  update(): void {
    this.service.update(this.defeitos).subscribe(() => {
      this.toast.success('Defeito atualizado com sucesso', 'Update');
      this.router.navigate(['defeitos'])
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
    return this.descricao.valid
  }
}