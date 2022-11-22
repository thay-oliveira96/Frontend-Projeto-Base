import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Ordem } from '../models/ordem';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Ordem> {
    return this.http.get<Ordem>(`${API_CONFIG.baseUrl}/ordens/${id}`);
  }

  findAll(): Observable<Ordem[]> {
    return this.http.get<Ordem[]>(`${API_CONFIG.baseUrl}/ordens`);
  }

  create(ordem: Ordem): Observable<Ordem> {
    return this.http.post<Ordem>(`${API_CONFIG.baseUrl}/ordens`, ordem);
  }

  update(ordem: Ordem): Observable<Ordem> {
    return this.http.put<Ordem>(`${API_CONFIG.baseUrl}/ordens/${ordem.id}`, ordem);
  }
}