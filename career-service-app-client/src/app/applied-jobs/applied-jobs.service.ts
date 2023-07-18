import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllAppliedJobs(candidateId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidate/${candidateId}/applications`) as Observable<any>;
  }
}
