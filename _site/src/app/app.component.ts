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

    // platform.registerBackButtonAction(() => {
    //   let nav = app.getActiveNav();
    //   let activeView: ViewController = nav.getActive();
    //   console.log('Registering Back Button');

    //   if(activeView != null){
    //     if(nav.canGoBack()) {
    //       nav.pop();
    //     }else if (typeof activeView.instance.backButtonAction === 'function')
    //       activeView.instance.backButtonAction();
    //     else nav.parent.select(0); // goes to the first tab
    //   }
    // });
  }
}

