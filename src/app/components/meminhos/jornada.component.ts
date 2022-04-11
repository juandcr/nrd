import { Component, OnInit } from '@angular/core';
import { MeminhoServiceService } from 'src/app/services/meminho-service.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {

  jornadas:any;
  selectedJornada:any;
  participaciones:any;
  showJornada:boolean;
  surveyIsAble:boolean;  
  constructor(private meminhoService:MeminhoServiceService) { }

  ngOnInit(): void {    
    
    this.meminhoService.getJornadas().subscribe(resp=>{
      this.jornadas=resp;
    })
  }

  onChange(jornada:string){
    var jornadaNumber:number;
    jornadaNumber= parseInt(jornada);
    if (!isNaN(jornadaNumber)){
      this.meminhoService.getJornadaStatus(jornadaNumber).subscribe(isAble=>{
        if(isAble){
          this.surveyIsAble=true;
        }
        else{
          this.surveyIsAble=false;
        }
      })
      this.meminhoService.getParticipaciones(jornadaNumber).subscribe(resp=>{        
        this.participaciones= resp;        
        this.showJornada=true;
      })
    }else{
      this.showJornada=false
    }
  }



}
