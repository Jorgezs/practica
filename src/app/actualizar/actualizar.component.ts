import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgregarService } from '../agregar.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent implements OnInit {
  item: any = {};
  activado: boolean = false;

  private readonly formBuilder = inject(FormBuilder);
  private readonly httpService = inject(AgregarService);
  private readonly route = inject(Router);

  editForm = this.formBuilder.nonNullable.group({
    nombre: "",
    descripcion: "",
  });

  ngOnInit(): void {
    this.editar();
  }

  editar() {
    let id = localStorage.getItem("id");
    if (!id) {
      alert("No tiene los datos del ID");
      return;
    }

    this.httpService.getItem(parseInt(id)).subscribe(data => {
      console.log("Datos obtenidos del servidor:", data);

      if (!data || data.length === 0) { // 👈 Verifica si el array está vacío
        alert("No se encontró el item en el servidor");
        return;
      }

      this.item = data[0]; // 👈 Extrae el primer elemento del array
      this.editForm.controls.nombre.setValue(this.item.nombre);
      this.editForm.controls.descripcion.setValue(this.item.descripcion);
    });
  }

  actualizar() {
    let updateItem: any = {
      id: this.item?.id, // 👈 Usa optional chaining para evitar errores
      nombre: this.editForm.controls.nombre.value,
      descripcion: this.editForm.controls.descripcion.value,
    };

    console.log("Datos enviados al servidor:", updateItem);

    if (updateItem.id && updateItem.nombre !== "" && updateItem.descripcion !== "") {
      this.httpService.putActualizar(updateItem).subscribe(
        data => {
          console.log("Respuesta del servidor:", data);
          this.activado = true;
        },
        error => {
          console.error("Error en la actualización:", error);
        }
      );
    } else {
      console.error("❌ Datos incompletos antes de enviar", updateItem);
    }
  }


  cerrarModal() {
    this.activado = false;
    this.route.navigate(["listar"]);
  }
}
