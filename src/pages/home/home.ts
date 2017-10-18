// TypeScript for HomePage
// Created: 09/01/17 by Brendan Thompson
// Updated: 10/17/17 by Brendan Thompson

// Description:
//		Asks the User to select what brought them in: Entrepreneurship, Learning To Code, or The Workspace
//		If Entrepreneurship, directs to ProgramPage
//		Else directs them to the TeamMembersPage


// ==============================================================================
// 		Import Navigation tools and ProgramPage & TeamMembersPage
// ==============================================================================

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProgramPage } from '../programs/program';
import { TeamMembersPage } from '../teamMembers/teamMembers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {

	}

	// ==============================================================================
	// 		Entrepreneurship
	// ==============================================================================
	clickedEnt() {
		this.navCtrl.push(ProgramPage);
	}

	// ==============================================================================
	// 		Learning to Code
	// ==============================================================================
	clickedCode() {
		var program = {
			id: 7,
			name:'Awesome Inc U',
			description: 'The Bootcamps and Classes for both youth and adults',
			imageURL: 'assets/img/AIncU_logo.png',
			imageAlt: 'AInc-U Logo'
		};

		this.navCtrl.push(TeamMembersPage, { currentProgram: program });
	}

	// ==============================================================================
	// 		The Workspace
	// ==============================================================================
	clickedSpace() {
		var program = {
			id: 8,
			name:'The Workspace',
			description: 'Rent a desk or space for events, meetings, and more',
			imageURL: 'assets/img/Icon_Coworking.png',
			imageAlt: 'Coworking Logo'
		};

		this.navCtrl.push(TeamMembersPage, { currentProgram: program });
	}
}
