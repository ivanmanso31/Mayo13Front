import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VideojuegoService } from '../../-servicio/videojuego.service';
import { Videojuego } from '../../-modelo/videojuego';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-insertar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './insertar.component.html',
  styleUrl: './insertar.component.css'
})
export class InsertarComponent {
  form: FormGroup;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicio: VideojuegoService
  ) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'genero': new FormControl(''),
      'salida': new FormControl(0)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.formaFormulario();
    });
  }

  formaFormulario() {
    if (this.edicion) {
      this.servicio.mostrarPorId(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  operar() {
    let v: Videojuego = {
      'id': this.form.value['id'],
      'nombre': this.form.value['nombre'],
      'genero': this.form.value['genero'],
      'salida': this.form.value['salida']
    };

    const operation = this.edicion ? this.servicio.modificar(v) : this.servicio.insertar(v);

    operation.pipe(
      switchMap(() => this.servicio.mostrarTodos())
    ).subscribe(data => {
      this.servicio.videojuegoCambio.next(data);
      this.router.navigate(['']);
    });
  }
}
