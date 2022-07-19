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
   
    this.lingarditoService.getLastLingardito().subscribe((resp: any)=>{      
      this.active=resp.jornada.active;    
    });   
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
