import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Maquina } from 'src/app/models/maquina';
import { MaquinaService } from 'src/app/services/maquina.service';

@Component({
  selector: 'app-maquina-delete',
  templateUrl: './maquina-delete.component.html',
  styleUrls: ['./maquina-delete.component.css']
})
export class MaquinaDeleteComponent implements OnInit {

  maquina: Maquina = {
    id:               '',
    nome:             '',
    departamento:     '',
    observacoes:      '',
    nomeDepartamento: ''
  }

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

  delete(): void {
    this.service.delete(this.maquina.id).subscribe(() => {
      this.toast.success('Maquina Deletada com sucesso', 'Delete');
      this.router.navigate(['maquinas'])
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