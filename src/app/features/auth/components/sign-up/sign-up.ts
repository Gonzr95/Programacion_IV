import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
// importar validador de password confirm
import { Supabase } from '../../../../core/services/supabase';
import { confirmPasswordValidator } from '../../validators/confirmPassword';
import { catchError, from, map, Observable, of } from 'rxjs';
import { Auth } from '../../services/auth';
import { UserService } from '../../../users/services/user';
import { UserProfile } from '../../../users/models/user';

// ***** PrimeNG MODULES ***** \\
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule, IconField } from 'primeng/iconfield';




@Component({
  selector: 'app-sign-up',
  imports: [InputTextModule, ButtonModule, PasswordModule, CardModule, DatePickerModule, ReactiveFormsModule, DividerModule, FloatLabelModule, InputIconModule, InputIconModule, IconField],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private supabase: Supabase,
              private auth: Auth,
              private userService: UserService
  ) {}


  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', {
        validators: [Validators.required, Validators.email],
        // asyncValidators: [this.emailTakenValidator()],
        updateOn: 'blur'
      }],
      password: ['', [Validators.required, Validators.minLength(6)]], // TODO desarrollar regex para contraseña
      confirmPassword: ['', Validators.required] 
    },{
      validators: confirmPasswordValidator()
    });

    this.signUpForm.valueChanges.subscribe((value) => {
      console.log("El valor ha cambiado", value);
    })
  }


   emailTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return from(this.supabase.verificarEmailExistente(control.value)).pipe(
        map((response) => {
          return response.data && response.data.length > 0 ? { emailTaken: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }

  async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid) {
      // console.log('Errores del formulario:', this.signUpForm.controls);
      //deja el formulario como si el usuario hubiera pasado por cada uno de los controles
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { email, 
            password, 
            firstName, 
            lastName, 
            birthDate 
        } = this.signUpForm.getRawValue();
        
    const credentials = { email, password };
    
    const { data, error } = 
      await this.auth.signUp(credentials);
    
    if (error) {
      console.error('Error: ', error.message);
      return
    } 
    
    const userProfile : UserProfile = {
      uuid: data.user!.id,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      email: email,
    }
    
    const { error : profileError} = 
      await this.userService.guardarDatosUsuario(userProfile);
    
    if(profileError){
      console.error('Error: ', profileError.message);
      return
    }


    // Swal.fire({
    //   title: '¡Registro Exitoso!',
    //   text: 'Tu cuenta ha sido creada correctamente. Haz clic para ir al inicio.',
    //   icon: 'success',
    //   confirmButtonText: 'Ir al Home',
    //   confirmButtonColor: '#0d6efd',
    //   allowOutsideClick: false
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.router.navigate(['/home']);
    //   }
    // });
}
  

  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
  get firstName() { return this.signUpForm.get('firstName'); }
  get lastName() { return this.signUpForm.get('lastName'); }
  get birthDate() { return this.signUpForm.get('birthDate'); }
}
