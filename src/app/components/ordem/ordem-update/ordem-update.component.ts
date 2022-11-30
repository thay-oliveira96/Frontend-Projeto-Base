import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Defeitos } from 'src/app/models/defeitos';
import { Gestor } from 'src/app/models/gestor';
import { Maquina } from 'src/app/models/maquina';
import { Ordem } from 'src/app/models/ordem';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { DefeitoService } from 'src/app/services/defeitos.service';
import { GestorService } from 'src/app/services/gestor.service';
import { MaquinaService } from 'src/app/services/maquina.service';
import { OrdemService } from 'src/app/services/ordem.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-ordem-update',
  templateUrl: './ordem-update.component.html',
  styleUrls: ['./ordem-update.component.css']
})
export class OrdemUpdateComponent implements OnInit {

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
    nomeMaquina: '',
    nomeDefeitos: '',
    parada:       '',
    horaParada:   ''
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []
  gestores: Gestor[] = []
  maquinas: Maquina[] = []
  defeitoso: Defeitos[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  tipoManutencao: FormControl = new FormControl(null, [Validators.required]);
  categoriaManutencao: FormControl = new FormControl(null, [Validators.required]);
  defeitos:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);
  gestor:    FormControl = new FormControl(null, [Validators.required]);
  maquina:   FormControl = new FormControl(null, [Validators.required]);
  obsTec: FormControl = new FormControl(null, [Validators.required]);
  parada: FormControl = new FormControl(null, [Validators.required]);
  horaParada: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private ordemService: OrdemService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private gestorService:  GestorService,
    private maquinaService: MaquinaService,
    private defeitoService: DefeitoService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ordem.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
    this.findAllGestores();
    this.findAllMaquinas();
    this.findAllDefeitos();
  }

  findById(): void {
    this.ordemService.findById(this.ordem.id).subscribe(resposta => {
      this.ordem = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  update(): void {
    this.ordemService.create(this.ordem).subscribe(resposta => {
      this.toastService.success('Ordem de Manuteção Atualizada com sucesso', 'Atualizando Ordem de Manutebção');
      this.router.navigate(['ordens']);
    }, ex => {
      console.log(ex);
      
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  findAllGestores(): void {
    this.gestorService.findAll().subscribe(resposta => {
      this.gestores = resposta;
    })
  }

  findAllMaquinas(): void {
    this.maquinaService.findAll().subscribe(resposta => {
      this.maquinas = resposta;
    })
  }

  findAllDefeitos(): void {
    this.defeitoService.findAll().subscribe(resposta => {
      this.defeitoso = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid && this.defeitos.valid 
       && this.observacoes.valid && this.tecnico.valid && this.cliente.valid 
       && this.gestor.valid && this.maquina.valid
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
      return ' '
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
