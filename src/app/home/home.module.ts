import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { ResultTileComponent } from './components/result-tile/result-tile.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    ResultTileComponent,
    TvDetailComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class HomeModule { }
