import { Component, OnInit } from '@angular/core';
import { LingarditoService } from 'src/app/services/lingardito.service';
import Swal from 'sweetalert2';
import { alertFailure } from '../alertsUtils/alertUtils'
@Component({
  selector: 'app-create-lingardito',
  templateUrl: './create-lingardito.component.html',
  styleUrls: ['./create-lingardito.component.css']
})
export class CreateLingarditoComponent implements OnInit {

  allPlayers: any;
  map = new Map();
  allPlayers2 = new Array();
  titulo = ""
  id = 0;

  constructor(private lingarditoService: LingarditoService) {
    lingarditoService.getAllPlayers().subscribe(res => {
      res.players.forEach((p: { name: any; id: any; }) => {
        let test = { name: p.name, id: p.id, checked: false }
        this.allPlayers2.push(test);
      })
      this.allPlayers = this.allPlayers2;
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
        this.allPlayers.forEach((p: { name: string, id: any; checked: boolean; }) => {
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
      players.push({ "id": key });
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
      this.map.set(player.id, player.name);
    }
    else {
      this.map.delete(player.id);
    }
  }


}
