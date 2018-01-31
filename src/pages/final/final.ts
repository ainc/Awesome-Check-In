// TypeScript for FinalPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 01/30/17 by Brendan Thompson

// Description:
// 		Thanks the user for checking in, Instructs them to have a seat, and provides a button to return home
// 		passes the completed form as a NavParam to userInfoPage which passes it to the confirm page


// ==============================================================================
// 		Import Navigation tools and ScreenSaver
// ==============================================================================
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ScreenSaver } from '../screensaver/screensaver';
import { HomePage } from '../home/home';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-final',
    templateUrl: 'final.html',
    providers: [TimerComponent]
})
export class FinalPage {

    // ==============================================================================
    //         Forms
    // ==============================================================================
	public currentProgram;

    // ==============================================================================
    //         Idle Timer
    // ==============================================================================
    private currentIdleTimer;
    private leftPage: boolean; // To stop checking timer after navigating away
    private currentIdleMessage = this.alertCtrl.create({
        title: 'Idle Timer Expired',
        message: 'Are You Still There?',
        buttons: [
            {
                text: 'Home',
                handler: () => {
                    this.goToScreenSaver();
                }
            },
            {
                text: 'Continue',
                handler: () => {
                    this.currentIdleTimer.stopTimer();
                    this.currentIdleTimer.restartTimer();
                }
            }
        ]
    });

	// ==============================================================================
	// 		Constructor
	// ==============================================================================
	constructor(public navCtrl: NavController,
				private navParameters : NavParams,
				public alertCtrl: AlertController) {

        this.currentIdleTimer = this.navParameters.get('timerProvider');

		this.currentProgram = this.navParameters.get('currentProgram');
	}

	// ==============================================================================
	// 		Return to Home Page
	// ==============================================================================

	returnHome() {
		this.goToScreenSaver();
	}

    // ==============================================================================
    //         ScreenSaver & Idle Timer
    // ==============================================================================

    goToScreenSaver() {
        this.navCtrl.popToRoot();
    }

    // Starts Timer and starts Checking if finished
    ionViewDidEnter(){
        this.leftPage = false;
        this.currentIdleTimer.restartTimer();
        this.checkIfTimerFinished();
    }

    // Stops Timer and stops Checking if finished
    ionViewWillLeave(){
        this.leftPage = true;
        this.currentIdleTimer.stopTimer();
    }

    startSecondaryTimer(){
        this.currentIdleTimer.restartSecondaryTimer();
        this.checkIfSecondaryTimerFinished();
    }

    checkIfTimerFinished(){
        setTimeout(() => {
            if (this.leftPage){ return; } // Stops checking if left page
            if (this.currentIdleTimer.isFinished()) {
                this.currentIdleMessage.present();
                this.startSecondaryTimer();
             }
            else {
                this.checkIfTimerFinished();
            }
        }, 1000);
    }

    checkIfSecondaryTimerFinished(){
        setTimeout(() => {
            if (this.currentIdleTimer.isFinished()) {
                this.currentIdleMessage.dismiss();
                this.goToScreenSaver();
             }
            else {
                this.checkIfSecondaryTimerFinished();
            }
        }, 1000);
    }
}
