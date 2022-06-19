import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { LingarditoService } from 'src/app/services/lingardito.service';
import { Vote, VotePlayer } from '../models/players.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lingarditos',
  templateUrl: './lingarditos.component.html',
  styleUrls: ['./lingarditos.component.css']
})
export class LingarditosComponent implements OnInit {

  
  id=0;
  players:[{id:number,name:string,number:number,calificacion:0}];
  titulo:string
  open:boolean
  constructor(private lingarditosService:LingarditoService) {     
    lingarditosService.getLastLingardito().subscribe((resp: { jornada: {id:number,titulo:string,active:boolean,jugadores:[{id:number,name:string,number:number,calificacion:0}]}})=>{
      this.open= resp.jornada.active;
      this.players=resp.jornada.jugadores;
      this.titulo= resp.jornada.titulo;
      this.id=resp.jornada.id;
      console.log(this.titulo, this.players);
    })
  }

  ngOnInit(): void {
  }

  votar(){    
    let voto:Vote={players:[]};
    let complete=true;
    this.players.forEach(p=>{      
      if (!p.calificacion){        
        console.log("entre");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Favor de dar una calificacion a cada jugador',          
        });
        complete=false;        
      }
    });
    if (complete){
      this.players.forEach(p=>{
        let vote:VotePlayer={id:p.id,name:p.name,rate:p.calificacion};             
        voto.players.push(vote);        
      });
      this.lingarditosService.voteJornadaLingardito(voto,this.id).subscribe(resp=>{
        Swal.fire(
          'Voto registrado!',
          'SIUUUU!',
          'success'
        );        
      });
    }
    
  }
  
  onChange(calificacion:string, player:any){
    player.calificacion=calificacion;    
  }

}
