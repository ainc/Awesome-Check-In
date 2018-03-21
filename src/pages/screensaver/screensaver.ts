// TypeScript for Screen Saver
// Created: 10/17/17 by Brendan Thompson
// Updated: 03/21/17 by Brendan Thompson

// Description:
// 		Attracts the User's Attention to Checking In


// ==============================================================================
// 		Import tools and HomePage
// ==============================================================================

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-screensaver',
  templateUrl: 'screensaver.html'
})
export class ScreenSaver {

	private clickedToStart: boolean;

	// ==============================================================================
	// 		Constructor
	// ==============================================================================
	constructor(public navCtrl: NavController) {
	}

	ionViewWillLoad(){
		this.clickedToStart = false;
	}

	// ==============================================================================
	// 		Return to Home Page
	// ==============================================================================
	beginCheckIn() {
		this.clickedToStart = true;
		this.navCtrl.push(HomePage);
	}
}
