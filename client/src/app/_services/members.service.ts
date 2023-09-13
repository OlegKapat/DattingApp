import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { Observable, take } from 'rxjs';
import { UserParams } from '../_modules/userParams';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  userParams: UserParams;
  user: User;
  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<any[]>(this.baseUrl + "users")
  }
  getMember(userName: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + "users/" + userName)
  }
  getUserParams() {
    return this.userParams;
  }
  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, { });     
  }
}
