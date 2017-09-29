// TypeScript for ConfirmPage
// Created By: Brendan Thompson
// Updated: 09/27/17 by Brendan Thompson

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

@Component({
	selector: 'page-confirm',
	templateUrl: 'confirm.html',
})

export class ConfirmPage {
	public currentProgram;
	public currentMemberFormGroup: FormGroup;
		private userName;
		private userEmail;
		private userReason;
	private ourHttp: Http;
	public TEAMMEMBERS = [
		{id: 1, name:'Emily Wehrle',
			tag: 'Emily',
			description: 'Director of Operations',
			team: 'main',
			slackUsername: '@emilywehrle',
			imageURL: 'assets/img/TeamMembers/emilywehrle_wall.gif',
			imageAlt: 'Emily Wehrle'
		},
		{id: 2, name:'Brian Raney',
			tag: 'Brian',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/brianraney_wall.gif',
			imageAlt: 'Brian Raney'
		},
		{id: 3, name:'Amanda Murray',
			tag: 'Amanda',
			description: 'Director of Marketing',
			team: 'Marketing',
			slackUsername: '@amandasmurray',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Amanda Murray'
		},
		{id: 4, name:'Keith McMunn',
			tag: 'Keith',
			description: 'Director of Fellowship',
			team: 'Fellowship',
			slackUsername: '@keithmcmunn',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Keith McMunn'
		},
		{id: 5, name:'Nick Such',
			tag: 'Nick',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/nicksuch_wall.gif',
			imageAlt: 'Nick Such'
		},
		{id: 6, name:'Kyle Raney',
			tag: 'Kyle',
			description: 'Development Team',
			team: 'Team Alpha',
			slackUsername: '@raney24',
			imageURL: 'assets/img/TeamMembers/kyleraney_wall.gif',
			imageAlt: 'Kyle Raney'
		},
		{id: 7, name:'Nobody Yet',
			tag: 'Nobody',
			description: 'Set up a meeting',
			team: 'Team Alpha',
			slackUsername: '#bot_test',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Team Member'
		}
	];

	// ==============================================================================
	// 		Constructor gets currentProgram, user info, and currentMemberFormGroup from NavParam and instantiates the http object
	// ==============================================================================
	constructor(private navCtrl : NavController,
				private navParameters : NavParams,
				private userInfoFormBuilder : FormBuilder,
				private http: Http) {

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
					"text": "Reason: " + this.userReason,
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
}
