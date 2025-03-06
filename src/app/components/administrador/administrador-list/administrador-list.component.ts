import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Adminstrador } from 'src/app/models/adminstrador';
import { AdminstradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-administrador-list',
  templateUrl: './administrador-list.component.html',
  styleUrls: ['./administrador-list.component.css']
})
export class AdministradorListComponent implements OnInit {

   ELEMENT_DATA: Adminstrador[] = []
   
   displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
   dataSource = new MatTableDataSource<Adminstrador>(this.ELEMENT_DATA);
   
   @ViewChild(MatPaginator) paginator: MatPaginator;
 
   constructor(
     private service: AdminstradorService
   ) { }
 
   ngOnInit(): void {
     this.findAll();
   }
 
   findAll() {
     this.service.findAll().subscribe(resposta => {
       this.ELEMENT_DATA = resposta;
       this.dataSource = new MatTableDataSource<Adminstrador>(resposta);
       this.dataSource.paginator = this.paginator;
     } )
   }
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
}
