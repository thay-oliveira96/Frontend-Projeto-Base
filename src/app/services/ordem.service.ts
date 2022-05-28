import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Ordens } from '../models/ordens';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Ordens[]>{
    return this.http.get<Ordens[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

}
