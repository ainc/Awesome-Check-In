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
				private memberFormBuilder : FormBuilder,
				private memberValidator : BoxCheckedValidator) {

		this.currentProgram = this.navParameters.get('currentProgram');

		this.currentMemberFormGroup = this.memberFormBuilder.group ({
			'teamMembers': this.memberFormBuilder.group({
				1	: [false],
				2	: [false],
				3	: [false],
				4	: [false],
				5	: [false],
				6	: [false],
				7	: [false]
			}, { validator: this.memberValidator.validateABoxChecked })
		});
	}

	submitTeamMembers(formGroup) {
		this.navCtrl.push(UserInfoPage, { currentProgram: this.currentProgram,
										memberFormGroup: formGroup });
	}

	outputValidator(val){
		console.log('Validating Form');
		console.dir(val);
	}
}
