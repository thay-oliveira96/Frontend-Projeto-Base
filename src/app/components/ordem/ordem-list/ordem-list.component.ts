import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ordem } from 'src/app/models/ordem';
import { OrdemService } from 'src/app/services/ordem.service';

@Component({
  selector: 'app-ordem-list',
  templateUrl: './ordem-list.component.html',
  styleUrls: ['./ordem-list.component.css']
})
export class OrdemListComponent implements OnInit {

  ELEMENT_DATA: Ordem[] = []
  FILTERED_DATA: Ordem[] = []

  displayedColumns: string[] = ['id', 'defeitos', 'maquina', 'cliente', 'dataAbertura', 'status','prioridade', 'dataFechamento', 'acoes'];
  dataSource = new MatTableDataSource<Ordem>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: OrdemService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Ordem>(resposta);
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
    let list: Ordem[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Ordem>(list);
    this.dataSource.paginator = this.paginator;
  }


}
