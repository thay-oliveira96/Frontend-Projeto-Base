import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Defeitos } from '../models/defeitos';

@Injectable({
  providedIn: 'root'
})
export class DefeitoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Defeitos> {
    return this.http.get<Defeitos>(`${API_CONFIG.baseUrl}/defeitos/${id}`);
  }

  findAll(): Observable<Defeitos[]> {
    return this.http.get<Defeitos[]>(`${API_CONFIG.baseUrl}/defeitos`);
  }

  create(defeitos: Defeitos): Observable<Defeitos> {
    return this.http.post<Defeitos>(`${API_CONFIG.baseUrl}/defeitos`, defeitos);

  }

  update(defeitos: Defeitos): Observable<Defeitos> {
    return this.http.put<Defeitos>(`${API_CONFIG.baseUrl}/defeitos/${defeitos.id}`, defeitos);
  }

  delete(id: any): Observable<Defeitos> {
    return this.http.delete<Defeitos>(`${API_CONFIG.baseUrl}/defeitos/${id}`);
  }
}
