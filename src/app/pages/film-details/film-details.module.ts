import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { FilmDetailsComponent } from './film-details.component';
import { FilmDetailsRoutingModule } from './film-details-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RatingDecimalModule } from 'src/app/components/rating-decimal/rating-decimal.module';

@NgModule({
  declarations: [FilmDetailsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FilmDetailsRoutingModule,
    PipesModule,
    RatingDecimalModule,
  ],
  exports: [],
  providers: [],
})
export class FilmDetailsModule {}
