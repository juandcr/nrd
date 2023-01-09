import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Player } from '../components/models/players.model';
import { urlBackend } from '../config';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class LingarditoService {

  private url= urlBackend;
  private httpHeaders  = new HttpHeaders({'Content-Type': 'application/json'});
  private isNotAuthorized(e:any):boolean{
    if (e.status==401|| e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  private agregarAuthroizationHeaders(){
    let token= this.loginService.token
    if (token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token)
    }
    return this.httpHeaders;
  }

  last= new Map();

  new= new Map();

  
  constructor(private http:HttpClient,private router:Router,private loginService:LoginService) { }

  getJornadas(){
    return this.http.get(`${this.url}/lingarditos/jornadas`,{headers:this.agregarAuthroizationHeaders()});
  }
  getJornadaById(id:string){
    return this.http.get(`${this.url}/lingarditos/jornada/${id}`,{headers:this.agregarAuthroizationHeaders()})

  }
  getLastLingardito():any{
    return this.http.get(`${this.url}/lingarditos/jornada/actual`,{headers:this.agregarAuthroizationHeaders()});    
  }
  
  getAllPlayers():Observable<any>{
    return this.http.get(`${this.url}/lingarditos/players`,{headers:this.agregarAuthroizationHeaders()}).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);
        return throwError(()=>new Error('No Autorizado'));
      })
    );
  }

  getRoles():Observable<any>{
    return this.http.get(`${this.url}/lingarditos/player/roles`,{headers:this.agregarAuthroizationHeaders()}).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);
        return throwError(()=>new Error('No Autorizado'));
      })
    );
  }

  createPlayer(player:Player){
    return this.http.post(`${this.url}/lingarditos/player`,player,{headers:this.agregarAuthroizationHeaders()});
  }

  createJornadaLingardito(titulo:string,players:any){
    let body={
      "titulo":titulo,
      "players":players
    }    
    return this.http.post(`${this.url}/lingarditos/jornada`,body,{headers:this.agregarAuthroizationHeaders()});
  }

  voteJornadaLingardito(body:any,jornadaId:number){
    return this.http.post(`${this.url}/lingarditos/jornada/votar/${jornadaId}`,body,{headers:this.agregarAuthroizationHeaders()});
  }

  toggleLingardito(){
    return this.http.post(`${this.url}/admin/toggle/lingardito`,{},
    {headers:new HttpHeaders({'Authorization':'Bearer '+ this.loginService.token})});
  }

  getAnnualPerformance(){
    return this.http.get(`${this.url}/lingarditos/players/performance`,{headers:this.agregarAuthroizationHeaders()}).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);
        return throwError(()=>new Error('No Autorizado'));
      })
    );
  }
}

