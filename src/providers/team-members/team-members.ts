import { Injectable } from '@angular/core';

/*
	  Provider of the Team Members Array
*/
@Injectable()
export class TeamMembersProvider {

	teamMembersArray: any;

  	constructor() {

	    this.teamMembersArray = [
			{id: 1, name:'Emily Wehrle',
				tag: 'Emily',
				description: 'Director of Operations',
				team: 'main',
				slackUsername: '@emilywehrle',
				imageURL: 'assets/img/TeamMembers/emilywehrle_wall.png',
				imageAlt: 'Emily Wehrle',
				userId: '@U0K3RKHLL',
			},
			{id: 2, name:'Brian Raney',
				tag: 'Brian',
				description: 'Co-Founder',
				team: 'main',
				slackUsername: '@brianraney',
				imageURL: 'assets/img/TeamMembers/brianraney_wall.png',
				imageAlt: 'Brian Raney',
				userId: '@U03NW9XCZ',
			},
			{id: 3, name:'Amanda Murray',
				tag: 'Amanda',
				description: 'Director of Marketing',
				team: 'Marketing',
				slackUsername: '@amandasmurray',
				imageURL: 'assets/img/TeamMembers/amandamurray_wall.png',
				imageAlt: 'Amanda Murray',
				userId: '@U0TFX3LMA',
			},
			{id: 4, name:'Keith McMunn',
				tag: 'Keith',
				description: 'Director of Fellowship',
				team: 'Fellowship',
				slackUsername: '@keithmcmunn',
				imageURL: 'assets/img/TeamMembers/keithmcmunn_wall.png',
				imageAlt: 'Keith McMunn',
				userId: '@U31H09G05',
			},
			{id: 5, name:'Nick Such',
				tag: 'Nick',
				description: 'Co-Founder',
				team: 'main',
				slackUsername: '@nicksuch',
				imageURL: 'assets/img/TeamMembers/nicksuch_wall.png',
				imageAlt: 'Nick Such',
				userId: '@U02FSLJ3G',
			},
			{id: 6, name:'Kyle Raney',
				tag: 'Kyle',
				description: 'Development Team',
				team: 'Team Alpha',
				slackUsername: '@raney24',
				imageURL: 'assets/img/TeamMembers/kyleraney_wall.png',
				imageAlt: 'Kyle Raney',
				userId: '@U02KJMQT1',
			},
			{id: 7, name:'Keith Kurzendoerfer',
				tag: 'KeithK',
				description: 'APAX Software',
				team: 'Team Alpha',
				slackUsername: '@keith',
				imageURL: 'assets/img/TeamMembers/keith-min.jpg',
				imageAlt: 'Team Member',
				userId: '@U03NDCZJB',
			},
			{id: 8, name:'Maggie Collofello',
				tag: 'Maggie',
				description: 'Workspace Director',
				team: 'Team Alpha',
				slackUsername: '@Maggie Collofello',
				imageURL: 'assets/img/TeamMembers/maggie.jpg',
				imageAlt: 'Maggie Collofello',
				userId: '@UFFS6SWDN',
			},
			{id: 9, name:'Nobody Yet',
				tag: 'Nobody',
				description: 'Setup a meeting',
				team: 'Team Alpha',
				slackUsername: '#checkin-app',
				imageURL: 'assets/img/TeamMembers/teamMember.png',
				imageAlt: 'Team Member',
			}
		];
  	}

  	loadAll(){
  		return Promise.resolve(this.teamMembersArray);
  	}

  	getMemberByName(nameToFind){
  		for (var i = 0; i < this.teamMembersArray.length; i++) {
  			if (this.teamMembersArray[i].name == nameToFind){
  				return Promise.resolve(this.teamMembersArray[i]);
  			}
  		}
  	}

}
