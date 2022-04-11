import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { JornadaComponent } from './components/meminhos/jornada.component';
import { MeminhosPuntajesComponent } from './components/meminhos/meminhosPuntajes.component';
import { UploadMeminhoComponent } from './components/meminhos/upload-meminho.component';

const routes: Routes = [
  {path:'',component:HomeComponent}
  ,{path:'home',component:HomeComponent}
  ,{path:'meminhos/puntajes',component:MeminhosPuntajesComponent}
  ,{path:'meminhos/crear',component:UploadMeminhoComponent}
  ,{path:'meminhos/jornadas',component:JornadaComponent}
  ,{path:'login',component:LoginComponent}
  ,{path:'admin',component:AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
