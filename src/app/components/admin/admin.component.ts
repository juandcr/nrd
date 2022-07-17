import { Component, OnInit } from '@angular/core';
import { JornadaService } from 'src/app/services/jornada.service';
import { LingarditoService } from 'src/app/services/lingardito.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //jornadas:any;
  active:boolean;

  constructor(private jornadaService:JornadaService,private lingarditoService:LingarditoService) { }

  ngOnInit(): void {    
    this.lingarditoService.getLastLingardito().subscribe((resp: any)=>{      
      this.active=resp.jornada.active;
    });
  }

  onChange(e:any){    
    this.lingarditoService.toggleLingardito().subscribe(resp=>{});
  }

}
