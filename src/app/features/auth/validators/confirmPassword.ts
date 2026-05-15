import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";


export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
    }
    else{
        confirmPassword?.setErrors(null);
        return null;
    }
  };
}