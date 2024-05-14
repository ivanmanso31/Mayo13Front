import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideojuegoService } from '../-servicio/videojuego.service';
import { Videojuego } from '../-modelo/videojuego';
import { Observable } from 'rxjs';
import { InsertarComponent } from './insertar/insertar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [InsertarComponent,RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private servicio:VideojuegoService){}
  videojuegos:Videojuego[] = [];

  ngOnInit(): void {
    this.servicio.videojuegoCambio
    .subscribe((data) => {this.videojuegos = data}
    )
    
    this.servicio.mostrarTodos()
       .subscribe(datos => {
          this.videojuegos = datos;
          console.log("entra");
       })
  }

  eliminar(id:number){
    this.servicio.eliminar(id)
      .subscribe(()=>
        {
          this.servicio.mostrarTodos()
            .subscribe(data=>this.servicio.videojuegoCambio.next(data))
        })

  }

  recibirAviso(listaActualizada:Observable<Videojuego[]>){
      console.warn("regresa el padre ----")
      //listaActualizada.subscribe(data => this.empleados = data);
      this.servicio.mostrarTodos()
      .subscribe(datos => {
         this.videojuegos = datos;
         console.log("entra");

      })
  }
}
