import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departamentos } from 'src/app/models/departamentos';
import { DepartamentoService } from 'src/app/services/departamentos.service';

@Component({
  selector: 'app-departamentos-delete',
  templateUrl: './departamentos-delete.component.html',
  styleUrls: ['./departamentos-delete.component.css']
})
export class DepartamentosDeleteComponent implements OnInit {

  departamentos: Departamentos = {
    id:         '',
    nome:       ''
  }

  constructor(
    private service: DepartamentoService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.departamentos.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.departamentos.id).subscribe(resposta => {
      this.departamentos = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.departamentos.id).subscribe(() => {
      this.toast.success('Empresa Deletada com sucesso', 'Delete');
      this.router.navigate(['departamentos'])
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
