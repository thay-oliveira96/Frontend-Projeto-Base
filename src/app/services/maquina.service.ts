import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Maquina } from '../models/maquina';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Maquina> {
    return this.http.get<Maquina>(`${API_CONFIG.baseUrl}/maquinas/${id}`);
  }

  findAll(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(`${API_CONFIG.baseUrl}/maquinas`);
  }

  create(maquina: Maquina): Observable<Maquina> {
    return this.http.post<Maquina>(`${API_CONFIG.baseUrl}/maquinas`, maquina);
  }

  update(maquina: Maquina): Observable<Maquina> {
    return this.http.put<Maquina>(`${API_CONFIG.baseUrl}/maquinas/${maquina.id}`, maquina);
  }

  delete(id: any): Observable<Maquina> {
    return this.http.delete<Maquina>(`${API_CONFIG.baseUrl}/maquinas/${id}`);
  }
}