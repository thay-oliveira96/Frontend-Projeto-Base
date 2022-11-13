import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {

    prioridade:  '',
    status:      '',
    tipoManutencao: '',
    categoriaManutencao: '',
    defeitos:      '',
    observacoes: '',
    obsTec:      '',
    tecnico:     '',
    cliente:     '',
    gestor:      '', 
    maquina:     '',
    nomeCliente: '',
    nomeGestor:  '',
    nomeTecnico: '',
    nomeMaquina:  '',
    nomeDefeitos: '',
    parada:       ''
  }

  constructor(
    private chamadoService: ChamadoService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
  retornaCategoriaManutencao(categoriaManutencao: string): string {
    if(categoriaManutencao == '0') {
      return 'BAIXA'
    } else if(categoriaManutencao == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  retornaTipoManutencao(tipoManutencao: string): string {
    if(tipoManutencao == '0') {
      return 'BAIXA'
    } else if(tipoManutencao == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

}
