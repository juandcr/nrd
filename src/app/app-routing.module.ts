import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { JornadaComponent } from './components/meminhos/jornada.component';
import { MeminhosPuntajesComponent } from './components/meminhos/meminhosPuntajes.component';

const routes: Routes = [
  {path:'',component:HomeComponent}
  ,{path:'home',component:HomeComponent}
  ,{path:'meminhos/puntajes',component:MeminhosPuntajesComponent}
  ,{path:'meminhos/jornadas',component:JornadaComponent}
  ,{path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
