import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateProfileService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadResume(candidateId: any, fileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidate/${candidateId}/resume/upload`, fileData) as Observable<any>;
  }

  downloadResume(candidateId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidate/${candidateId}/resume/download`) as Observable<any>;
  }

}
