// ================================================================================================

// TypeScript for HomePage
// Created: 09/01/17 by Brendan Thompson
// Updated: 03/21/17 by Brendan Thompson

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

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TimerComponent]
})

export class HomePage {

    // Variables for setting background color
    private entClicked: boolean;
    private codeClicked: boolean;
    private spaceClicked: boolean;
    private meetingClicked: boolean;

    // ==============================================================================
	// 		Form For Idle Timer
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
				public alertCtrl: AlertController,
				public idleTimer: TimerComponent) {

		this.currentIdleTimer = this.idleTimer;
	}

	ionViewWillEnter(){
		this.entClicked = false;
		this.codeClicked = false;
		this.spaceClicked = false;
		this.meetingClicked = false;
	}

	// ==============================================================================
	// 		Navigation
	// ==============================================================================

	// Entrepreneurship
	clickedEnt() {
    	this.entClicked = true;
		this.navCtrl.push(ProgramPage, { timerProvider: this.currentIdleTimer });
	}

	// Learning to Code
	clickedCode() {
    	this.codeClicked = true;
		var program = {
			id: 7,
			name:'Awesome Inc U',
			description: 'The Bootcamps and Classes for both youth and adults',
			imageURL: 'assets/img/check-in-icons/Tech-RED.png',
			imageAlt: 'AInc-U Logo'
		};

		this.navCtrl.push(TeamMembersPage, { currentProgram: program,
											timerProvider: this.currentIdleTimer });
	}

	// The Workspace
	clickedSpace() {
    	this.spaceClicked = true;
		var program = {
			id: 8,
			name:'The Workspace',
			description: 'Rent a desk or space for events, meetings, and more',
			imageURL: 'assets/img/check-in-icons/Workspace-RED.png',
			imageAlt: 'Workspace Logo'
		};
		this.navCtrl.push(TeamMembersPage, { currentProgram: program,
											timerProvider: this.currentIdleTimer });
	}

	// Meeting
	clickedMeeting() {
    	this.meetingClicked = true;
		var program = {
			id: 9,
			name:'Planned Meeting',
			description: 'Someone at Awesome Inc is expecting to meet with you',
			imageURL: 'assets/img/check-in-icons/Meeting-RED.png',
			imageAlt: 'Meeting'
		};

		this.navCtrl.push(TeamMembersPage, { currentProgram: program,
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
