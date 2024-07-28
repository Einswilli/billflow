// FORM VALIDATION UTILS

import { FormGroup, ValidationErrors } from "@angular/forms";

// FORM ERRORS ACCESSOR
export function getFormValidationErrors(form: FormGroup): string[] {
    const errorMessages: string[] = [];

    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors | null | undefined = form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          errorMessages.push(`Key: ${key}, Error: ${keyError}, Value: ${controlErrors[keyError]}`);
        });
      }
    });

    return errorMessages;
}
