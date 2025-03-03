import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgregarService {
  private readonly http = inject(HttpClient);
  API_URL: string = "http://localhost/prueba/index.php";

  constructor() {}

  getPosts(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  postAgregrar(items: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, items);
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/?id=${id}`);
  }

  putActualizar(item: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.API_URL, item, { headers });
  }

  deleteEliminar(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL, {
      body: { id }
    });
  }
}
