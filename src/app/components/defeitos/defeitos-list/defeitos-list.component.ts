import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Defeitos } from 'src/app/models/defeitos';
import { DefeitoService } from 'src/app/services/defeitos.service';

@Component({
  selector: 'app-defeitos-list',
  templateUrl: './defeitos-list.component.html',
  styleUrls: ['./defeitos-list.component.css']
})
export class DefeitosListComponent implements OnInit {

  ELEMENT_DATA: Defeitos[] = []
  
  displayedColumns: string[] = ['id', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Defeitos>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: DefeitoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Defeitos>(resposta);
      this.dataSource.paginator = this.paginator;
    } )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}