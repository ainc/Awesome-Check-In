import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Provider for importing assets/data/teamMembersArray into TEAMMEMBERS array used by TeamMembersPage & ConfirmPage
  CURRENTLY NOT IN USE: Failed to implement properly
*/

@Injectable()
export class TeamMembersProvider {

	constructor(public http: Http) {
	}

	// ==============================================================================
	// 		Import the file with an http get request, map each value in result.teamMembers into a json object, and log the data to the console
	// ==============================================================================
	// importTeamMembers(){
	// 	return this.http.get('location/of/data').map(res => res.json().teamMembers).subscribe(data => {
 //    		console.log(data);
	// 	});
	// }
}