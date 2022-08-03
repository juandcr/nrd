import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { LingarditoService } from 'src/app/services/lingardito.service';
import Swal from 'sweetalert2';
import { alertFailure } from '../alertsUtils/alertUtils'
@Component({
  selector: 'app-create-lingardito',
  templateUrl: './create-lingardito.component.html',
  styleUrls: ['./create-lingardito.component.css']
})
export class CreateLingarditoComponent implements OnInit {

  allPlayers= new Array();
  map = new Map();
  allPlayers2 = new Array();
  titulo = ""
  id = 0;

  constructor(private lingarditoService: LingarditoService) {
    lingarditoService.getAllPlayers().subscribe(res => {
      res.players.forEach((p: Player) => {        
        this.allPlayers.push({ name: p.name, id: p.id, checked: false, substitute:false });
      });      
    });
  }

  ngOnInit(): void {
  }

  getLastLingardito() {
    this.map.clear();
    this.lingarditoService.getLastLingardito().subscribe({
      next: (resp: { jornada: { id: number, titulo: string, jugadores: [{ id: number, name: string, number: number }] } }) => {
        resp.jornada.jugadores.forEach(j => {
          this.map.set(j.id, j.name);
        });
        this.id = resp.jornada.id;
        this.allPlayers.forEach((p: { name: string, id: any, checked: boolean, substitute:boolean}) => {
          if (this.map.has(p.id)) {
            p.checked = true;
          }
          else {
            p.checked = false;
          }
          this.titulo = resp.jornada.titulo;
        });
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


  createLingarditos() {
    let players = new Array();
    this.map.forEach((value: any, key: any) => {
      
      if(typeof value.substitute === "undefined"){
        value.substitute=false        
      }
      else{
        value.substitute=true        
      }
      players.push({ "id": key, "substitute": value.substitute });
    });    
    this.lingarditoService.createJornadaLingardito(this.titulo, players).subscribe({
      next: (resp: any) => {
        Swal.fire(
          'Jornada Lingarditos Creada',
          'SIUUU',
          'success'
        );
        this.map.clear();
        this.allPlayers.forEach((p: any) => {
          p.checked = false;
          p.substitute = false;
        });
        this.titulo = "";
      },
      error: (e) => {
        if (e.status == 500) {
          alertFailure("Error en el servidor, favor de contactar al desarrollador");
        }
        else {
          alertFailure(e.error.mensaje);
        }
      }
    });
  }


  onChange(evento: any, player: any) {
    let value: boolean = evento.currentTarget.checked
    player.checked = value;
    if (value) {
      this.map.set(player.id, {"player":player.name});
    }
    else {
      this.map.delete(player.id);
    }    
  }

  isSubstitute(evento: any, player:any){    
    let value: boolean = evento.currentTarget.checked    
    if (this.map.has(player.id)){
      this.map.set(player.id,{"player":player.name,"substitute":value});
    }
  }
}
