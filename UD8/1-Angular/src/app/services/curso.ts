import { inject, Injectable } from '@angular/core';


import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from '../interfaces/curso';

@Injectable({
  providedIn: 'root',
})

export class CursoServices {
  private URL = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private http = inject(HttpClient);

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.URL}/cursos`).pipe(
      catchError(this.handleError)
    );
  }

  getCurso(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.URL}/cursos/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  addCurso(curso: Curso): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.URL}/cursos`, curso, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateCurso(curso:Curso):Observable<{message: string}>{
    return this.http.put<{message: string}>(`${this.URL}/cursos/${curso._id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  deleteCurso(id:string):Observable<{message: string}>{
    return this.http.delete<{message: string}>(`${this.URL}/cursos/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }



  private handleError(error: HttpErrorResponse) {
    console.log(error);

    const errorMessage = error.error?.message || "Error desconocido en la solicitud";

    return throwError(() => new Error(errorMessage));
  }
}
