import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url= "http://localhost:8080";
  private _usuario:Usuario;
  private _token:string


  constructor(private http:HttpClient) { }

  get token(){
    if (this._token!=null){
      return this._token;
    }
    else{
      return sessionStorage.getItem("token");
    }    
  }

  guardarUsuario(accessToken:string):void{
    let payload= this.obtenerDatosToken(accessToken)
    this._usuario= new Usuario();
    console.log(payload)
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
  login(usuario:Usuario):Observable<any>{
    const credenciales=btoa('nrd'+ ':'+'12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params=new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    return this.http.post<any>(`${this.url}/oauth/token`,params.toString(),{headers:httpHeaders})

  }
}

