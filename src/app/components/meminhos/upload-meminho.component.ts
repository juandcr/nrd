import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Participacion } from 'src/app/models/participacion.model';
import { MeminhoServiceService } from 'src/app/services/meminho-service.service';
import Swal from 'sweetalert2';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-upload-meminho',
  templateUrl: './upload-meminho.component.html',  
})
export class UploadMeminhoComponent implements OnInit {

  memeros:any=[];
  jornadas:any=[];
  otro:boolean;
  otraJornada:boolean;
  buttonText:string="Enviar"
  datos:Participacion= new Participacion();
  file=[];

  constructor(private memeroService:MeminhoServiceService) { }

  ngOnInit(): void {
    this.datos.idParticipante="default";
    this.datos.jornada="default";
    this.memeroService.getMemeros().subscribe(resp=>{
      console.log(resp);
      this.memeros=resp;
    });
    this.memeroService.getJornadas().subscribe(resp=>{
      this.jornadas=resp;

    })
  }
  
  onChange(value:string){    
    if(value=="-1"){
      this.otro=true;
      this.buttonText="Crear"
    }
    else{
      this.otro=false;
      this.buttonText="Enviar"
    }
  }
  onChangeJornada(value:string){    
    if(value=="-1"){
      this.otraJornada=true;
      this.buttonText="Crear"      
    }
    else{
      this.otraJornada=false;
      this.buttonText="Enviar"
    }
  }

  uploadMeme(){
    
    console.log(this.datos);
    let id:string='';
    let jornada:string;
    let temporada:string;

    if(this.otraJornada){
      jornada=this.datos.jornadaNueva;
    }
    else{
      jornada=this.datos.jornada;
    }
    temporada='2021-2022';

    if(this.otro){      
      console.log("creando memero",this.datos.participante);
      this.memeroService.createMemero(this.datos.participante).subscribe((resp:any)=>{        
        id=resp.participante.id;        
        this.memeroService.uploadMeme({"image":this.file,"temporada":temporada,"jornada":jornada,"id":id}).subscribe(resp=>{          
        });
        this.alertSuccess('Participación registrada');
      });
    }
    else{ //ya existía el memero      
      id=this.datos.idParticipante;      
      this.memeroService.uploadMeme({"image":this.file,"temporada":temporada,"jornada":jornada,"id":id}).subscribe(resp=>{
        this.alertSuccess('Participación registrada');
      });
    }   
    
  }

  processFile(event:any){
    this.file= event.target.files[0];
  }

  alertSuccess(message:string){
    Swal.fire(
      `${message}`
    );
  }

}
