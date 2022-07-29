import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CreatePlayerComponent } from './components/admin/create-player.component';
import { ToggleSurveyComponent } from './components/admin/toggle-survey.component';
import { HomeComponent } from './components/home/home.component';
import { CreateLingarditoComponent } from './components/lingarditos/create-lingardito.component';
import { LingarditosComponent } from './components/lingarditos/lingarditos.component';
import { ResultadosComponent } from './components/lingarditos/resultados.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {path:'',component:HomeComponent}
  ,{path:'home',component:HomeComponent}  
  ,{path:'lingarditos/jornada/crear',component:CreateLingarditoComponent}  
  ,{path:'lingarditos/jornada',component:LingarditosComponent}
  ,{path:'lingarditos/jornada/resultados',component:ResultadosComponent}
  ,{path:'login',component:LoginComponent}
  ,{path:'admin',component:AdminComponent}
  ,{path:'admin/create-player',component:CreatePlayerComponent}
  ,{path:'admin/toogle-survey',component:ToggleSurveyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
