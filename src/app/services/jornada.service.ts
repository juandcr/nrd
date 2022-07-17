import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { urlBackend } from '../config';
import { LoginService } from './login.service';
import { host } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  private url= urlBackend;
  private httpHeaders  = new HttpHeaders({'Content-Type': 'application/json'});
  private isNotAuthorized(e:any):boolean{
    if (e.status==401|| e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  constructor(private http:HttpClient,private router:Router,private loginService:LoginService) { }


  private agregarAuthroizationHeaders(){
    let token= this.loginService.token
    if (token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token)
    }
    return this.httpHeaders;
  }

  toggleStatusJornadaSurvey( numeroJornada:number){
    return this.http.post(`${this.url}/admin/toggle/survey/${numeroJornada}`,{},
    {headers:new HttpHeaders({'Authorization':'Bearer '+ this.loginService.token})});
  }
}
