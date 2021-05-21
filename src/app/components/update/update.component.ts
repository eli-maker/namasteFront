import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  public user: User;
  public userInStorage: any;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User('', '', '', '', 0, '');
  }

  ngOnInit(): void {
    this.fillForm()
  }

  fillForm(){
    this.userInStorage = JSON.parse(localStorage.getItem('user'))
  }    

  update(){
    this.userService.userUpdate(this.userInStorage._id, this.userInStorage).subscribe(
      (res:any)=> {
        if(res.statusCode !== 200){
        alert('Cannot update user') 
        }else{
          alert('User updated')
          localStorage.clear()
          this.router.navigate(['/read']);
        }
      }, 
      (error)=>{
        const errorMessage = <any>error
        if(errorMessage != null){
          console.log(error)
        }
      }
    )
  }
}
