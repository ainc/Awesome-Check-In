import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/*
  Provider for validating that a checkbox has been selected in the teamMembersPage
*/

@Injectable()
export class BoxCheckedValidator {

	constructor() {
	}

	validateCheckboxes(boxes: FormControl){
		var isValid 	: boolean = false,
			index		: any;

		for (index in boxes.value){
			var val = boxes.value[index];

			if (val) {
				isValid = true;
				break;
			}
		}

		if (isValid) {
			return null;
		}

		return {
			checkboxRequired: true
		};
	}
}