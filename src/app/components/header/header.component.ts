import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();
  isMenuCollapsed = false;
  usuarioLogado = "Administrador";

  onToggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.toggleMenu.emit();
  }

  logout() {
    // Lógica de logout
  }
}