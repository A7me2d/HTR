import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private apiUrl = 'https://66cb41954290b1c4f199e054.mockapi.io/study';

  constructor(private http: HttpClient) {}

  // Fetch data from API
  userData:any = null;
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Update doctor schedule
  updateSchedule(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData);
  }

  // Add new doctor
  addDoctor(newDoctor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newDoctor);
  }

  // Delete a doctor
  deleteDoctor(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
