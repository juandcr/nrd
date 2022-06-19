import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/models/jornada.model';
import { LingarditoService } from 'src/app/services/lingardito.service';
import { Resultado, Resultados } from '../models/resultados.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  resultados:Resultados[]

  chartType = 'pie';

  chartDatasets = [
    { data: [300, 50, 100], label: 'My First dataset' }
  ];

  //chartLabels = ['1', '2', '3'];

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
    lingarditosService.getJornadas().subscribe((resp:any)=>{
      this.jornadas=resp.jornadas;      
    });    
  }

  ngOnInit(): void {
  }

  onChange(jornadaId:string){    
    this.lingarditosService.getJornadaById(jornadaId).subscribe((resp:any)=>{      
      this.resultados=resp.jornada;
      console.log(this.resultados);
      this.resultados.forEach(r=>{
        console.log(r);
        r.data=[{data:Object.values(r.ratings),label:r.player}]
        r.labels=Object.keys(r.ratings);        
      });      
    });    
  }
}
