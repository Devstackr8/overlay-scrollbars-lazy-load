import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NormalVersionComponent } from './normal-version/normal-version.component';
import { OsVersionComponent } from './os-version/os-version.component';

const routes: Routes = [
  { path: '', redirectTo: 'normal-version', pathMatch: 'full' },
  { path: 'normal-version', component: NormalVersionComponent },
  { path: 'os-version', component: OsVersionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
