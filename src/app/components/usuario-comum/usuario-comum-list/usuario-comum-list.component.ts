import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioComum } from 'src/app/models/usuariocomum';
import { UsuarioComumService } from 'src/app/services/usuariocomum.service';


@Component({
  selector: 'app-usuario-comum-list',
  templateUrl: './usuario-comum-list.component.html',
  styleUrls: ['./usuario-comum-list.component.css']
})
export class UsuarioComumListComponent implements OnInit {

  ELEMENT_DATA: UsuarioComum[] = []
   
   displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
   dataSource = new MatTableDataSource<UsuarioComum>(this.ELEMENT_DATA);
   
   @ViewChild(MatPaginator) paginator: MatPaginator;
 
   constructor(
     private service: UsuarioComumService
   ) { }
 
   ngOnInit(): void {
     this.findAll();
   }
 
   findAll() {
     this.service.findAll().subscribe(resposta => {
       this.ELEMENT_DATA = resposta;
       this.dataSource = new MatTableDataSource<UsuarioComum>(resposta);
       this.dataSource.paginator = this.paginator;
     } )
   }
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
}
