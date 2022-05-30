import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gestor } from 'src/app/models/gestor';
import { GestorService } from 'src/app/services/gestor.service';

@Component({
  selector: 'app-gestor-list',
  templateUrl: './gestor-list.component.html',
  styleUrls: ['./gestor-list.component.css']
})
export class GestorListComponent implements OnInit {

  ELEMENT_DATA: Gestor[] = []
  
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Gestor>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: GestorService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Gestor>(resposta);
      this.dataSource.paginator = this.paginator;
    } )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}