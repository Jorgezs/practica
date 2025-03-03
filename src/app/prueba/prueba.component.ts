import { Component } from '@angular/core';
import { Usuario } from './usuario';
import { CommonModule } from '@angular/common';
import { Roles } from './usuario';


@Component({
  selector: 'app-prueba',
  imports: [CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  constructor(){
  }

 ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 }
// user: Usuario={
//   ID: 1,
//   Nombre: 'jorge',
//   Apellido: 'Lopez',
//   Edad: 1,
//   TypeUser: Roles.Administrador
// }

user: Usuario[]=[{
  ID: 1,
  Nombre: 'jorge',
  Apellido: 'Lopez',
  Edad: 1,
  TypeUser: Roles.Administrador
},
{
ID: 2,
Nombre: 'Armando',
Apellido: 'Lopez',
Edad: 18,
TypeUser: Roles.Usuario
}
]
}
