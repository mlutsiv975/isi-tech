import {AbstractControl, ValidationErrors} from '@angular/forms';

export function repeatPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('repeat_password')?.value;
  const passwordMismatch = password !== confirmPassword;
  if (password !== confirmPassword) {
    control.get('repeat_password')?.setErrors({
      ...control.get('repeat_password')!.errors || {},
      passwordMismatch
    });
  }
  return null;
}
