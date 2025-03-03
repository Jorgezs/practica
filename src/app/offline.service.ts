import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private pendingRequests: any[] = [];

  constructor(private http: HttpClient) {}

  saveRequest(url: string, method: string, body: any) {
    this.pendingRequests.push({ url, method, body });
    localStorage.setItem('offlineRequests', JSON.stringify(this.pendingRequests));
  }

  syncRequests() {
    if (!navigator.onLine) return;

    const storedRequests = localStorage.getItem('offlineRequests');
    if (storedRequests) {
      this.pendingRequests = JSON.parse(storedRequests);

      this.pendingRequests.forEach(req => {
        this.http.request(req.method, req.url, { body: req.body }).subscribe(
          () => console.log('✅ Sincronizado:', req),
          error => console.error('❌ Error al sincronizar:', error)
        );
      });

      localStorage.removeItem('offlineRequests');
      this.pendingRequests = [];
    }
  }
}
