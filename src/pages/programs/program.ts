// TypeScript for ProgramPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 12/13/17 by Brendan Thompson

// Description:
// 		Asks the user to specify which program brought them in
//		Sends the selected program as a NavParam to teamMembersPage


// ==============================================================================
// 		Import Navigation tools and TeamMembersPage
// ==============================================================================

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamMembersPage } from '../teamMembers/teamMembers';
import { IdeaForm } from '../ideaForm/ideaForm';
import { ScreenSaver } from '../screensaver/screensaver';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-program',
	templateUrl: 'program.html',
	providers: [TimerComponent]
})

export class ProgramPage {
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

	PROGRAMS = [
		{id: 1, name:'I have an idea!',
			description: 'Have an idea? Tell us about it! Promoting Entrepreneurship is the main goal of Awesome Inc!',
			imageURL: 'assets/img/check-in-icons/Idea-WHITE.png',
			imageAlt: 'Idea Light-bulb Logo',
			include: true
		},
		{id: 2, name:'Awesome Inc Fellowship',
			description: 'A mentor-driven program designed to accelerate your high tech startup.',
			imageURL: 'assets/img/check-in-icons/Fellowship-WHITE.png',
			imageAlt: 'Fellowship Logo',
			include: true
		},
		{id: 3, name:'5 Across',
			description: '5 pitches; 5 minutes per pitch; $500 prize; 5pm - 7pm; $5 admission',
			imageURL: 'assets/img/5across_logo.png',
			imageAlt: '5 Across Logo',
			include: false
		},
		{id: 4, name:'Cherub Fund',
			description: 'Formed in 2013 in order to grow the startup community in Kentucky, the Cherub Fund is comprised of entrepreneurs, angel investors, and supporters of entrepreneurship.',
			imageURL: 'assets/img/CherubFund_logo.png',
			imageAlt: 'Cherub Fund Logo',
			include: false
		},
		{id: 5, name:'Startup Weekend',
			description: 'Anyone is welcome to pitch their startup idea at the beginning of the 3-day weekend event. Teams organically form around the top ideas and then its a 54 hours frenzy of business model creation, coding, designing, and market validation.',
			imageURL: 'assets/img/sw_logo.png',
			imageAlt: 'Startup Weekend Logo',
			include: false
		},
		{id: 6, name:'Kentucky Entrepreneur Hall of Fame',
			description: 'The Kentucky Entrepreneur Hall of Fame honors, shares, and celebrates the stories of Kentuckys most successful entrepreneurs.',
			imageURL: 'assets/img/ehof_logo.png',
			imageAlt: 'EHOF Logo',
			include: false
		}
	];

	constructor(public navCtrl: NavController,
				private idleTimer: TimerComponent,
				private secondaryTimer: TimerComponent,
				public alertCtrl: AlertController) {
		this.startIdleTimer();

	}

	// ==============================================================================
	// 		Manage the Programs
	// ==============================================================================

	// Go to The Next Page and pass the selected program
	goToProgram(program) {

		// Change the imageURL from ...-WHITE.png, ...-RED.png
		var programToPass = Object.assign({}, program);
		programToPass.imageURL = programToPass.imageURL.slice(0, -9) + 'RED.png';

		this.stopTimers();

		// Pass the program
		if (programToPass.name == 'I have an idea!'){
			this.navCtrl.push(IdeaForm);
		}
		else {
			this.navCtrl.push(TeamMembersPage, { currentProgram: programToPass });
		}
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
