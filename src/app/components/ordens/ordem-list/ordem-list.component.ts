import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ordens } from 'src/app/models/ordens';
import { OrdemService } from 'src/app/services/ordem.service';

@Component({
  selector: 'app-ordem-list',
  templateUrl: './ordem-list.component.html',
  styleUrls: ['./ordem-list.component.css']
})
export class OrdemListComponent implements OnInit {

  ELEMENT_DATA: Ordens[] = []
  FILTERED_DATA: Ordens[] = []

  
  displayedColumns: string[] = ['id', 'titulo', 'cliente','tecnico','dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Ordens>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private service: OrdemService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Ordens>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  retornaStatus(status: any): string {
    if(status == '0'){
      return 'ABERTO'
    }else if(status == '1') {
      return 'EM ANDAMENTO'
    } else{
       return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0'){
      return 'BAIXA'
    }else if(prioridade == '1') {
      return 'MEDIA'
    } else{
       return 'ALTA'
    }

}

orderByStatus(status: any): void{
  let list: Ordens[] = []
  this.ELEMENT_DATA.forEach(element => {
    if(element.status == status)
      list.push(element)
  });
  this.FILTERED_DATA = list;
  this.dataSource = new MatTableDataSource<Ordens>(list);
  this.dataSource.paginator = this.paginator;
}

}
