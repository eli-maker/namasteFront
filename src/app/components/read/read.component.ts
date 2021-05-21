import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  public user: User;
  public usersFound: any = [];
  public searchRole: string;
  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', 0, '');
  }

  ngOnInit(): void {}

  read() {
    this.userService.showUsers(this.searchRole).subscribe(
      (res: any) => {
        if (res.statusCode !== 200) {
          alert('Users no found');
        } else {
          this.usersFound = res.allUsers;
        }
      },
      (error) => {
        const errormessage = <any>error;
        if (errormessage != null) {
          console.log(error);
        }
      }
    );
  }

  saveUser(user) {
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
  }

  delete(userId) {
    this.userService.deleteUser(userId).subscribe(
      (res: any) => {
        if (res.statusCode !== 200) {
          alert('Cannot delete a user');
        } else {
          alert('User deleted');
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
