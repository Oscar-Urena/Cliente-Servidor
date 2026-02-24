import { inject, Injectable } from '@angular/core';

import { environment } from "../../environments/environment"
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Juego } from '../interfaces/juego';
import { Estadisticas } from '../interfaces/estadisticas';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private URL = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json'
    })
  }

  private http = inject(HttpClient);

  getJuegos(): Observable<Juego[]>{
    return this.http.get<any>(`${this.URL}/games`).pipe(
      catchError(this.handleError)
    )
  }

  getJuego(id: string):Observable<Juego>{
    return this.http.get<Juego>(`${this.URL}/games/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getEstadisticas():Observable<Estadisticas>{
    return this.http.get<Estadisticas>(`${this.URL}/games/estadisticas`);
  }

  addJuego(juego: Juego): Observable<{id: string}>{
    return this.http.post<{id: string}>(`${this.URL}/games/`, juego, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  eliminar(id: Number): Observable<any>{
    return this.http.delete(`${this.URL}/games/${id}`);
  }

  updateJuego(id: number, juego: Juego): Observable<any>{
    return this.http.put(`${this.URL}/games/${id}`, juego, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    const errorMessage = error.error?.message || "Error desconocido en la solicitud";

    return throwError(() => new Error(errorMessage));
  }
}
