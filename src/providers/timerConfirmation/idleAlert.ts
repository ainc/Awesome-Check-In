// ==============================================================================

// TypeScript for Idle Alert Message
// Created: 10/17/17 by Brendan Thompson
// Updated: 11/07/17 by Brendan Thompson

// Description:

// ==============================================================================

// ==============================================================================
//     Import Navigation tools and ProgramPage & TeamMembersPage
// ==============================================================================

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';

/*
  Provider for creating and managing a commandAlert
  CURRENTLY NOT IN USE: Failed to implement properly
*/


@Injectable()

export class IdleAlert {

	constructor(public http: Http) {
	}

	// showConfirm() {
 //    let confirm = this.alertCtrl.create({
	//     title: 'Idle Timer Expired',
	//     message: 'Would you like to continue working?',
	//     buttons: [
	//         {
	// 	        text: 'Home',
	// 	        handler: () => {
	// 	            console.log('Home clicked');
	// 	        }
	//         },
	//         {
	// 	        text: 'Continue',
	// 	        handler: () => {
	// 	            console.log('Continue clicked');
	// 	        }
	//         }
 //      	]
 //    });
 //    confirm.present();
  // }
}