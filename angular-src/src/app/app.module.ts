/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: 'http://localhost:3000',
            login: {
              endpoint: '/users/authenticate',
            },
            register: {
              endpoint: '/users/register',
            },
            logout: {
               endpoint: '/auth/sign-out',
             },
             requestPass: {
               endpoint: '/auth/request-pass',
             },
             resetPass: {
               endpoint: '/auth/reset-pass',
             },
          },
        },
      },
      forms: {},
    }), 
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
