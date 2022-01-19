import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  //***VARIABLES
    // (@ViewChild) Decorator Fazendo referencia e selecionando a variável criada no componente do Html(DOM)
    // (!) Para parar de gerar o alerta de que a variável não foi inicializada
  @ViewChild('login') formLogin!: NgForm;


  //***CONSTRUTOR
  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService) { }

  //***METHODS
  onSubmit(){
    const email = this.formLogin.value.email as string;
    const password = this.formLogin.value.password as string;

    this.authService.login(email, password).subscribe({
      next: (creds) =>{}, // TODO: Ir para a home quado logar
      error: (err) => {
        let message = '';
        switch(err.code){
          case 'auth/invalid-email':
            message = 'Email invalid';
            break;
          case 'auth/user-not-found':
            message = 'User not found';
          break;
        }

        this.snackBar.open(message,'Close', {
          duration: 5000,
          horizontalPosition: 'end',
        } );
      }
    });
  }

  ngOnInit(): void {
  }

}
