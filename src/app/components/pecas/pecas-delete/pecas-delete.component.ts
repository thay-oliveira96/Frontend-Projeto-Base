import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pecas } from 'src/app/models/pecas';
import { PecaService } from 'src/app/services/pecas.service';

@Component({
  selector: 'app-pecas-delete',
  templateUrl: './pecas-delete.component.html',
  styleUrls: ['./pecas-delete.component.css']
})
export class PecasDeleteComponent implements OnInit {

  pecas: Pecas = {
    id:         '',
    nome:       ''
  }

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

  delete(): void {
    this.service.delete(this.pecas.id).subscribe(() => {
      this.toast.success('Peça Deletada com sucesso', 'Delete');
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

}
