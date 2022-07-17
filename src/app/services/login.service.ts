import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { urlBackend } from '../config';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = urlBackend;;
  private _usuario:Usuario;
  private _token:string;
  isAdmin$: Subject<boolean> = new Subject<boolean>();


  constructor(private http:HttpClient) { }

  get token(){
    if (this._token!=null){
      return this._token;
    }
    else{
      return localStorage.getItem("jwt");
    }    
  }  

  guardarUsuario(accessToken:string):void{
    let payload= this.obtenerDatosToken(accessToken)
    this._usuario= new Usuario();    
    this._usuario.username=payload.user_name;
    this._usuario.roles=payload.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario))
  }

  guardarToken(accessToken:string):void{
    this._token=accessToken;
    sessionStorage.setItem('token',this._token);
  }

  obtenerDatosToken(accessToken:string){    
    if (accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }
  
  getJWTBackend(tokenSocial:string):Observable<any>{    
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',      
    });    
    return this.http.post<any>(`${this.url}/oauth/google`,{"value":tokenSocial},{headers:httpHeaders})
    

  }
}

