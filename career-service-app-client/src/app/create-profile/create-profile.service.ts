import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateProfileService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  uploadResume(candidateId: any, fileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadResume`, candidateId) as Observable<any>;
  }

}
