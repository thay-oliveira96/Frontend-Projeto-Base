import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Gestor } from '../models/gestor';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Gestor> {
    return this.http.get<Gestor>(`${API_CONFIG.baseUrl}/gestores/${id}`);
  }

  findAll(): Observable<Gestor[]> {
    return this.http.get<Gestor[]>(`${API_CONFIG.baseUrl}/gestores`);
  }

  create(gestor: Gestor): Observable<Gestor> {
    return this.http.post<Gestor>(`${API_CONFIG.baseUrl}/gestores`, gestor);

  }

  update(gestor: Gestor): Observable<Gestor> {
    return this.http.put<Gestor>(`${API_CONFIG.baseUrl}/gestores/${gestor.id}`, gestor);
  }

  delete(id: any): Observable<Gestor> {
    return this.http.delete<Gestor>(`${API_CONFIG.baseUrl}/gestores/${id}`);
  }
}
