// TypeScript for ProgramPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 03/21/17 by Brendan Thompson

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

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-program',
	templateUrl: 'program.html',
	providers: [TimerComponent]
})

export class ProgramPage {

    // Variables for setting background color
    private entClicked: boolean;
    private codeClicked: boolean;
    private spaceClicked: boolean;
    private meetingClicked: boolean;

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
	// 		Programs Array
	// ==============================================================================
	PROGRAMS = [
		{id: 1, name:'I have an idea!',
			description: 'Have an idea? Tell us about it! Promoting Entrepreneurship is the main goal of Awesome Inc!',
			imageURL: 'assets/img/check-in-icons/Idea-WHITE.png',
			imageAlt: 'Idea Light-bulb Logo',
			include: true,
			selected: false
		},
		{id: 2, name:'Awesome Inc Fellowship',
			description: 'A mentor-driven program designed to accelerate your high tech startup.',
			imageURL: 'assets/img/check-in-icons/Fellowship-WHITE.png',
			imageAlt: 'Fellowship Logo',
			include: true,
			selected: false
		},
		{id: 3, name:'5 Across',
			description: '5 pitches; 5 minutes per pitch; $500 prize; 5pm - 7pm; $5 admission',
			imageURL: 'assets/img/5across_logo.png',
			imageAlt: '5 Across Logo',
			include: false,
			selected: false
		},
		{id: 4, name:'Cherub Fund',
			description: 'Formed in 2013 in order to grow the startup community in Kentucky, the Cherub Fund is comprised of entrepreneurs, angel investors, and supporters of entrepreneurship.',
			imageURL: 'assets/img/CherubFund_logo.png',
			imageAlt: 'Cherub Fund Logo',
			include: false,
			selected: false
		},
		{id: 5, name:'Startup Weekend',
			description: 'Anyone is welcome to pitch their startup idea at the beginning of the 3-day weekend event. Teams organically form around the top ideas and then its a 54 hours frenzy of business model creation, coding, designing, and market validation.',
			imageURL: 'assets/img/sw_logo.png',
			imageAlt: 'Startup Weekend Logo',
			include: false,
			selected: false
		},
		{id: 6, name:'Kentucky Entrepreneur Hall of Fame',
			description: 'The Kentucky Entrepreneur Hall of Fame honors, shares, and celebrates the stories of Kentuckys most successful entrepreneurs.',
			imageURL: 'assets/img/ehof_logo.png',
			imageAlt: 'EHOF Logo',
			include: false,
			selected: false
		}
	];

	constructor(public navCtrl: NavController,
				private navParameters : NavParams,
				public alertCtrl: AlertController) {

		this.currentIdleTimer = this.navParameters.get('timerProvider');
	}

	// ==============================================================================
	// 		Manage the Programs
	// ==============================================================================

	ionViewWillEnter(){
		for (var i = 0; i < this.PROGRAMS.length; i++){
			this.PROGRAMS[i].selected = false;
		}
	}

	// Go to The Next Page and pass the selected program
	goToProgram(program) {
		for (var i = 0; i < this.PROGRAMS.length; i++){
			if (this.PROGRAMS[i] == program){
				this.PROGRAMS[i].selected = true;
			}
		}

		// Change the imageURL from ...-WHITE.png, ...-RED.png
		var programToPass = Object.assign({}, program);
		programToPass.imageURL = programToPass.imageURL.slice(0, -9) + 'RED.png';

		// Pass the program
		if (programToPass.name == 'I have an idea!'){
			this.navCtrl.push(IdeaForm, { timerProvider: this.currentIdleTimer });
		}
		else {
			this.navCtrl.push(TeamMembersPage, { currentProgram: programToPass,
												timerProvider: this.currentIdleTimer });
		}
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
