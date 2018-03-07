//Imports i consider to be angulars// neccessary
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


//Components-
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { SubmitPasswordResetComponent } from './components/submit-password-reset/submit-password-reset.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ResendEmailVerificationComponent } from './components/resend-email-verification/resend-email-verification.component';

//Component/Module bundle
//This module contains our auth modals for login and register plus some minimal logic to decide which to serve
import { DialogsModule } from './components/dialogs/dialogs.module';

//Services and guards
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

//Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures.
import 'hammerjs';

//This will be either removed or kept depending on research.
import { FlashMessagesModule } from 'angular2-flash-messages';
//Flash message will be replaced for the module below.
import { SimpleNotificationsModule } from 'angular2-notifications';

//Angular Material Imports
import {MatToolbarModule,MatSnackBarModule} from '@angular/material';
//Flex layout is independant of material
import { FlexLayoutModule } from '@angular/flex-layout';

//Service worker support
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SwUpdateService } from './services/swUpdate';

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'resetpw', component: ResetPassComponent},
  {path:'resetpw/:token', component: SubmitPasswordResetComponent},
  {path:'resend/emailVerification', component: ResendEmailVerificationComponent},
  {path:'emailVerification/:token', component: EmailVerificationComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ResetPassComponent,
    SubmitPasswordResetComponent,
    EmailVerificationComponent,
    ResendEmailVerificationComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    DialogsModule,
    FlexLayoutModule,
    FlashMessagesModule.forRoot(),
    //Will remove the above after full replacement.
    SimpleNotificationsModule.forRoot(),
    MatToolbarModule,MatSnackBarModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],

  providers: [ValidateService, AuthService, AuthGuard,SwUpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
