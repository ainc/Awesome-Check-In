import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { App } from 'ionic-angular';
// import { ViewController } from 'ionic-angular';

import { ScreenSaver } from '../pages/screensaver/screensaver';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = ScreenSaver;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

