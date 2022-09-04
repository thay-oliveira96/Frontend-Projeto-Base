import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Defeitos } from 'src/app/models/defeitos';
import { DefeitoService } from 'src/app/services/defeitos.service';

@Component({
  selector: 'app-defeitos-delete',
  templateUrl: './defeitos-delete.component.html',
  styleUrls: ['./defeitos-delete.component.css']
})
export class DefeitosDeleteComponent implements OnInit {

  defeitos: Defeitos = {
    id:         '',
    descricao:       ''
  }

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

  delete(): void {
    this.service.delete(this.defeitos.id).subscribe(() => {
      this.toast.success('Defeito Deletado com sucesso', 'Delete');
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

}
