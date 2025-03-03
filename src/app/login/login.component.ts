import { CommonModule } from '@angular/common';
import { Component, OnInit, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private LoginService = inject(LoginService);
  posts$= this.LoginService.getPosts();
  // constructor(private http: LoginService){}

//   ngOnInit()  {

//     const usuario1= (document.querySelector('#usuario') as HTMLInputElement).value;
//     const contraseña1= (document.querySelector('#contraseña') as HTMLInputElement).value;
//     // console.log(usuario1)
//     // console.log(contraseña1)
//  this.http.ingresar1(usuario1, contraseña1).subscribe( response =>{
//   console.log("aaa" + response);
//  })
//   }

 }
