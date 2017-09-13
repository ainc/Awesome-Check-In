import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-final',
  templateUrl: 'final.html'
})
export class FinalPage {
	public currentProgram;

	constructor(public navCtrl: NavController,
				private navParameters : NavParams) {

		this.currentProgram = this.navParameters.get('currentProgram');
	}
}
