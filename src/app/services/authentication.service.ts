import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_URL } from './globals';
import { User } from '../models';
import jwt_decode from 'jwt-decode';
import { SignupBodyData } from 'src/types/api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private setSession(token: string) {
    const user: User = jwt_decode(token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(name: string, password: string) {
    return this.http
      .post(
        API_URL + '/auth/login',
        { name, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token) => {
          const user: User = jwt_decode(token);
          this.setSession(token);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  signup(data: SignupBodyData) {
    const body = {
      Name: data.name,
      Email: data.email,
      Password: data.password,
      PhoneNumber: data.phoneNumber,
    };
    return this.http
      .post(API_URL + '/auth/signup', body, { responseType: 'text' })
      .pipe(
        map((token) => {
          const user: User = jwt_decode(token);
          this.setSession(token);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    //remove user from localStorage
    this.currentUserSubject.next(null);
    localStorage.clear();
  }
}
