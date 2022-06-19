import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Jornada } from '../models/jornada.model';
import { LoginService } from './login.service';
import { host } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LingarditoService {

  private url= host;
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

  players=[
    {name:'Bruno Fernandes', id: 18,calificacion:0},
    {name:'David De Gea', id: 1, calificacion:0},
    {name:'Harry Maguire', id: 5,calificacion:0},
    {name:'Rafa Varane', id: 19,calificacion:0},
    {name:'Diogo Dalot', id: 20,calificacion:0},
    {name:'Alex Telles', id: 27,calificacion:0},
    {name:'Scot McToiminay', id: 39,calificacion:0},
    {name:'Fred', id: 17,calificacion:0},
    {name:'Cristiano Ronaldo', id: 7,calificacion:0},
    {name:'Jadon Sancho', id: 25,calificacion:0},
    {name:'Elanga', id: 36,calificacion:0},
  ];

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
  getPlayers(){    
    return this.players;
  }

  getAllPlayers():Observable<any>{
    return this.http.get(`${this.url}/lingarditos/players`,{headers:this.agregarAuthroizationHeaders()}).pipe(
      catchError(e=>{
        this.isNotAuthorized(e);
        return throwError(()=>new Error('No Autorizado'));
      })
    );
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
}

