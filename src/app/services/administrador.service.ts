import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Adminstrador } from '../models/adminstrador';

@Injectable({
  providedIn: 'root'
})
export class AdminstradorService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Adminstrador> {
    return this.http.get<Adminstrador>(`${API_CONFIG.baseUrl}/administrador/${id}`);
  }

  findAll(): Observable<Adminstrador[]> {
    return this.http.get<Adminstrador[]>(`${API_CONFIG.baseUrl}/administrador`);
  }

  create(administrador: Adminstrador): Observable<Adminstrador> {
    return this.http.post<Adminstrador>(`${API_CONFIG.baseUrl}/administrador`, administrador);

  }

  update(administrador: Adminstrador): Observable<Adminstrador> {
    return this.http.put<Adminstrador>(`${API_CONFIG.baseUrl}/administrador/${administrador.id}`, administrador);
  }

  delete(id: any): Observable<Adminstrador> {
    return this.http.delete<Adminstrador>(`${API_CONFIG.baseUrl}/administrador/${id}`);
  }
}
