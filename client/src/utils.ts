import { FormControl } from "@angular/forms";

export const textFieldValidator = (texFieldControl: FormControl) => {console.log(Boolean(texFieldControl.value)); return Boolean(texFieldControl.value)} 

export const numberFieldValidator = (numberFieldControl: FormControl) => numberFieldControl.value > 0;