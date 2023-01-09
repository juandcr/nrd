import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/models/jornada.model';
import { Player } from 'src/app/models/player';
import { LingarditoService } from 'src/app/services/lingardito.service';
import { alertFailure } from '../alertsUtils/alertUtils';


@Component({
  selector: 'app-modify-jornada',
  templateUrl: './modify-jornada.component.html',
  styleUrls: ['./modify-jornada.component.css']
})
export class ModifyJornadaComponent implements OnInit {
  
  mapJornada = new Map();
  allPlayers = new Array();
  titulo : string = "";

  constructor(private lingarditoService : LingarditoService) { 

    lingarditoService.getAllPlayers().subscribe(res => {
      res.players.forEach((p: Player) => {        
        this.allPlayers.push({ name: p.name, id: p.id, checked: false, substitute:false });
      });
    });

    lingarditoService.getLastLingardito().subscribe({
      next: (resp:any)=>{
        console.log(resp.jornada.jugadores);
        resp.jornada.jugadores.forEach((jugador: { id: any; })=>{
          this.allPlayers.find(player => player.id === jugador.id).checked = true;
        })
        this.titulo = resp.jornada.titulo
      },
      error:(e:any)=>{
        if (e.status == 500) {
          alertFailure("Error en el servidor, favor de contactar al desarrollador" + e.error.message);
        }
        else {
          alertFailure(e.error.mensaje);
        }
      }
      

    });
    
  }

  ngOnInit(): void {
  }

  
  onChange(evento: any, player: any) {
    let value: boolean = evento.currentTarget.checked
    player.checked = value;
    if (value) {
      this.mapJornada.set(player.id, player.substitute);
    }
    else {
      this.mapJornada.delete(player.id);
    }    
  }

  isSubstitute(evento: any, player:any){    
    let value: boolean = evento.currentTarget.checked    
    if (this.mapJornada.has(player.id)){
      this.mapJornada.set(player.id,value);
    }    
    
  }

}
