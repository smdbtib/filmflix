import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  // (@ViewChild) Decorator Fazendo referencia e selecionando a variável criada no componente do Html(DOM)
  // (!) Para parar de gerar o alerta de que a variável não foi inicializada
  @ViewChild('signup') formSignup!: NgForm;

  onSubmit() {
    console.log(this.formSignup.value);

    // TODO: Integrar com AuthService
  }

  ngOnInit(): void {
  }

}
