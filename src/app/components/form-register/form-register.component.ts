import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent implements OnInit {

  mensaje: string = 'esperando info';
  msgClass: string = 'info-msg';
  password:string = '';
  passwordCheck:string = '';
  
  constructor() {}

  ngOnInit(): void {}

  checkPassword(password:string, passwordCheck:string): void {

    this.password = password;
    this.passwordCheck = passwordCheck;

    if (password == '' ||
      passwordCheck == '') {
      this.mensaje = 'Debes introducir una contraseña';
      this.msgClass = 'info-msg --error';
    } else if (!(password === passwordCheck)){
      this.mensaje = 'Las contraseñas no coinciden';
      this.msgClass = 'info-msg --error';
    } else {
      this.mensaje = 'Todo correcto';
      this.msgClass = 'info-msg --ok';
    }
  }
}

