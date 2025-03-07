import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioLogado: string = "Administrador do Sistema"; // Simulação de usuário logado
  @Input() drawer!: MatDrawer;

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}