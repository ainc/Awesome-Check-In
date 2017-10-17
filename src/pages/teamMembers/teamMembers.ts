// TypeScript for TeamMemberPage
// Created By: Brendan Thompson
// Updated: 10/17/17 by Brendan Thompson

// Description:
// 		Asks the user to fill out a FormGroup regarding which TEAMMEMBERS they are expecting to meet with
// 		passes the completed form as a NavParam to userInfoPage which passes it to the confirm page


// ==============================================================================
// 		Import Navigation and Form tools, Providers, and UserInfoPage
// ==============================================================================
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BoxCheckedValidator } from '../../providers/checkBoxValidators/boxCheckedValidator';

import { UserInfoPage } from '../userInfo/userInfo';

@Component({
	selector: 'page-teamMembers',
	templateUrl: 'teamMembers.html',
})

export class TeamMembersPage {
	public currentProgram;
	public currentMemberFormGroup : FormGroup;
	public TEAMMEMBERS = [
		{id: 1, name:'Nobody Yet',
			tag: 'Nobody',
			description: 'Set up a meeting',
			team: 'Team Alpha',
			slackUsername: '#space',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Team Member',
		},
		{id: 2, name:'Emily Wehrle',
			tag: 'Emily',
			description: 'Director of Operations',
			team: 'main',
			slackUsername: '@emilywehrle',
			imageURL: 'assets/img/TeamMembers/emilywehrle_wall.gif',
			imageAlt: 'Emily Wehrle'
		},
		{id: 3, name:'Brian Raney',
			tag: 'Brian',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/brianraney_wall.gif',
			imageAlt: 'Brian Raney'
		},
		{id: 4, name:'Amanda Murray',
			tag: 'Amanda',
			description: 'Director of Marketing',
			team: 'Marketing',
			slackUsername: '@amandasmurray',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Amanda Murray'
		},
		{id: 5, name:'Keith McMunn',
			tag: 'Keith',
			description: 'Director of Fellowship',
			team: 'Fellowship',
			slackUsername: '@keithmcmunn',
			imageURL: 'assets/img/TeamMembers/teamMember.png',
			imageAlt: 'Keith McMunn'
		},
		{id: 6, name:'Nick Such',
			tag: 'Nick',
			description: 'Co-Founder',
			team: 'main',
			slackUsername: '@nicksuch',
			imageURL: 'assets/img/TeamMembers/nicksuch_wall.gif',
			imageAlt: 'Nick Such'
		},
		{id: 7, name:'Kyle Raney',
			tag: 'Kyle',
			description: 'Development Team',
			team: 'Team Alpha',
			slackUsername: '@raney24',
			imageURL: 'assets/img/TeamMembers/kyleraney_wall.gif',
			imageAlt: 'Kyle Raney'
		}
	];

	// ==============================================================================
	// 		Constructor gets currentProgram from NavParam and creates currentMemberFormGroup
	// ==============================================================================
	constructor(private navCtrl : NavController,
				private navParameters : NavParams,
				private memberFormBuilder : FormBuilder,
				private memberValidator : BoxCheckedValidator) {

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


	// ==============================================================================
	// 		Passes the currentProgram and currentFormGroup to the UserInfoPage
	// ==============================================================================
	submitTeamMembers(currentFormGroup) {
		this.navCtrl.push(UserInfoPage, { currentProgram: this.currentProgram,
										memberFormGroup: currentFormGroup });
	}
}
