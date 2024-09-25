import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AssistComponent } from './assist/assist.component';
import { PlaceComponent } from './place/place.component';
import { SiginComponent } from './sigin/sigin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', canActivate:[authGuard], component: HomeComponent },
  { path: 'home', canActivate:[authGuard], component: HomeComponent },
  { path: 'assist',canActivate:[authGuard], component: AssistComponent },
  { path: 'place',canActivate:[authGuard], component: PlaceComponent },
  { path: 'sigin', component: SiginComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
