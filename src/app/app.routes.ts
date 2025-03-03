import { Routes } from '@angular/router';
import { AgregarComponent } from './agregar/agregar.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { ListaComponent } from './lista/lista.component';

export const routes: Routes = [
  {path: "añadir", component: AgregarComponent},
  {path: "editar", component: ActualizarComponent},
  {path: "listar", component: ListaComponent},
  {path: "", redirectTo:"/listar", pathMatch: "full"},
  {path: "**",redirectTo:"/listar", pathMatch: "full"},

];
