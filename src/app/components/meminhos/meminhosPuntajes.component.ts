import { Component, OnInit } from '@angular/core';
import { MemeroModel } from 'src/app/models/memero.model';
import { MeminhoServiceService } from 'src/app/services/meminho-service.service';

@Component({
  selector: 'app-meminhos-puntajes',
  templateUrl: './meminhosPuntajes.component.html',
  styleUrls: ['./meminhos.component.css']
})
export class MeminhosPuntajesComponent implements OnInit {

  memeros:any;
  constructor(private meminhosService:MeminhoServiceService) {
    meminhosService.getMemeros().subscribe(resp=>{      
      this.memeros=resp;
    });    
   }
  ngOnInit(): void {
  }

}
