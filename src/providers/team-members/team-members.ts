import { Injectable } from '@angular/core';

/*
	  Provider of the Team Members Array
*/
@Injectable()
export class TeamMembersProvider {

	teamMembersArray: any;

  	constructor() {

	    this.teamMembersArray = [
			{id: 1, name:'Nobody Yet',
				tag: 'Nobody',
				description: 'Set up a meeting',
				team: 'Team Alpha',
				slackUsername: '#checkin-app',
				imageURL: 'assets/img/TeamMembers/teamMember.png',
				imageAlt: 'Team Member',
			},
			{id: 2, name:'Emily Wehrle',
				tag: 'Emily',
				description: 'Director of Operations',
				team: 'main',
				slackUsername: '@emilywehrle',
				imageURL: 'assets/img/TeamMembers/emilywehrle_wall.png',
				imageAlt: 'Emily Wehrle'
			},
			{id: 3, name:'Brian Raney',
				tag: 'Brian',
				description: 'Co-Founder',
				team: 'main',
				slackUsername: '@nicksuch',
				imageURL: 'assets/img/TeamMembers/brianraney_wall.png',
				imageAlt: 'Brian Raney'
			},
			{id: 4, name:'Amanda Murray',
				tag: 'Amanda',
				description: 'Director of Marketing',
				team: 'Marketing',
				slackUsername: '@amandasmurray',
				imageURL: 'assets/img/TeamMembers/amandamurray_wall.png',
				imageAlt: 'Amanda Murray'
			},
			{id: 5, name:'Keith McMunn',
				tag: 'Keith',
				description: 'Director of Fellowship',
				team: 'Fellowship',
				slackUsername: '@keithmcmunn',
				imageURL: 'assets/img/TeamMembers/keithmcmunn_wall.png',
				imageAlt: 'Keith McMunn'
			},
			{id: 6, name:'Nick Such',
				tag: 'Nick',
				description: 'Co-Founder',
				team: 'main',
				slackUsername: '@nicksuch',
				imageURL: 'assets/img/TeamMembers/nicksuch_wall.png',
				imageAlt: 'Nick Such'
			},
			{id: 7, name:'Kyle Raney',
				tag: 'Kyle',
				description: 'Development Team',
				team: 'Team Alpha',
				slackUsername: '@raney24',
				imageURL: 'assets/img/TeamMembers/kyleraney_wall.png',
				imageAlt: 'Kyle Raney'
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
