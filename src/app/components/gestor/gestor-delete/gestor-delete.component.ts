import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gestor } from 'src/app/models/gestor';
import { GestorService } from 'src/app/services/gestor.service';

@Component({
  selector: 'app-gestor-delete',
  templateUrl: './gestor-delete.component.html',
  styleUrls: ['./gestor-delete.component.css']
})
export class GestorDeleteComponent implements OnInit {

  gestor: Gestor = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  constructor(
    private service: GestorService,
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