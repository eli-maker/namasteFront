import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', 0, '');
  }

  ngOnInit(): void {}

  register() {
    this.userService.userRegister(this.user).subscribe(
      (res: any) => {
        if (res.statusCode !== 200) {
          alert('No se pudo registrar el usuario');
        } else {
          alert('Registro exitoso');
        }
      },
      (error) => {
        var errorMensage = <any>error;
        if (errorMensage != null) {
          console.log(error);
        }
      }
    );
  }
}
