// TypeScript for IdeaForm
// Created: 01/03/18 by Brendan Thompson
// Updated: 01/03/18 by Brendan Thompson

// Description:
// 		Embedded Google Form for "I Have an Idea"

// ==============================================================================
// 		Import tools and HomePage
// ==============================================================================

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FinalAfterFormPage } from '../finalAfterForm/finalAfterForm';
import { ScreenSaver } from '../screensaver/screensaver';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-ideaForm',
  templateUrl: 'ideaForm.html',
  providers: [TimerComponent]
})

export class IdeaForm {

    // ==============================================================================
	// 		Form For Idle Timer
	// ==============================================================================
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
				private idleTimer: TimerComponent,
				private secondaryTimer: TimerComponent,
				public alertCtrl: AlertController) {

		this.startIdleTimer();
	}

	// ==============================================================================
	// 		Form Submitted
	// ==============================================================================

	formSubmitted() {
		var program = {
			id: 1,
			name:'I have an idea!',
			description: 'Have an idea? Tell us about it! Promoting Entrepreneurship is the main goal of Awesome Inc!',
			imageURL: 'assets/img/check-in-icons/Idea-WHITE.png',
			imageAlt: 'Idea Light-bulb Logo',
			include: true
		};

		this.stopTimers();
		this.navCtrl.push(FinalAfterFormPage, { currentProgram: program });
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

	backButtonAction(){
		console.log('Back Button Pressed: Stopping Timer...');
		this.stopTimers();
	}
}
