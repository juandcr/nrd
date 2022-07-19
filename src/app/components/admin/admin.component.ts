import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { JornadaService } from 'src/app/services/jornada.service';
import { LingarditoService } from 'src/app/services/lingardito.service';
import { LoginService } from 'src/app/services/login.service';
import { alertFailure } from '../alertsUtils/alertUtils';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //jornadas:any;
  active:boolean;
  isAdmin:boolean;

  usuario:SocialUser;  
  isLogged:boolean;
  
  constructor(private router:Router,private socialAuthService:SocialAuthService,private jornadaService:JornadaService,private lingarditoService:LingarditoService, private loginService:LoginService, ) { }

  ngOnInit(): void {        

    if (localStorage.getItem("jwt")){
      let jwt=localStorage.getItem("jwt");
      this.isAdmin=this.checkAdmin(jwt);
    }
    else{
      console.log("no esta logeado")
      alertFailure("Se necesitan permisos de administrador para ver esta página");
      this.router.navigate(['/login']);
    }
    
    this.socialAuthService.authState.subscribe(data=>{
      this.usuario=data;
      this.isLogged=(this.usuario!=null);
    }) 
    
    this.loginService.isAdmin$.subscribe(resp=>{      
      this.isAdmin=resp;
      console.log(this.isAdmin)
      if (this.isAdmin){
        this.lingarditoService.getLastLingardito().subscribe((resp: any)=>{      
          this.active=resp.jornada.active;
          console.log("si es admin")
        });
      }
      else{
        console.log("no es admin")
        alertFailure("Se necesitan permisos de administrador para ver esta página");
        this.router.navigate(['/']);
      }
    })
    
  }

  onChange(e:any){    
    this.lingarditoService.toggleLingardito().subscribe(resp=>{});
  }
  checkAdmin(jwt:string|null):boolean{
    if (jwt){
      return JSON.parse(atob(jwt.split(".")[1])).elevated;
    }
    else{
      return false;
    }
    
  }

}
