/// =======================================================================

//     Awesome Inc CheckIn App main app module
//     Created by: Brendan Thompson
//     Updated: 09/16/17
//     Description:
//         A declaration of the different pieces that come together to make the Awesome Inc Check In App

// =======================================================================


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// =======================================================================
//     Pages
// =======================================================================

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProgramPage } from '../pages/programs/program';
import { TeamMembersPage } from '../pages/teamMembers/teamMembers';
import { UserInfoPage } from '../pages/userInfo/userInfo';
import { ConfirmPage } from '../pages/confirm/confirm';
import { FinalPage } from '../pages/final/final';

// =======================================================================
//     Modules & Providers
// =======================================================================

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BoxCheckedValidator } from '../providers/checkBoxValidators/boxCheckedValidator';

@NgModule({

  // Declare Pages Used
  declarations: [
    MyApp,
    HomePage,
    ProgramPage,
    TeamMembersPage,
    UserInfoPage,
    ConfirmPage,
    FinalPage
  ],

  // Import Modules
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],

  // bootstrap
  bootstrap: [
    IonicApp
  ],

  // Entry Components (same as declarations?)
  entryComponents: [
    MyApp,
    HomePage,
    ProgramPage,
    TeamMembersPage,
    UserInfoPage,
    ConfirmPage,
    FinalPage
  ],

  // Providers
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoxCheckedValidator,
  ]
})
export class AppModule {}
