import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddJobService {
  private baseUrl = "http://localhost:8080/api/v1/employer";

  constructor(private http: HttpClient) {}

   addJobPosting(employerId: String, formData: any) : Observable<any> {
    return this.http.post( `${this.baseUrl}/jobs`, formData, {responseType: 'text'}) as Observable<any>;
  }

}
