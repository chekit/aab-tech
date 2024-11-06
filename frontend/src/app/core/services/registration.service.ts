import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationData, RegistrationResponse } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private http = inject(HttpClient);

  register(dto: RegistrationData): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>('http://localhost:3000/register', dto);
  }
}
