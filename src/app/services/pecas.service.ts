import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Departamentos } from '../models/departamentos';
import { Pecas } from '../models/pecas';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Departamentos> {
    return this.http.get<Pecas>(`${API_CONFIG.baseUrl}/pecas/${id}`);
  }

  findAll(): Observable<Pecas[]> {
    return this.http.get<Pecas[]>(`${API_CONFIG.baseUrl}/pecas`);
  }

  create(pecas: Pecas): Observable<Departamentos> {
    return this.http.post<Pecas>(`${API_CONFIG.baseUrl}/pecas`, pecas);

  }

  update(pecas: Pecas): Observable<Departamentos> {
    return this.http.put<Pecas>(`${API_CONFIG.baseUrl}/pecas/${pecas.id}`, pecas);
  }

  delete(id: any): Observable<Pecas> {
    return this.http.delete<Pecas>(`${API_CONFIG.baseUrl}/pecas/${id}`);
  }
}
