import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://apigame.gonzaloandreslucio.com/api/users';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

   getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
}


}
