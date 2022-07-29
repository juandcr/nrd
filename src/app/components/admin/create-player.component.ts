import { Component, OnInit } from '@angular/core';
import { LingarditoService } from 'src/app/services/lingardito.service';
import Swal from 'sweetalert2';
import { Player } from '../models/players.model';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  roles=[]
  newPlayer: Player={
    name:"",
    role:"",
    number:0
  };

  constructor(private lingarditosService:LingarditoService) { }

  ngOnInit(): void {
    this.lingarditosService.getRoles().subscribe(resp=>{
      this.roles=resp.roles;
    })
  }

  crear(){   
    this.lingarditosService.createPlayer(this.newPlayer).subscribe(resp=>{
      Swal.fire(
        'Jugador registrado',
        'SIUUUU!',
        'success'
      );        
    })
  }
}
