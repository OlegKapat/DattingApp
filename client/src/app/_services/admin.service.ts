import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUsersWithRoles():Observable<User[]>{
   return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }
  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {}); 
  }
}
