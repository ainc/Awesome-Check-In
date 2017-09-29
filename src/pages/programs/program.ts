// TypeScript for ProgramPage
// Created By: Brendan Thompson
// Updated: 09/10/17 by Brendan Thompson

// Description:
// 		Asks the user to specify which program brought them in
//		Sends the selected program as a NavParam to teamMembersPage


// ==============================================================================
// 		Import Navigation tools and TeamMembersPage
// ==============================================================================

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamMembersPage } from '../teamMembers/teamMembers';

@Component({
	selector: 'page-program',
	templateUrl: 'program.html',
})

export class ProgramPage {
	PROGRAMS = [
		{id: 1, name:'Awesome Inc Fellowship',
			description: 'A mentor-driven program designed to accelerate your high tech startup.',
			imageURL: 'assets/img/fellowship_logo.png',
			imageAlt: 'Fellowship Logo',
			include: true
		},
		{id: 2, name:'5 Across',
			description: '5 pitches; 5 minutes per pitch; $500 prize; 5pm - 7pm; $5 admission',
			imageURL: 'assets/img/5across_logo.png',
			imageAlt: '5 Across Logo',
			include: false
		},
		{id: 3, name:'Cherub Fund',
			description: 'Formed in 2013 in order to grow the startup community in Kentucky, the Cherub Fund is comprised of entrepreneurs, angel investors, and supporters of entrepreneurship.',
			imageURL: 'assets/img/CherubFund_logo.png',
			imageAlt: 'Cherub Fund Logo',
			include: false
		},
		{id: 4, name:'Startup Weekend',
			description: 'Anyone is welcome to pitch their startup idea at the beginning of the 3-day weekend event. Teams organically form around the top ideas and then its a 54 hours frenzy of business model creation, coding, designing, and market validation.',
			imageURL: 'assets/img/sw_logo.png',
			imageAlt: 'Startup Weekend Logo',
			include: true
		},
		{id: 5, name:'Kentucky Entrepreneur Hall of Fame',
			description: 'The Kentucky Entrepreneur Hall of Fame honors, shares, and celebrates the stories of Kentuckys most successful entrepreneurs.',
			imageURL: 'assets/img/ehof_logo.png',
			imageAlt: 'EHOF Logo',
			include: false
		},
		{id: 6, name:'I have an idea!',
			description: 'Have an idea? Tell us about it! Promoting Entrepreneurship is the main goal of Awesome Inc!',
			imageURL: 'assets/img/idea_logo.png',
			imageAlt: 'Idea Light-bulb Logo',
			include: true
		}
	];

	constructor(public navCtrl: NavController) {

	}

	// ==============================================================================
	// 		Pass the selected program as a NavParam to TeamMembersPage
	// ==============================================================================
	goToProgram(program) {
		this.navCtrl.push(TeamMembersPage, { currentProgram: program });
	}

}
