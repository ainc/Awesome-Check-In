// TypeScript for FinalPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 11/07/17 by Brendan Thompson

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
  templateUrl: 'final.html'
})
export class FinalPage {
	public currentProgram;

    private alertMessage = this.alertCtrl.create({
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
                	this.idleTimer.restartTimer();
                }
            }
        ]
    });

	// ==============================================================================
	// 		Constructor
	// ==============================================================================
	constructor(public navCtrl: NavController,
				private navParameters : NavParams,
				private idleTimer: TimerComponent,
				private secondaryTimer: TimerComponent,
				public alertCtrl: AlertController) {

		this.startIdleTimer();

		this.currentProgram = this.navParameters.get('currentProgram');
	}

	// ==============================================================================
	// 		Return to Home Page
	// ==============================================================================

	returnHome() {
		this.goToScreenSaver();
	}

	// ==============================================================================
	// 		ScreenSaver & Idle Timer
	// ==============================================================================

	goToScreenSaver() {
		this.stopTimers();
		this.navCtrl.push(ScreenSaver);
	}

	startIdleTimer(){
		this.idleTimer.initTimer();
		this.idleTimer.startTimer();
		this.checkIfTimerFinished();
	}

	startSecondaryTimer(){
		this.secondaryTimer.initTimer();
		this.secondaryTimer.startSecondaryTimer();
		this.checkIfSecondaryTimerFinished();
    }

    stopTimers(){
    	this.idleTimer.pauseTimer();
    	this.secondaryTimer.pauseTimer();
    }

	checkIfTimerFinished(){
        setTimeout(() => {
            if (this.idleTimer.isFinished()) {
            	this.alertMessage.present();
            	this.startSecondaryTimer();
         	}
            else {
                this.checkIfTimerFinished();
            }
        }, 1000);
	}

	checkIfSecondaryTimerFinished(){
        setTimeout(() => {
            if (this.secondaryTimer.isFinished()) {
            	this.alertMessage.dismiss();
            	this.goToScreenSaver();
         	}
            else {
                this.checkIfSecondaryTimerFinished();
            }
        }, 1000);
	}
}
