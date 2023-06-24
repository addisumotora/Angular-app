import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

const routes: Routes = [
  {
    path: '',
    component: FetchDataComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
