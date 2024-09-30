import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AssistComponent } from './assist/assist.component';
import { PlaceComponent } from './place/place.component';
import { SiginComponent } from './sigin/sigin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { DashpordComponent } from './dashpord/dashpord.component';
import { TableplacesComponent } from './tableplaces/tableplaces.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssistComponent,
    PlaceComponent,
    SiginComponent,
    NavbarComponent,
    FooterComponent,
    DashpordComponent,
    TableplacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
