import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/models/jornada.model';
import { LingarditoService } from 'src/app/services/lingardito.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  jornadas:Jornada[]

  constructor(private lingarditosService:LingarditoService) { 
    lingarditosService.getJornadas().subscribe((resp:any)=>{
      this.jornadas=resp.jornadas;      
    });    
  }

  ngOnInit(): void {
  }

  onChange(jornadaId:string){    
    this.lingarditosService.getJornadaById(jornadaId).subscribe(resp=>{
      console.log(resp);
    })
    
  }
}
