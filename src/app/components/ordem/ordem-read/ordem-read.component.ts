import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ordem } from 'src/app/models/ordem';
import { OrdemService } from 'src/app/services/ordem.service';

@Component({
  selector: 'app-ordem-read',
  templateUrl: './ordem-read.component.html',
  styleUrls: ['./ordem-read.component.css']
})
export class OrdemReadComponent implements OnInit {

  ordem: Ordem = {

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
    parada:       '',
    horaParada:   ''
  }

  constructor(
    private chamadoService: OrdemService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ordem.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.ordem.id).subscribe(resposta => {
      this.ordem = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO' 
    } else if(status == '1') {
      return 'EM ANDAMENTO' 
    }
    else if (status == '2'){
      return 'ENCERRADO'
    } else {
      return 'CANCELADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } 
    else if(prioridade == '1') {
      return 'MÉDIA'
    } else if(prioridade == '2'){
      return 'ALTA'
    } else {
      return '---DEFINA---'
    }
    
  }
  retornaCategoriaManutencao(categoriaManutencao: string): string {
    if(categoriaManutencao == 'MECANICA') {
      return 'MECANICA'
    } else if(categoriaManutencao == 'ELETRICA') {
      return 'ELETRICA'
    } else if (categoriaManutencao == 'HIDRAULICA'){
      return 'OUTRAS'
    } else if(categoriaManutencao == 'PNEUMATICA'){
      return 'PNEUMATICA'
    }else{
      return '---DEFINA---'
    }
  }

  retornaTipoManutencao(tipoManutencao: string): string {
    if(tipoManutencao == 'PREVENTIVA') {
      return 'PREVENTIVA'
    } else if(tipoManutencao == 'CORRETIVA') {
      return 'CORRETIVA'
    } else if (tipoManutencao == 'PREDITIVA'){
      return 'PREDITIVA'
    } else{
      return '---DEFINA---'
    }
  }
  
}
