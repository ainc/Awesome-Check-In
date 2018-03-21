// TypeScript for ConfirmPage
// Created: 09/01/17 by Brendan Thompson
// Updated: 03/21/17 by Brendan Thompson

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

import { TimerComponent } from '../../providers/timerConfirmation/timer';
import { AlertController } from 'ionic-angular';
import { TeamMembersProvider } from '../../providers/team-members/team-members';

@Component({
	selector: 'page-confirm',
	templateUrl: 'confirm.html',
	providers: [TimerComponent]
})

export class ConfirmPage {

    // ==============================================================================
	// 		Constants
	// ==============================================================================

	private destinationChannel: any = "#checkin-app";

    // ==============================================================================
	// 		Objects
	// ==============================================================================

	private ourHttp: Http;

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
	public teamMembers;
	public currentProgram;
	public currentMemberFormGroup: FormGroup;
		private userName;
		private userEmail;
		private userReason;

	// ==============================================================================
	// 		Constructor gets currentProgram, user info, and currentMemberFormGroup from NavParam and instantiates the http object
	// ==============================================================================
	constructor(private navCtrl : NavController,
				private navParameters : NavParams,
				private http: Http,
				public alertCtrl: AlertController,
				private teamMembersArray: TeamMembersProvider) {

		this.currentIdleTimer = this.navParameters.get('timerProvider');

		this.currentProgram = this.navParameters.get('currentProgram');
		this.currentMemberFormGroup = this.navParameters.get('memberFormGroup');
			this.userName = this.navParameters.get('name');
			this.userEmail = this.navParameters.get('email');
			this.userReason = this.navParameters.get('reason');

		this.ourHttp = http;

		// Load Team Members
  		teamMembersArray.loadAll().then(result =>{
  			this.teamMembers = result;
  		});
	}

	// ==============================================================================
	// 		calls sendOutAllSlackMessages() and then navigates to FinalPage
	// ==============================================================================
	submitCheckIn() {
		this.sendOutAllSlackMessages();
		this.navCtrl.push(FinalPage, { currentProgram: this.currentProgram,
										timerProvider: this.currentIdleTimer });
	}


	// ==============================================================================
	// 		iterates through teamMembers,
	//		conditionally adds them to usersSelected
	//		then calls sendSlackMessage()
	// ==============================================================================
	sendOutAllSlackMessages() {
		var usersSelected = [];

		for (let member of this.teamMembers){
			var currentMemberTag = member.tag;
			var currentTeamMember = this.currentMemberFormGroup.get('teamMembers').get(currentMemberTag);
			if ((currentTeamMember.value) && (currentMemberTag != "Nobody")){
				usersSelected.push(member.slackUsername);
			}
		}

		console.log("Users Selected: " + usersSelected);

		this.sendSlackMessage(usersSelected);
	}

	// ==============================================================================
	// 		Sends One Slack Message to slackUsername
	// ==============================================================================
	sendSlackMessage(usersSelected) {
		var currentTime = (new Date).getTime() / 1000;
		var url = "https://hooks.slack.com/services/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";

		// Create the message
		var messageText = (
		{
			"username": "CheckIn_Bot",
			"channel": this.destinationChannel,
			"text": "<!channel>, A guest has arrived for",
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

		// Tag the Selected Users
		var newText: string = "<!channel>, A guest has arrived for ";
		for (var i = 0; i < usersSelected.length; i++) {
			newText += "<" + usersSelected[i] + "> ";
			console.log(usersSelected[i]);
			console.log(newText);
		}
		messageText.text = newText;
		console.log(JSON.stringify(messageText.text));

		this.ourHttp.post(url, JSON.stringify(messageText))
			.subscribe();
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
