import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OfflineService } from './offline.service';

@Injectable({
  providedIn: 'root'
})
export class AgregarService {
  private readonly http = inject(HttpClient);
  private readonly offlineService = inject(OfflineService);
  API_URL: string = "http://localhost/prueba/index.php";

  constructor() {}

  getPosts(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  postAgregar(items: any): Observable<any> {
    if (!navigator.onLine) {
      this.offlineService.saveRequest(this.API_URL, 'POST', items);
      return of({ success: false, message: 'Guardado offline. Se sincronizará luego.' });
    }
    return this.http.post<any>(this.API_URL, items);
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/?id=${id}`);
  }

  putActualizar(item: any): Observable<any> {
    if (!navigator.onLine) {
      this.offlineService.saveRequest(this.API_URL, 'PUT', item);
      return of({ success: false, message: 'Guardado offline. Se sincronizará luego.' });
    }
    return this.http.put<any>(this.API_URL, item, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteEliminar(id: number): Observable<any> {
    if (!navigator.onLine) {
      this.offlineService.saveRequest(this.API_URL, 'DELETE', { id });
      return of({ success: false, message: 'Eliminado offline. Se sincronizará luego.' });
    }
    return this.http.delete<any>(this.API_URL, {
      body: { id }
    });
  }
}
