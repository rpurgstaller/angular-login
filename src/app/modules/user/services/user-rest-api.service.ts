import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ObjectUnsubscribedError, Observable, throwError} from "rxjs";
import {User} from "../model/user";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
// todo create shared base class
export class UserRestApiService {

  // todo create shared constant or move to base class
  apiUrl = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // GET --> Fetch all users
  getUserList(): Observable<any> {
    return this.httpClient.get<User[]>(this.getUrl())
      .pipe(
        catchError(this.handleError)
      )
  }

  getUser(public_id: string): Observable<any> {
    return this.httpClient.get<User>(this.getUrl() + public_id)
      .pipe(
        catchError(this.handleError)
      )
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.getUrl(), JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteUser(public_id: string): Observable<User> {
    return this.httpClient.delete<User>(this.getUrl() + public_id, this.httpOptions)
  }

  updateUser(publicId: string, user: User): Observable<User> {
    return this.httpClient.put<User>(this.getUrl() + publicId, JSON.stringify(user), this.httpOptions)
  }


  // Error handling
  // todo write shared class for error handling
  handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if(error.error instanceof ErrorEvent) {
      // client-side error
      errorMsg = error.error.message;

    } else {
      // server-side error
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMsg);
    return throwError(errorMsg);
  }

  getUrl(): string {
    return this.apiUrl + /users/;
  }


}
