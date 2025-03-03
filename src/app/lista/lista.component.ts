import { AgregarService } from './../agregar.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { DataTablesModule } from "angular-datatables";

@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormsModule, DataTablesModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  items: any[] = [];  // Variable para almacenar los items de la API
activado: boolean= false;
private readonly httpService = inject(AgregarService)
private readonly route= inject(Router);

nuevo(){
  this.route.navigate(["/añadir"]);
}


  ngOnInit(): void {
    this.httpService.getPosts().subscribe(data =>{
      this.items =data;
    })
  // Cargar los items cuando se inicialice el componente
  }

  editar(item: any): void {
    if (!item.id) {
      console.error("❌ Error: El item no tiene un ID válido", item);
      return;
    }
    localStorage.setItem("id", item.id.toString());
    this.route.navigate(["editar"]);
  }

  delete(item: any): void {
const isDelete= confirm("deseas borrar?");
if(isDelete){
  this.httpService.deleteEliminar(item.id).subscribe(()=>{
    this.items=this.items.filter(exis=> exis.id !== item.id);
    this.activado=true;
  })
}
  }
  cerrarModal(){
    this.activado=false;
  }

  // // Método para cargar los items desde la API
  // getPosts(): void {
  //   this.AgregarService.getPosts().subscribe((data) => {
  //     this.items = data;  // Almacenar la respuesta en la variable 'items'
  //   });
  // }

  // // Método para agregar un nuevo item
  // postAgregrar(): void {
  //   const newItem = { name: 'Nuevo Item' };
  //   this.AgregarService.postAgregrar(newItem).subscribe(() => {
  //     this.getPosts();  // Recargar los items después de agregar uno nuevo
  //   });
  // }

  // // Método para actualizar un item
  // putActualizar(id: number): void {
  //   const updatedItem = { name: 'Item Actualizado' };
  //   this.AgregarService.putActualizar(id, updatedItem).subscribe(() => {
  //     this.getPosts();  // Recargar los items después de actualizar uno
  //   });
  // }

  // // Método para eliminar un item
  // deleteEliminar(id: number): void {
  //   this.AgregarService.deleteEliminar(id).subscribe(() => {
  //     this.getPosts();  // Recargar los items después de eliminar uno
  //   });
  // }




  // nombre: string="";
  // descripcion: string= "";

  // agregar(){

  // }

}

