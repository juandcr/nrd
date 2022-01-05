import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo:string ="Por favor inicia sesión";

  usuario:Usuario;

  constructor(private loginService:LoginService,private router:Router) { 
    this.usuario= new Usuario();
  }

  ngOnInit(): void {
  }

  login():void{
    console.log(this.usuario);
    if (this.usuario.username==null || this.usuario.password==null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña no pueden ser vacias '        
      })
      return;
    }
    this.loginService.login(this.usuario).subscribe(resp=>{      
      this.router.navigate(["/"]);   
      console.log(resp.access_token)   
      this.loginService.guardarUsuario(resp.access_token);
      this.loginService.guardarToken(resp.access_token);      
    });
  }

  
}

