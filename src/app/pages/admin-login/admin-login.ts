import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';
import { ILoginRequest } from '../../models/Login/ILoginRequest.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)
 
  isLoading = false
  errorMessage = ''

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit(){
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha usuário e senha.'
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    const payload: ILoginRequest = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this._authService.login(payload)
    .pipe(
      finalize(() => {
        this.isLoading = false
      })
    )
    .subscribe({
      next: () => {this._router.navigate(['/homeAdmin']);
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      }
    });
  }
}
