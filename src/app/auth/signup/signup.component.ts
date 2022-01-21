import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';

import { AuthService } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  //***VARIABLES
  // (@ViewChild) Decorator Fazendo referencia e selecionando a variável criada no componente do Html(DOM)
  // (!) Para parar de gerar o alerta de que a variável não foi inicializada
  @ViewChild('signup') formSignup!: NgForm;

  //***CONSTRUCTOR
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  //***METHODS
  onSubmit() {
    const values = this.formSignup.value;
    const user: User = {
      email: values.email,
      username: values.username,
      birthdate: values.birthdate,
      profile: 'assets/img/user_default.png',
    };

    console.log(user);

    this.authService.signup(values.email, values.password, user).subscribe({
      next: (creds) => {},
      error: (err) => {
        console.log(err);
        this.snackBar.open(err.code, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
        });
      },
    });
  }

  ngOnInit(): void {}
}
