import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pet } from '../models/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Pets/';
  }

  getPets(employeeId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.myAppUrl + this.myApiUrl + employeeId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getPet(petId: number): Observable<Pet> {
    return this.http.get<Pet>(this.myAppUrl + this.myApiUrl + petId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

upsertPet(pet): Observable<Pet> {
  return this.http.post<Pet>(this.myAppUrl + this.myApiUrl, JSON.stringify(pet), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}

deletePet(petId: number): Observable<Pet> {
    return this.http.delete<Pet>(this.myAppUrl + this.myApiUrl + petId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
