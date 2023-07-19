import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerJobDetailService {
  private baseUrl = "http://localhost:8080/api/v1/jobs";
  private baseUrl2 = "http://localhost:8080/api/v1/employer";

  constructor(private http: HttpClient) { }

  getJobPostingsDetails(jobId: any) {
    return this.http.get(`${this.baseUrl}/${jobId}`);
  }

  getCandidateListForCurrentJob(employerId : any, jobId: any) {
    return this.http.get(`${this.baseUrl2}/${employerId}/${jobId}/applications`);
  }
}
