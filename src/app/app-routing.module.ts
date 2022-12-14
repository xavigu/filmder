import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { FilmDetailsComponent } from './pages/film-details/film-details.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'film/:id', component: FilmDetailsComponent },
  { path: 'search/:text', component: SearchComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

