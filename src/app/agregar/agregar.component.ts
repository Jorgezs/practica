import { AgregarService } from './../agregar.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder , ReactiveFormsModule} from '@angular/forms';
import { inject } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-agregar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {

private readonly formBuilder = inject(FormBuilder);
private readonly httpService =inject(AgregarService);
private readonly route =inject(Router);

activado: boolean= false;

addForm = this.formBuilder.nonNullable.group({
  nombre: "",
  descripcion: "",
});

guardar()
{
  let item: any ={
    nombre: this.addForm.controls.nombre.value,
    descripcion: this.addForm.controls.descripcion.value
  }
  if(item.nombre !== "" && item.descripcion !== ""){
this.httpService.postAgregrar(item).subscribe(()=>{
this.activado=true;
})
  }
}
cerrarModal(){
  this.activado=false;
  this.route.navigate(["listar"])
}
}

