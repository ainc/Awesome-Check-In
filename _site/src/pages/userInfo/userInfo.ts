// TypeScript for UserInfoPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 11/14/17 by Brendan Thompson

// Description:
// 		Asks the User for name, email, and reason
// 		Passes the user info, along with older FormGroup data, to ConfirmPage via NavParams

// ==============================================================================
// 		Import Navigation and Form tools, and ConfirmPage
// ==============================================================================
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmPage } from '../confirm/confirm';
import { ScreenSaver } from '../screensaver/screensaver';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';


@Component({
	selector: 'page-userInfo',
	templateUrl: 'userInfo.html',
	providers: [TimerComponent]
})

export class UserInfoPage {

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
	public currentUserInfoFormGroup : FormGroup;
	public TEAMMEMBERS = [
		{id: 1, name:'Emily Wehrle',
			description: 'Director of Operations',
			team: 'main',
			slackUsername: '@emilywehrle',
			imageURL: 'assets/img/TeamMembers/emilywehrle_wall.gif',
			imageAlt: 'Emily Wehrle'
		},
		{id: 2, name:'Brian Raney',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/brianraney_wall.gif',
			imageAlt: 'Brian Raney'
		},
		{id: 3, name:'Amanda Murray',
			description: 'Director of Marketing',
			team: 'Marketing',
			slackUsername: '@amandasmurray',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Amanda Murray'
		},
		{id: 4, name:'Keith McMunn',
			description: 'Director of Fellowship',
			team: 'Fellowship',
			slackUsername: '@keithmcmunn',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Keith McMunn'
		},
		{id: 5, name:'Nick Such',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/nicksuch_wall.gif',
			imageAlt: 'Nick Such'
		},
		{id: 6, name:'Kyle Raney',
			description: 'Development Team',
			team: 'Team Alpha',
			slackUsername: '@raney24',
			imageURL: 'assets/img/TeamMembers/kyleraney_wall.gif',
			imageAlt: 'Kyle Raney'
		},
		{id: 7, name:'Nobody Yet',
			description: 'Set up a meeting',
			team: 'Team Alpha',
			slackUsername: '#bot_test',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Team Member'
		}
	];

	constructor(private navCtrl : NavController,
				private navParameters : NavParams,
				private userInfoFormBuilder : FormBuilder,
				private idleTimer: TimerComponent,
				private secondaryTimer: TimerComponent,
				public alertCtrl: AlertController) {

		this.startIdleTimer();

		this.currentProgram = this.navParameters.get('currentProgram');
		this.currentMemberFormGroup = this.navParameters.get('memberFormGroup');

		this.currentUserInfoFormGroup = this.userInfoFormBuilder.group ({
			name : ['', <any>Validators.required],
			email : ['', <any>Validators.minLength(8)],
			reason : ['', <any>Validators.minLength(10)]
		});
	}


	// ==============================================================================
	// 		Passes All of the information so far provided by the user to the ConfirmPage
	// ==============================================================================
	submitUserInfo() {
		this.stopTimers();
		this.navCtrl.push(ConfirmPage, { currentProgram: this.currentProgram,
										memberFormGroup: this.currentMemberFormGroup,
										userInfoFormGroup: this.currentUserInfoFormGroup,
										name: this.currentUserInfoFormGroup.get('name').value,
										email: this.currentUserInfoFormGroup.get('email').value,
										reason: this.currentUserInfoFormGroup.get('reason').value });
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
