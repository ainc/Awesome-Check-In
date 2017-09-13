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

	clickedEnt() {
		this.navCtrl.push(ProgramPage);
	}

	clickedCode() {
		var program = {
			id: 7,
			name:'Awesome Inc University',
			description: 'The Bootcamps and Classes for both youth and adults',
			imageURL: 'assets/img/AIncU_logo.png',
			imageAlt: 'Awesome Inc U Logo'
		};

		this.navCtrl.push(TeamMembersPage, { currentProgram: program });
	}

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
