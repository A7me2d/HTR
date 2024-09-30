import { DashpordComponent } from './dashpord/dashpord.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AssistComponent } from './assist/assist.component';
import { PlaceComponent } from './place/place.component';
import { SiginComponent } from './sigin/sigin.component';
import { authGuard } from './auth.guard';
import { TableplacesComponent } from './tableplaces/tableplaces.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', canActivate:[authGuard], component: HomeComponent },
  { path: 'home', canActivate:[authGuard], component: HomeComponent },
  { path: 'assist',canActivate:[authGuard], component: AssistComponent },
  { path: 'place' ,component: PlaceComponent },
  { path: 'sigin', component: SiginComponent },
  { path: 'dashboard',canActivate:[authGuard], component: DashpordComponent },
  { path: 'tablePlaces',canActivate:[authGuard], component: TableplacesComponent },
  { path: '**',canActivate:[authGuard], component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
