import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Departamentos } from '../models/departamentos';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Departamentos> {
    return this.http.get<Departamentos>(`${API_CONFIG.baseUrl}/departamentos/${id}`);
  }

  findAll(): Observable<Departamentos[]> {
    return this.http.get<Departamentos[]>(`${API_CONFIG.baseUrl}/departamentos`);
  }

  create(departamentos: Departamentos): Observable<Departamentos> {
    return this.http.post<Departamentos>(`${API_CONFIG.baseUrl}/departamentos`, departamentos);

  }

  update(departamentos: Departamentos): Observable<Departamentos> {
    return this.http.put<Departamentos>(`${API_CONFIG.baseUrl}/departamentos/${departamentos.id}`, departamentos);
  }

  delete(id: any): Observable<Departamentos> {
    return this.http.delete<Departamentos>(`${API_CONFIG.baseUrl}/departamentos/${id}`);
  }
}
