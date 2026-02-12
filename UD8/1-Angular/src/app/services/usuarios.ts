import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, Usuario } from '../interfaces/usuario';

import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UsuarioServices {
  private URL = environment.apiUrl;
  private token = sessionStorage.getItem('authToken');
  
private httpOptions = {
  
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${this.token}`
    })
  };

  private http = inject(HttpClient);

  login(usuario: Usuario): Observable<string> { // El método login ahora devuelve un Observable<string> que emitirá el token de autenticación en caso de éxito. El tipo de retorno se ha cambiado a string porque solo nos interesa el token, no todo el objeto de respuesta.
    return this.http.post<AuthResponse>(`${this.URL}/login`, usuario).pipe( // Realizamos la petición POST al endpoint de login, enviando el objeto usuario. Se espera una respuesta del tipo AuthResponse, que es una interfaz que define la estructura de la respuesta del servidor.
      map(response => response.data.accessToken),  // Extraemos el token del response
      tap(token => { // Aquí puedes almacenar el token de forma segura, por ejemplo, en sessionStorage o localStorage
        sessionStorage.setItem('authToken', token); // Almacena el token en sessionStorage. Puedes usar localStorage si quieres que el token persista incluso después de cerrar el navegador, pero sessionStorage es más seguro para tokens de autenticación. 
      }),
      catchError((error) => this.handleError(error)) // Manejamos cualquier error que pueda ocurrir durante la petición 
    );
   
  }

  getUsuarios(): Observable<Usuario[]> { // El método getUsuarios devuelve un Observable que emitirá un array de objetos Usuario. Este método se encarga de realizar una petición GET al endpoint correspondiente para obtener la lista de usuarios.  
    return this.http.get<Usuario[]>(`${this.URL}/usuarios`).pipe(
      map(response => response), // Aseguramos que la respuesta se trate como un array de Usuario
      catchError(this.handleError)
    );
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL}/usuarios/${id}`).pipe(
      map(response => response), // Aseguramos que la respuesta se trate como un objeto Usuario
      catchError(this.handleError)
    );
        }

  addUsuario(usuario: Usuario): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.URL}/usuarios`, usuario, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateUsuario(usuario: Usuario): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.URL}/usuarios/${usuario._id}`, usuario, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  //deleteUsuario(id: string): Observable<Usuario> {
  deleteUsuario(id: string): Observable<{ message: string }> { 
    return this.http.delete<{ message: string }>(`${this.URL}/usuarios/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    
   const errorMessage = error.error?.message || 'Error desconocido al procesar la solicitud';
   
   return throwError(() => new Error(errorMessage));
  }
}
