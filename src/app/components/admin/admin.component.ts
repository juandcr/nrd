import { Component, OnInit } from '@angular/core';
import { JornadaService } from 'src/app/services/jornada.service';
import { MeminhoServiceService } from 'src/app/services/meminho-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  jornadas:any;

  constructor(private meminhoService:MeminhoServiceService, private jornadaService:JornadaService) { }

  ngOnInit(): void {
    this.meminhoService.getJornadas().subscribe(resp=>{
      this.jornadas=resp;      
    });
  }

  onChange(e:any){
    this.jornadaService.toggleStatusJornadaSurvey(e.target.value).subscribe(resp=>{});
  }

}
