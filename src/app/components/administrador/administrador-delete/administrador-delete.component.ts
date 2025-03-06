import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Adminstrador } from 'src/app/models/adminstrador';
import { AdminstradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-administrador-delete',
  templateUrl: './administrador-delete.component.html',
  styleUrls: ['./administrador-delete.component.css']
})
export class AdministradorDeleteComponent implements OnInit {


  gestor: Adminstrador = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  constructor(
    private service:AdminstradorService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.gestor.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.gestor.id).subscribe(resposta => {
      resposta.perfis = []
      this.gestor = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.gestor.id).subscribe(() => {
      this.toast.success('Gestor Deletado com sucesso', 'Delete');
      this.router.navigate(['gestores'])
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

}
