import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public form: FormGroup = this._fb.group({
    email: ['fernando@google.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  public login() {
    console.log(this.form.value);
    const { email, password } = this.form.value;
    this._authService.login(email, password).subscribe({
      next: () => this._router.navigateByUrl('/dashboard'),
      error: (errorMessages: string[]) => {
        console.log(errorMessages);
        Swal.fire('Error', errorMessages?.toString(), 'error');
      },
    });
  }
}
