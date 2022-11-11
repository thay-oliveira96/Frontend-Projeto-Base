import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Defeitos } from 'src/app/models/defeitos';
import { Gestor } from 'src/app/models/gestor';
import { Maquina } from 'src/app/models/maquina';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DefeitoService } from 'src/app/services/defeitos.service';
import { GestorService } from 'src/app/services/gestor.service';
import { MaquinaService } from 'src/app/services/maquina.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

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
    nomeTecnico: '',
    nomeGestor: '',
    nomeMaquina: '',
    nomeDefeitos: '',
    parada:       ''
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
  obsTec:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);
  gestor:    FormControl = new FormControl(null, [Validators.required]);
  maquina:   FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private gestorService:  GestorService,
    private maquinaService: MaquinaService,
    private defeitoService: DefeitoService,
    private toastService:    ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.findAllGestores();
    this.findAllDefeitos();
    this.findAllMaquina();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
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

  findAllMaquina(): void {
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
       && this.gestor.valid && this.maquina.valid && this.tipoManutencao.valid
       && this.categoriaManutencao.valid
  }
}