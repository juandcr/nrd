import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MeminhosPuntajesComponent } from './components/meminhos/meminhosPuntajes.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { JornadaComponent } from './components/meminhos/jornada.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { UploadMeminhoComponent } from './components/meminhos/upload-meminho.component';
import { AdminComponent } from './components/admin/admin.component';
import { LingarditosComponent } from './components/lingarditos/lingarditos.component';
import { CreateLingarditoComponent } from './components/lingarditos/create-lingardito.component';
import { ResultadosComponent } from './components/lingarditos/resultados.component';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    MeminhosPuntajesComponent,
    LoginComponent,
    JornadaComponent,
    UploadMeminhoComponent,
    AdminComponent,
    LingarditosComponent,
    CreateLingarditoComponent,
    ResultadosComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
  ],
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
