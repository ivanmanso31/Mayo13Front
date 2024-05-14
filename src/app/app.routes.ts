import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InsertarComponent } from './inicio/insertar/insertar.component';

export const routes: Routes = [{path:'', component:InicioComponent, children:
[{path:'insertar', component:InsertarComponent},
{path:'actualizar/:id', component:InsertarComponent}
]
}
];
