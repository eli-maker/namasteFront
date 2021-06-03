import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing'
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './service/marker.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent
  ],
  imports: [
    BrowserModule, routing,
    FormsModule, HttpClientModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
