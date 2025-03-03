import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient){
  }

private API_URL: string= "http://localhost/prueba/index.php";
getPosts(){
  return this.http.get<Post[]>(this.API_URL);
}
//
//
//   ingresar1( usuario1: string, contraseña1: string){
// // console.log("llegaron los datos" + usuario1 + contraseña1);
// return this.http.post(`${this.API_URL}/datos.json`,{
//   usuario1: usuario1,
//   contraseña1: contraseña1

// })

//   }
}
export interface Post{
  id: number;
  nombre: string;
  descripcion: string;

}
