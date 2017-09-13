import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProgramPage } from '../pages/programs/program';
import { TeamMembersPage } from '../pages/teamMembers/teamMembers';
import { UserInfoPage } from '../pages/userInfo/userInfo';
import { ConfirmPage } from '../pages/confirm/confirm';
import { FinalPage } from '../pages/final/final';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BoxCheckedValidator } from '../providers/checkBoxValidators/boxCheckedValidator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProgramPage,
    TeamMembersPage,
    UserInfoPage,
    ConfirmPage,
    FinalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProgramPage,
    TeamMembersPage,
    UserInfoPage,
    ConfirmPage,
    FinalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoxCheckedValidator,
  ]
})
export class AppModule {}
