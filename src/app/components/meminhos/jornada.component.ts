import { Component, OnInit } from '@angular/core';
import { MeminhoServiceService } from 'src/app/services/meminho-service.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {

  jornadas:any;
  constructor(private meminhoService:MeminhoServiceService) { }

  ngOnInit(): void {
    this.meminhoService.getJornadas().subscribe(resp=>{
      this.jornadas=resp;
    })
  }



}
