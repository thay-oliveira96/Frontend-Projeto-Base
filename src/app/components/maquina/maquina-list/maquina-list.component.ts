import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Maquina } from 'src/app/models/maquina';
import { MaquinaService } from 'src/app/services/maquina.service';

@Component({
  selector: 'app-maquina-list',
  templateUrl: './maquina-list.component.html',
  styleUrls: ['./maquina-list.component.css']
})
export class MaquinaListComponent implements OnInit {

  ELEMENT_DATA: Maquina[] = []
  FILTERED_DATA: Maquina[] = []

  displayedColumns: string[] = ['id', 'nome', 'departamento', 'observacoes', 'acoes'];
  dataSource = new MatTableDataSource<Maquina>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: MaquinaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Maquina>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
