// TypeScript for ConfirmPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 11/14/17 by Brendan Thompson

// Description:
// 		Asks the User to confirm their user info and selected team members
// 		Sends the corresponding notifications


// ==============================================================================
// 		Import Nav, Form, and HTTP tools and FinalPage
// ==============================================================================
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';

import { FinalPage } from '../final/final';
import { ScreenSaver } from '../screensaver/screensaver';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-confirm',
	templateUrl: 'confirm.html',
	providers: [TimerComponent]
})

export class ConfirmPage {
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

	public currentProgram;
	public currentMemberFormGroup: FormGroup;
		private userName;
		private userEmail;
		private userReason;
	private ourHttp: Http;
	public TEAMMEMBERS = [
		{id: 1, name:'Nobody Yet',
			tag: 'Nobody',
			description: 'Set up a meeting',
			team: 'Team Alpha',
			slackUsername: '#checkin-app',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Team Member',
		},
		{id: 2, name:'Emily Wehrle',
			tag: 'Emily',
			description: 'Director of Operations',
			team: 'main',
			slackUsername: '@emilywehrle',
			imageURL: 'assets/img/TeamMembers/emilywehrle_wall.png',
			imageAlt: 'Emily Wehrle'
		},
		{id: 3, name:'Brian Raney',
			tag: 'Brian',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/brianraney_wall.png',
			imageAlt: 'Brian Raney'
		},
		{id: 4, name:'Amanda Murray',
			tag: 'Amanda',
			description: 'Director of Marketing',
			team: 'Marketing',
			slackUsername: '@amandasmurray',
			imageURL: 'assets/img/TeamMembers/amandamurray_wall.png',
			imageAlt: 'Amanda Murray'
		},
		{id: 5, name:'Keith McMunn',
			tag: 'Keith',
			description: 'Director of Fellowship',
			team: 'Fellowship',
			slackUsername: '@keithmcmunn',
			imageURL: 'assets/img/TeamMembers/keithmcmunn_wall.png',
			imageAlt: 'Keith McMunn'
		},
		{id: 6, name:'Nick Such',
			tag: 'Nick',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/nicksuch_wall.png',
			imageAlt: 'Nick Such'
		},
		{id: 7, name:'Kyle Raney',
			tag: 'Kyle',
			description: 'Development Team',
			team: 'Team Alpha',
			slackUsername: '@raney24',
			imageURL: 'assets/img/TeamMembers/kyleraney_wall.png',
			imageAlt: 'Kyle Raney'
		}
	];

	// ==============================================================================
	// 		Constructor gets currentProgram, user info, and currentMemberFormGroup from NavParam and instantiates the http object
	// ==============================================================================
	constructor(private navCtrl : NavController,
				private navParameters : NavParams,
				private userInfoFormBuilder : FormBuilder,
				private http: Http,
				private idleTimer: TimerComponent,
				private secondaryTimer: TimerComponent,
				public alertCtrl: AlertController) {

		this.startIdleTimer();

		this.currentProgram = this.navParameters.get('currentProgram');
		this.currentMemberFormGroup = this.navParameters.get('memberFormGroup');
			this.userName = this.navParameters.get('name');
			this.userEmail = this.navParameters.get('email');
			this.userReason = this.navParameters.get('reason');

		this.ourHttp = http;
	}

	// ==============================================================================
	// 		calls sendOutAllSlackMessages() and then navigates to FinalPage
	// ==============================================================================
	submitCheckIn() {
		this.sendOutAllSlackMessages();

		this.stopTimers();
		this.navCtrl.push(FinalPage, { currentProgram: this.currentProgram });
	}


	// ==============================================================================
	// 		iterates through TEAMMEMBERS and conditionally calls sendSlackMessage()
	// ==============================================================================
	sendOutAllSlackMessages() {
		for (let member of this.TEAMMEMBERS){
			var currentMemberTag = member.tag;
			var currentTeamMember = this.currentMemberFormGroup.get('teamMembers').get(currentMemberTag);
			if (currentTeamMember.value){
				this.sendSlackMessage(member.slackUsername);
			}
		}
	}

	// ==============================================================================
	// 		Sends One Slack Message to slackUsername
	// ==============================================================================
	sendSlackMessage(slackUsername) {
		var currentTime = (new Date).getTime() / 1000;
		var url = "https://hooks.slack.com/services/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";
		var messageText = JSON.stringify(
		{
			"username": "CheckIn_Bot",
			"channel": slackUsername,
			"text": "A guest has arrived for you!",
			"attachments": [
				{
					"title": this.userName + " just checked in!",
					"text": "Program: " + this.currentProgram.name + "\nReason: " + this.userReason,
					"author_name": this.userEmail,
					"color": "danger",
					"footer": "Check-In App",
					"ts": currentTime
				}
			]
		})

		this.ourHttp.post(url, messageText)
			.subscribe();
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
