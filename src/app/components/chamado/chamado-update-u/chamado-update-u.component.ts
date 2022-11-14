import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Defeitos } from 'src/app/models/defeitos';
import { Maquina } from 'src/app/models/maquina';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DefeitoService } from 'src/app/services/defeitos.service';
import { MaquinaService } from 'src/app/services/maquina.service';

@Component({
  selector: 'app-chamado-update-u',
  templateUrl: './chamado-update-u.component.html',
  styleUrls: ['./chamado-update-u.component.css']
})
export class ChamadoUpdateUComponent implements OnInit {

  chamado: Chamado = {

    prioridade:  '3',
    status:      '0',
    tipoManutencao: 'DEFINA',
    categoriaManutencao: 'DEFINA',
    defeitos:      '',
    observacoes: '',
    obsTec:      '',
    tecnico:     1,
    cliente:     '',
    gestor:      11,
    maquina:     '', 
    nomeCliente: '',
    nomeTecnico: '',
    nomeGestor: '',
    nomeMaquina: '',
    nomeDefeitos: '',
    parada:       '',
    horaParada:   ''
  }

  clientes: Cliente[] = []
  maquinas: Maquina[] = []
  defeitoso: Defeitos[] = []

  defeitos:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);
  maquina:   FormControl = new FormControl(null, [Validators.required]);
  parada: FormControl = new FormControl(null, [Validators.required]);
  horaParada: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private maquinaService: MaquinaService,
    private defeitoService: DefeitoService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllMaquinas();
    this.findAllDefeitos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  update(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastService.success('Ordem de Manuteção Atualizada com sucesso', 'Atualizando Ordem de Manutebção');
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
    return this.defeitos.valid 
       && this.observacoes.valid && this.cliente.valid 
       && this.maquina.valid
  }

}
