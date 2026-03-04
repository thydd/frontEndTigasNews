import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  sendLogin(){
    
  }
}
