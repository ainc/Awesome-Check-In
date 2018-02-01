/// =======================================================================

//     Awesome Inc CheckIn App main app module
//     Created by: Brendan Thompson
//     Updated: 11/07/17
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
import { ScreenSaver } from '../pages/screensaver/screensaver';
import { HomePage } from '../pages/home/home';
import { ProgramPage } from '../pages/programs/program';
import { TeamMembersPage } from '../pages/teamMembers/teamMembers';
import { UserInfoPage } from '../pages/userInfo/userInfo';
import { ConfirmPage } from '../pages/confirm/confirm';
import { FinalPage } from '../pages/final/final';
import { IdeaForm } from '../pages/ideaForm/ideaForm';
import { FinalAfterFormPage } from '../pages/finalAfterForm/finalAfterForm';

// =======================================================================
//     Modules & Providers
// =======================================================================

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BoxCheckedValidator } from '../providers/checkBoxValidators/boxCheckedValidator';
import { TimerComponent } from '../providers/timerConfirmation/timer';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({

  // Declare Pages Used
  declarations: [
    MyApp,
    ScreenSaver,
    HomePage,
    ProgramPage,
    TeamMembersPage,
    UserInfoPage,
    ConfirmPage,
    FinalPage,
    IdeaForm,
    FinalAfterFormPage
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
    ScreenSaver,
    HomePage,
    ProgramPage,
    TeamMembersPage,
    UserInfoPage,
    ConfirmPage,
    FinalPage,
    IdeaForm,
    FinalAfterFormPage
  ],

  // Providers
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoxCheckedValidator,
    TimerComponent,
    EmailComposer
  ]
})
export class AppModule {}
