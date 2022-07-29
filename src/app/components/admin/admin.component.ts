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

  
  constructor() { }

  ngOnInit(): void {        
   
    
  }
  
  
}
