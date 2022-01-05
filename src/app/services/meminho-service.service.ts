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

}
