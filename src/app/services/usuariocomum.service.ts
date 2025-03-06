import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UsuarioComum } from '../models/usuariocomum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioComumService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<UsuarioComum> {
    return this.http.get<UsuarioComum>(`${API_CONFIG.baseUrl}/usuariocomum/${id}`);
  }

  findAll(): Observable<UsuarioComum[]> {
    return this.http.get<UsuarioComum[]>(`${API_CONFIG.baseUrl}/usuariocomum`);
  }

  create(UsuarioComum: UsuarioComum): Observable<UsuarioComum> {
    return this.http.post<UsuarioComum>(`${API_CONFIG.baseUrl}/usuariocomum`, UsuarioComum);

  }

  update(UsuarioComum: UsuarioComum): Observable<UsuarioComum> {
    return this.http.put<UsuarioComum>(`${API_CONFIG.baseUrl}/usuariocomum/${UsuarioComum.id}`, UsuarioComum);
  }

  delete(id: any): Observable<UsuarioComum> {
    return this.http.delete<UsuarioComum>(`${API_CONFIG.baseUrl}/usuariocomum/${id}`);
  }
}
