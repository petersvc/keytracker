import { Component, Input } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Input() currentUser!: User;
  name!: string;
  username!: string;
  masterPassword!: string;
  title = '- Login do usuário -';
  passwordTip = 'Esqueceu a senha?';
  switchFormTitle = 'Não tem uma conta?';
  switchFormButton = 'Registrar';
  callComponent = this.callRegistrationComponent;
  callMethod = this.login;
  formGroupButtonText = 'Entrar';
  isLogin = true;

  constructor(private readonly userService: UserService) {}

  login(): void {
    this.userService.getUserByUserName(this.username).subscribe(users => {
      if (users.length > 0) {
        if (users[0].masterPassword === this.masterPassword) {
          this.currentUser = users[0];
          console.log('Usuário logado:', this.currentUser);
        } else {
          console.log('Senha incorreta!');
        }
      } else {
        console.log('Usuário não encontrado!');
      }
    });
  }

  register(): void {
    this.userService
      .createUser(this.name, this.username, this.masterPassword)
      .subscribe(response => {
        console.log('Novo usuário criado:', response);
        this.currentUser = response;
      });
  }

  callRegistrationComponent(): void {
    this.title = '- Registro do usuário -';
    this.passwordTip = 'Dica: use uma senha forte!';
    this.switchFormTitle = 'Já tem uma conta?';
    this.switchFormButton = 'Entrar';
    this.callComponent = this.callLoginComponent;
    this.callMethod = this.register;
    this.formGroupButtonText = 'Registrar';
    this.isLogin = false;
  }

  callLoginComponent(): void {
    this.title = '- Login do usuário -';
    this.switchFormTitle = 'Não tem uma conta?';
    this.switchFormButton = 'Registrar';
    this.callComponent = this.callRegistrationComponent;
    this.callMethod = this.login;
    this.formGroupButtonText = 'Entrar';
    this.isLogin = true;
  }
}
