import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MeminhoServiceService {

  private url= "http://localhost:8080";
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

  getMemeros(){
    return this.http.get(`${this.url}/meminhos/memeros`,{headers:this.agregarAuthroizationHeaders()}).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);        
        return throwError(()=>new Error('No autorizado'));
      })
    );
  }


  getJornadas(){
    return this.http.get(`${this.url}/meminhos/jornadas`).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);
        return throwError(()=>new Error('No autorizado'));
      })
    );
  }

  getJornadaStatus(numberJornada:number){
    return this.http.get(`${this.url}/meminhos/jornadas/survey/${numberJornada}/status`).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);
        return throwError(()=>new Error('No autorizado'));
      })
    );
  }


  getParticipaciones(jornada:number){
    return this.http.get(`${this.url}/meminhos/jornadas/${jornada}`).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);        
        return throwError(()=>new Error('No autorizado'));
      })
    );
  }

  createMemero(nombre:string){
    /*const credenciales=btoa('nrd'+ ':'+'12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params=new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    return this.http.post<any>(`${this.url}/oauth/token`,params.toString(),{headers:httpHeaders})
    */    
    let params=new URLSearchParams();    
    params.set('nombre',nombre);
    params.set('total',"0");    
    return this.http.post(`${this.url}/meminhos/memero`,{"nombre":nombre,"total":0},{headers:this.agregarAuthroizationHeaders()});
  }
  uploadMeme(form:any){

    const formData= new FormData();
    formData.append('image',form.image);
    formData.append('temporada',form.temporada);
    formData.append('jornada',form.jornada);

    return this.http.post(`${this.url}/meminhos/memero/${form.id}/upload`,formData,
    {headers:new HttpHeaders({'Authorization':'Bearer '+ this.loginService.token})});
  }
}
