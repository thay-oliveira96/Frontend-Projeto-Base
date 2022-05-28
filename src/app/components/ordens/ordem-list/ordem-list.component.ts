import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ordens } from 'src/app/models/ordens';

@Component({
  selector: 'app-ordem-list',
  templateUrl: './ordem-list.component.html',
  styleUrls: ['./ordem-list.component.css']
})
export class OrdemListComponent implements OnInit {

  ELEMENT_DATA: Ordens[] = [
    {
      id: 1,
      dataAbertura: '27/05/2022',
      dataFechamento: '27/05/2022',
      prioridade: 'ALTA',
      status: 'ANDAMENTO',
      titulo: 'Chamado 1',
      descricao: 'Teste Chamado',
      tecnico: 1,
      cliente: 6,
      nomeCliente: ' Valdir Cezar',
      nomeTecnico: 'Albert Eistein',
    }
  ]
  
  displayedColumns: string[] = ['id', 'titulo', 'cliente','tecnico','dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Ordens>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
