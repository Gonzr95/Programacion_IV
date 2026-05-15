 import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
 import { from, Observable, of } from "rxjs";
 import { catchError, map } from "rxjs/operators";
 import { Supabase } from "../../../core/services/supabase";
//  import { }
/*
   export function emailTakenValidator(): AsyncValidatorFn {
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
  }*/