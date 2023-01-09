import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { AdminComponent } from './components/admin/admin.component';
import { LingarditosComponent } from './components/lingarditos/lingarditos.component';
import { CreateLingarditoComponent } from './components/lingarditos/create-lingardito.component';
import { ResultadosComponent } from './components/lingarditos/resultados.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CreatePlayerComponent } from './components/admin/create-player.component';
import { ToggleSurveyComponent } from './components/admin/toggle-survey.component';
import { ModifyJornadaComponent } from './components/admin/modify-jornada.component';
import { PerformanceAnualComponent } from './components/lingarditos/performance-anual.component';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,    
    LoginComponent,    
    AdminComponent,
    LingarditosComponent,
    CreateLingarditoComponent,
    ResultadosComponent,
    CreatePlayerComponent,
    ToggleSurveyComponent,
    ModifyJornadaComponent,
    PerformanceAnualComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],  
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('196610426824-f1rfgn9opegu90saa5vfma9o847phcsr.apps.googleusercontent.com') // your client id
        }
      ]
    } as SocialAuthServiceConfig,
  },
    //AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
