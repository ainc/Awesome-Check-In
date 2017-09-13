import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/*
  Provider for validating that at least one checkbox has been selected
*/

@Injectable()
export class BoxCheckedValidator {

	constructor() {
	}

	validateABoxChecked(boxes: FormControl){
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