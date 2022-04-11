import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario:SocialUser;  
  isLogged:boolean;
  isAdmin:boolean;

  constructor( private socialAuthService:SocialAuthService, private router:Router, private loginService:LoginService ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(data=>{
      this.usuario=data;
      this.isLogged=(this.usuario!=null);
    }) 
    if (localStorage.getItem("jwt")){
      let jwt=localStorage.getItem("jwt");
      this.isAdmin=this.checkAdmin(jwt);
    }
    this.loginService.isAdmin$.subscribe(resp=>{      
      this.isAdmin=resp;
    })
  }

  logout(){
    this.socialAuthService.signOut().then( data=>{
      let jwt= localStorage.getItem("jwt");    
          if(jwt){
            localStorage.removeItem("jwt");
            this.loginService.isAdmin$.next(false);
          }
        });
      this.router.navigate(['/']);
    };
  
    checkAdmin(jwt:string|null):boolean{
      if (jwt){
        return JSON.parse(atob(jwt.split(".")[1])).elevated;
      }
      else{
        return false;
      }
      
    }

}
