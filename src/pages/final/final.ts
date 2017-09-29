// TypeScript for FinalPage
// Created By: Brendan Thompson
// Updated: 09/10/17 by Brendan Thompson

// Description:
// 		Thanks the user for checking in, Instructs them to have a seat, and provides a button to return home
// 		passes the completed form as a NavParam to userInfoPage which passes it to the confirm page


// ==============================================================================
// 		Import Navigation tools and HomePage
// ==============================================================================
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-final',
  templateUrl: 'final.html'
})
export class FinalPage {
	public currentProgram;



	// ==============================================================================
	// 		Constructor
	// ==============================================================================
	constructor(public navCtrl: NavController,
				private navParameters : NavParams) {

		this.currentProgram = this.navParameters.get('currentProgram');
	}

	// ==============================================================================
	// 		Return to Home Page
	// ==============================================================================
	returnHome() {
		this.navCtrl.push(HomePage);
	}
}
