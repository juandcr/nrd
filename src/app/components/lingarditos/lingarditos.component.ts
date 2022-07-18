import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { LingarditoService } from 'src/app/services/lingardito.service';
import { Vote, VotePlayer } from '../models/players.model';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { alertFailure } from '../alertsUtils/alertUtils';


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
  constructor(private lingarditosService:LingarditoService, private spinner: NgxSpinnerService) {
    //this.spinner.show();
    lingarditosService.getLastLingardito().subscribe({
      next:(resp: { jornada: {id:number,titulo:string,active:boolean,jugadores:[{id:number,name:string,number:number,calificacion:0}]}})=>{
      this.open= resp.jornada.active;
      this.players=resp.jornada.jugadores;
      this.titulo= resp.jornada.titulo;
      this.id=resp.jornada.id;
      //this.spinner.hide();
      },
      error: (e: any) => {
        if (e.status == 500) {
          alertFailure("Error en el servidor, favor de contactar al desarrollador");
        }
        else {
          alertFailure(e.error.mensaje);          
        }
      }

    });
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
      this.lingarditosService.voteJornadaLingardito(voto,this.id).subscribe({
        next:(resp)=>{
          Swal.fire(
            'Voto registrado!',
            'SIUUUU!',
            'success'
          );        
        },
        error: (e)=>{
          if (e.status == 500) {
            alertFailure("Error en el servidor, favor de contactar al desarrollador");
          }
          else {            
            alertFailure(e.error.mensaje);
          }
        }
      });      
    }    
  }
  
  onChange(calificacion:string, player:any){
    player.calificacion=calificacion;    
  }

}
