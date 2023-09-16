import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { SessionComponent } from './components/session/session.component';
import { ClassComponent } from './components/class/class.component';

const routes:Routes = [
  {path: 'session/:name', component: AppComponent},
  {path: 'session/:name/class/:name',component: AppComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    ClassComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
