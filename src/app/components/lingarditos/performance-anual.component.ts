import { Component, OnInit } from '@angular/core';
import { LingarditoService } from 'src/app/services/lingardito.service';

@Component({
  selector: 'app-performance-anual',
  templateUrl: './performance-anual.component.html',
  styleUrls: ['./performance-anual.component.css']
})
export class PerformanceAnualComponent implements OnInit {

  constructor(private lingarditoService:LingarditoService) { }

  performances:any;

  ngOnInit(): void {
    this.lingarditoService.getAnnualPerformance().subscribe((resp:any)=>{
      console.log(resp.annualPerformance)
      this.performances= resp.annualPerformance;
    });   
  }

}
