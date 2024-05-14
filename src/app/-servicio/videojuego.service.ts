import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { entorno } from '../-entorno/entorno';
import { Videojuego } from '../-modelo/videojuego';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideojuegoService {
  private url:string = `${entorno.HOST}/videojuegos`;
  videojuegoCambio = new Subject<Videojuego[]>();

  constructor(private http:HttpClient) { }

  mostrarTodos(): Observable<Videojuego[]>{
    return this.http.get<Videojuego[]>(this.url)
    .pipe(
    map(data => {return data.sort((a,b) => a.id-b.id)})
    )
  };

  mostrarPorId(id:number){
    return this.http.get<Videojuego>(`${this.url}/${id}`);
  };

  insertar(v:Videojuego){
    return this.http.post(this.url,v);
  };

  modificar(v:Videojuego){
    return this.http.put(this.url,v);
  };

  eliminar(id:number){
    return this.http.delete<number>(`${this.url}/${id}`);
  };
}
