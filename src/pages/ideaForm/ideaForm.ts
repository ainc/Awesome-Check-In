// TypeScript for IdeaForm
// Created: 01/03/18 by Brendan Thompson
// Updated: 01/30/17 by Brendan Thompson

// Description:
// 		Embedded Google Form for "I Have an Idea"

// ==============================================================================
// 		Import tools and HomePage
// ==============================================================================

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FinalAfterFormPage } from '../finalAfterForm/finalAfterForm';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-ideaForm',
  templateUrl: 'ideaForm.html',
  providers: [TimerComponent]
})

export class IdeaForm {

	private emailAddress;

    // ==============================================================================
	// 		Idle Timer
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
				public alertCtrl: AlertController,
				private emailer: EmailComposer) {

		this.currentIdleTimer = this.navParameters.get('timerProvider');
	}

	// ==============================================================================
	// 		Send Email and Submit
	// ==============================================================================

	sendEmail(){
	  	let email = {
	  		to: this.emailAddress,
	  		subject: 'I Have an Idea Form',
	  		body: 'We appreciate you being interested in sharing your idea with us. Please fill out the <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnYCzHXOHpjCUzqtjj1Oy41ccsyX-e8WTAFKG7xcUKNV0bjg/viewform?embedded=true&formkey=dHdwNnE1SXpRZXFCNDJIejcwLTBfblE6MQ">I Have an Idea Form</a>. We will review the idea and get back to you as soon as possible. Thanks, Awesome Inc',
	  		isHtml: true
	  	}

	  	this.emailer.open(email);
	  	this.formSubmitted();
	}

	formSubmitted() {
		var program = {
			id: 1,
			name:'I have an idea!',
			description: 'Have an idea? Tell us about it! Promoting Entrepreneurship is the main goal of Awesome Inc!',
			imageURL: 'assets/img/check-in-icons/Idea-WHITE.png',
			imageAlt: 'Idea Light-bulb Logo',
			include: true
		};

		this.navCtrl.push(FinalAfterFormPage, { currentProgram: program,
												timerProvider: this.currentIdleTimer });
	}

	// ==============================================================================
	// 		ScreenSaver & Idle Timer
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
