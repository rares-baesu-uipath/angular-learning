import { FormControl } from "@angular/forms";

export const textFieldValidator = (texFieldControl: FormControl) =>  Boolean(texFieldControl.value)

export const numberFieldValidator = (numberFieldControl: FormControl) => numberFieldControl.value > 0;