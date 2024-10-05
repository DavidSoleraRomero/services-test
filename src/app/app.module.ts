import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataInMemoryService } from './core/services/data-in-memory.service';
import { DataService } from './core/interfaces/data-service';
import { DataInCookieService } from './core/services/data-in-cookie.service';

export function DataServiceFactory(backend:string){
  switch(backend){
    case 'InMemory':
      return new DataInMemoryService();
    case "LocalStorage":
      return new DataInCookieService();
    default:
      throw new Error("Not implemented");
  }
} 

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: "inMemory",
      useValue: "InMemory"
    },
    {
      provide: "localStorage",
      useValue: "LocalStorage"
    },
    {
      provide: DataService,
      deps: ['localStorage'],
      useFactory: DataServiceFactory,  
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
