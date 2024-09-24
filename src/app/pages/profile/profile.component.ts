import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  //*Clase User
  // public id_user: number;
  // public name: string;
  // public last_name: string;
  // public user_name: string;
  // public email: string;
  // public password: string;
  // public address: string;
  // nombreCompleto()

  public usuario: User;
  public isHidden: boolean;
  public password: string;
  public newName: string;
  public newLast_name: string;
  public newEmail: string;
  public newAdress: string;
  public newPassword: string;
  public newPasswordCheck: string;
  public passwordConfirm: string;


  constructor() {
    this.usuario = new User(
      1,
      'Juan Jose',
      'Millás',
      'Juanjo_writer',
      'juanj.millas@gmail.com',
      'C/ Piruleta 31, Barrio de Chocolate',
      '1234'
    );

    this.isHidden = false;
    this.password = this.usuario.password;
    this.newPassword = '';
    this.newPasswordCheck = '';
    this.passwordConfirm = '';
    this.newName = '';
    this.newLast_name = '';
    this.newEmail = '';
    this.newAdress = '';
  }

  ngOnInit(): void {}

  public changePassword(): void {
    // comparar   public changePassword(): void {
    if (this.newPassword !== this.newPasswordCheck) {
      alert('Las nuevas contraseñas no coinciden');
    } else {
      this.password = this.newPassword;
      this.usuario.name = this.newName;
      this.usuario.last_name = this.newLast_name;
      this.usuario.email = this.newEmail;
      this.usuario.address = this.newAdress;
      alert('Datos de usuario actualizados');
      console.log(this.usuario.name);
    }
  }

  public editUser(
    newName: string,
    newLast_name: string,
    newEmail: string,
    newAddres: string,
    newPassword: string,
    newPasswordCheck: string,
    passwordConfirm: string
  ): void {
    this.newPassword = newPassword;
    this.newPasswordCheck = newPasswordCheck;
    this.passwordConfirm = passwordConfirm;

    !(this.password === passwordConfirm)
      ? alert('la contraseña actual introducida no es correcta')
      : this.changePassword();
  }
}
