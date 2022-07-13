import { Component, OnInit } from '@angular/core';
import { JornadaService } from 'src/app/services/jornada.service';
import { LingarditoService } from 'src/app/services/lingardito.service';
import { MeminhoServiceService } from 'src/app/services/meminho-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //jornadas:any;
  active:boolean;

  constructor(private meminhoService:MeminhoServiceService, private jornadaService:JornadaService,private lingarditoService:LingarditoService) { }

  ngOnInit(): void {
    /*this.meminhoService.getJornadas().subscribe(resp=>{
      this.jornadas=resp;      
    });*/
    this.lingarditoService.getLastLingardito().subscribe((resp: any)=>{
      console.log(resp.jornada.active);
      this.active=resp.jornada.active;
    });
  }

  onChange(e:any){
    //this.jornadaService.toggleStatusJornadaSurvey(e.target.value).subscribe(resp=>{});
    this.lingarditoService.toggleLingardito().subscribe(resp=>{});
  }

}
