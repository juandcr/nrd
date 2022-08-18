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
      backgroundColor: ["#ffffff",'#ff0000', '#800000', '#ff9933','#D7464A', '#ffcb00', '#009999','#6699ff', '#00cc99', '#6699ff','#0fb812'],
      hoverBackgroundColor: ["#ffffff",'#d9a5a7', '#ff3333', '#ffcc99','#f1c0c2', '#ffe066', '#00ffff','#99bbff', '#33ffcc', '#ccddff','#13ec17'],
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
        let colorBArray: string[]=[]
        let colorHArray: string[]=[]
        let rates= Object.values(r.ratings)[0];
        rates.forEach((item:string)=>{
          let index=parseInt(item.split("-")[1]);
          colorBArray.push(this.chartColors[0].backgroundColor[index])
          colorHArray.push(this.chartColors[0].hoverBackgroundColor[index])
        })
        let chartColors = [
          {
            backgroundColor: colorBArray,
            hoverBackgroundColor: colorHArray,
            borderWidth: 2,
          }
        ];
        r.config=chartColors;
        
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
