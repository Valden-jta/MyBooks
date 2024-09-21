import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
 constructor() {

 }

 ngOnInit(): void {
  document.addEventListener('DOMContentLoaded', () => {
    const message: HTMLDivElement = document.querySelector('#msg') as HTMLDivElement;
    const password: HTMLInputElement = document.querySelector('#password') as HTMLInputElement;
    const passwordCheck: HTMLInputElement = document.querySelector('#password-repeat') as HTMLInputElement;
    const formButton: HTMLButtonElement = document.querySelector('.form__button') as HTMLButtonElement;
  
    message.classList.remove('--error');
    message.classList.remove('ok');
  
    formButton.addEventListener('click', checkPassword);
  
    function checkPassword(): void {
      if (!(password.value === passwordCheck.value) || password.value == '' || passwordCheck.value == '') {
        message.innerHTML = 'Las contraseñas no coinciden';
        message.classList.remove('--ok');
        message.classList.add('--error');
      } else {
        message.innerHTML = 'Todo está correcto';
        message.classList.remove('--error');
        message.classList.add('--ok');
      }
    }
  });
  
  
    }
}
