import { Component, inject} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { PruebaComponent } from "./prueba/prueba.component";
import { LoginComponent } from "./login/login.component";
import { ActualizarComponent } from "./actualizar/actualizar.component";
import { AgregarComponent } from "./agregar/agregar.component";
import { EliminarComponent } from './eliminar/eliminar.component';
import { ListaComponent } from './lista/lista.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PruebaComponent,EliminarComponent,ListaComponent , LoginComponent, ActualizarComponent, AgregarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practica';

private readonly router=inject(Router);
listar(){
  this.router.navigate(["/listar"]);
}
}

