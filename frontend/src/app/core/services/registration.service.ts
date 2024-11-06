import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationData } from '../../shared/models/registration-data';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private http = inject(HttpClient);

  register(dto: RegistrationData): Observable<any> {
    return this.http.post('http://localhost:3000/register', dto);
  }
}
