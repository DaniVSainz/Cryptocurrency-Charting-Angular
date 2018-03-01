// import { NgxResetPasswordComponent } from './@theme/components/auth/reset-password/reset-password.component';
// import { NgxRequestPasswordComponent } from './@theme/components/auth/request-password/request-password.component';
// import { NgxLogoutComponent } from './@theme/components/auth/logout/logout.component';
// import { NgxRegisterComponent } from './@theme/components/auth/register/register.component';
// import { NgxLoginComponent } from './@theme/components/auth/login/login.component';
// import { NgxAuthComponent } from './@theme/components/auth/auth.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxAuthComponent,NgxLoginComponent, NgxRegisterComponent, NgxLogoutComponent,NgxRequestPasswordComponent,NgxResetPasswordComponent} from './@theme/components/auth';





const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NgxAuthComponent,
    children: [
      {
        path: '',
        component: NgxLoginComponent,
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },
      {
        path: 'logout',
        component: NgxLogoutComponent,
      },
      {
        path: 'request-password',
        component: NgxRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NgxResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
