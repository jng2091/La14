import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { NoAuthGuardService } from './services/no-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', canActivate: [NoAuthGuardService], loadChildren: './login/login.module#LoginPageModule' },
  { path: 'tabs', canActivate: [AuthGuardService], loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'change', canActivate: [AuthGuardService], loadChildren: './change/change.module#ChangePageModule' },
  { path: 'report', canActivate: [AuthGuardService], loadChildren: './report/report.module#ReportPageModule' },
  { path: '**', redirectTo: 'tabs' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
