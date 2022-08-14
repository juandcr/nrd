import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/models/jornada.model';
import { LingarditoService } from 'src/app/services/lingardito.service';
import { alertFailure } from '../alertsUtils/alertUtils';
import { Resultado, Resultados } from '../models/resultados.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  resultados:Resultados[];
  votos:number;

  chartType = 'pie';

  chartColors = [
    {
      backgroundColor: ['#A7464A', '#B6BFBD', '#CDB45C','#D7464A', '#E6BFBD', '#FDB45C','#A7464F', '#A6BFBB', '#BDB45C','#DDB45C'],
      hoverBackgroundColor: ['#A8464A', '#B7BFBD', '#CEB45C','#D8464A', '#E7BFBD', '#FEB45C','#A8464F', '#A8BFBB', '#BEB45C','#DEB45C'],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any): void {
    //console.log(event);
  }

  chartHovered(event: any): void {
   // console.log(event);
  }

  jornadas:Jornada[]

  constructor(private lingarditosService:LingarditoService) { 
    lingarditosService.getJornadas().subscribe({
      next:(resp:any)=>{
        this.jornadas=resp.jornadas;      
      },
      error:(e)=>{
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

  onChange(jornadaId:string){    
    this.lingarditosService.getJornadaById(jornadaId).subscribe({
      next:(resp:any)=>{      
      this.resultados=resp.jornada;
      this.votos=resp.votes;
      this.resultados.forEach(r=>{
        r.data=[{data:Object.values(r.ratings)[1],label:r.player}]
        r.labels=Object.values(r.ratings)[0];
      });      
    },
      error:(e)=>{
        if (e.status == 500) {
          alertFailure("Error en el servidor, favor de contactar al desarrollador" + e.error.message);
        }
        else {
          alertFailure(e.error.mensaje);
        }
      }    
    });    
  }
}
