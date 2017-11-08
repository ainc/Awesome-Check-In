// ================================================================================================

// TypeScript for HomePage
// Created: 09/01/17 by Brendan Thompson
// Updated: 11/07/17 by Brendan Thompson

// Description:
//		Asks the User to select what brought them in: Entrepreneurship, Learning To Code, or The Workspace
//		If Entrepreneurship, directs to ProgramPage
//		Else directs them to the TeamMembersPage

// ================================================================================================

// ==============================================================================
// 		Imports
// ==============================================================================

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProgramPage } from '../programs/program';
import { TeamMembersPage } from '../teamMembers/teamMembers';
import { ScreenSaver } from '../screensaver/screensaver';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TimerComponent]
})

export class HomePage {
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

	constructor(public navCtrl: NavController,
				private idleTimer: TimerComponent,
				private secondaryTimer: TimerComponent,
				public alertCtrl: AlertController) {

		this.startIdleTimer();
	}

	// ==============================================================================
	// 		Entrepreneurship
	// ==============================================================================

	clickedEnt() {
		this.stopTimers();
		this.navCtrl.push(ProgramPage);
	}

	// ==============================================================================
	// 		Learning to Code
	// ==============================================================================

	clickedCode() {
		var program = {
			id: 7,
			name:'Awesome Inc U',
			description: 'The Bootcamps and Classes for both youth and adults',
			imageURL: 'assets/img/AIncU_logo.png',
			imageAlt: 'AInc-U Logo'
		};

		this.stopTimers();
		this.navCtrl.push(TeamMembersPage, { currentProgram: program });
	}

	// ==============================================================================
	// 		The Workspace
	// ==============================================================================

	clickedSpace() {
		var program = {
			id: 8,
			name:'The Workspace',
			description: 'Rent a desk or space for events, meetings, and more',
			imageURL: 'assets/img/Icon_Coworking.png',
			imageAlt: 'Coworking Logo'
		};

		this.stopTimers();
		this.navCtrl.push(TeamMembersPage, { currentProgram: program });
	}

	// ==============================================================================
	// 		Meeting
	// ==============================================================================

	clickedMeeting() {
		var program = {
			id: 9,
			name:'Planned Meeting',
			description: 'Someone at Awesome Inc is expecting to meet with you',
			imageURL: 'assets/img/Icon_Meeting.png',
			imageAlt: 'Meeting'
		};

		this.stopTimers();
		this.navCtrl.push(TeamMembersPage, { currentProgram: program });
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
