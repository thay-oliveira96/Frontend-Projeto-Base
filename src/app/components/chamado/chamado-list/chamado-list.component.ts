import { style } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'defeitos', 'maquina', 'cliente', 'dataAbertura', 'status','prioridade', 'dataFechamento', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


  orderByStatus(status: any): void{
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }


}
