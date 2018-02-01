// ========================================================================================================

// TypeScript for TeamMemberPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 01/30/17 by Brendan Thompson

// Description:
// 		Asks the user to fill out a FormGroup regarding which TEAMMEMBERS they are expecting to meet with
// 		passes the completed form as a NavParam to userInfoPage which passes it to the confirm page

// ========================================================================================================

// ==============================================================================
// 		Import Navigation and Form tools, Providers, and UserInfoPage
// ==============================================================================
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BoxCheckedValidator } from '../../providers/checkBoxValidators/boxCheckedValidator';

import { UserInfoPage } from '../userInfo/userInfo';

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-teamMembers',
	templateUrl: 'teamMembers.html',
	providers: [TimerComponent]
})

export class TeamMembersPage {

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
	// 		Forms
	// ==============================================================================
	public currentProgram;
	public currentMemberFormGroup : FormGroup;

    // ==============================================================================
	// 		Team Members Array
	// ==============================================================================
	public TEAMMEMBERS = [
		// {id: 1, name:'Nobody Yet',
		// 	tag: 'Nobody',
		// 	description: 'Set up a meeting',
		// 	team: 'Team Alpha',
		// 	slackUsername: '#checkin-app',
		// 	imageURL: 'assets/img/TeamMembers/teamMember.png',
		// 	imageAlt: 'Team Member',
		// 	entrepreurship: true,
		// 	technology: true,
		// 	workspace: true,
		// 	idea: true,
		// 	meeting: false
		// },
		{id: 2, name:'Emily Wehrle',
			tag: 'Emily',
			description: 'Director of Operations',
			team: 'main',
			slackUsername: '@emilywehrle',
			imageURL: 'assets/img/TeamMembers/emilywehrle_wall.png',
			imageAlt: 'Emily Wehrle',
			entrepreurship: true,
			technology: false,
			workspace: true,
			idea: false,
			meeting: true
		},
		{id: 3, name:'Brian Raney',
			tag: 'Brian',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/brianraney_wall.png',
			imageAlt: 'Brian Raney',
			entrepreurship: true,
			technology: false,
			workspace: false,
			idea: true,
			meeting: true
		},
		{id: 4, name:'Amanda Murray',
			tag: 'Amanda',
			description: 'Director of Marketing',
			team: 'Marketing',
			slackUsername: '@amandasmurray',
			imageURL: 'assets/img/TeamMembers/amandamurray_wall.png',
			imageAlt: 'Amanda Murray',
			entrepreurship: false,
			technology: true,
			workspace: false,
			idea: false,
			meeting: true
		},
		{id: 5, name:'Keith McMunn',
			tag: 'Keith',
			description: 'Director of Fellowship',
			team: 'Fellowship',
			slackUsername: '@keithmcmunn',
			imageURL: 'assets/img/TeamMembers/keithmcmunn_wall.png',
			imageAlt: 'Keith McMunn',
			entrepreurship: true,
			technology: false,
			workspace: false,
			idea: true,
			meeting: true
		},
		{id: 6, name:'Nick Such',
			tag: 'Nick',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/nicksuch_wall.png',
			imageAlt: 'Nick Such',
			entrepreurship: false,
			technology: true,
			workspace: false,
			idea: false,
			meeting: true
		},
		{id: 7, name:'Kyle Raney',
			tag: 'Kyle',
			description: 'Development Team',
			team: 'Team Alpha',
			slackUsername: '@raney24',
			imageURL: 'assets/img/TeamMembers/kyleraney_wall.png',
			imageAlt: 'Kyle Raney',
			entrepreurship: false,
			technology: true,
			workspace: false,
			idea: false,
			meeting: true
		}
	];

	// ==============================================================================
	// 		Constructor gets currentProgram from NavParam and creates currentMemberFormGroup
	// ==============================================================================
	constructor(private navCtrl : NavController,
				private navParameters : NavParams,
				private memberFormBuilder : FormBuilder,
				private memberValidator : BoxCheckedValidator,
				public alertCtrl: AlertController) {

		this.currentIdleTimer = this.navParameters.get('timerProvider');

		this.currentProgram = this.navParameters.get('currentProgram');

		this.currentMemberFormGroup = this.memberFormBuilder.group ({
			'teamMembers': this.memberFormBuilder.group({
				Nobody	: [false],
				Emily	: [false],
				Brian	: [false],
				Amanda	: [false],
				Keith	: [false],
				Nick	: [false],
				Kyle	: [false]
			}, { validator: this.memberValidator.validateABoxChecked })
		});
	}

	cardClicked(selectedTeamMember){
		var currentTeamMember = this.currentMemberFormGroup.get('teamMembers').get(selectedTeamMember);
		if (currentTeamMember.value){
			this.currentMemberFormGroup.get('teamMembers').get(selectedTeamMember).setValue(false);
		}
		else {
			this.currentMemberFormGroup.get('teamMembers').get(selectedTeamMember).setValue(true);
		}
	}

	getSelectStatus(selectedTeamMember){
		var currentTeamMember = this.currentMemberFormGroup.get('teamMembers').get(selectedTeamMember);
		return currentTeamMember.value;
	}

	// ==============================================================================
	// 		Passes the currentProgram and currentFormGroup to the UserInfoPage
	// ==============================================================================
	submitTeamMembers(currentFormGroup) {
		this.navCtrl.push(UserInfoPage, { currentProgram: this.currentProgram,
										memberFormGroup: currentFormGroup,
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
