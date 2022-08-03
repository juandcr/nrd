import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() isAdminEvent= new EventEmitter<boolean>();

  titulo:string ="Por favor inicia sesión";

  usuario:SocialUser;
  socialUser:SocialUser;
  isLogged:boolean;
  isAdmin:boolean;

  constructor(private loginService:LoginService,private router:Router, private socialAuthService:SocialAuthService) { 
    
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(
      data=>{
        this.usuario=data;
        this.isLogged=(this.usuario !=null);
        this.isAdmin=false;
      }
    )
  }

  login():void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp)=>{
        this.socialUser= resp;
        this.isLogged=true;             
        this.loginService.getJWTBackend(resp.idToken).subscribe(resp=>{
          localStorage.setItem("jwt",resp.value)
          let jwt= localStorage.getItem("jwt");    
          if(jwt){            
            let admin= JSON.parse(atob(jwt.split(".")[1])).elevated;
            this.loginService.isAdmin$.next(admin);
          }
          this.router.navigate(['/lingarditos/jornada']);
        });                
      });
    }  
}

