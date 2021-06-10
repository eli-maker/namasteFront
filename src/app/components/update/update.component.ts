import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { CanActivate, Router } from '@angular/router';
import { CenterService } from 'src/app/service/center.service';
import { Center } from 'src/app/models/center';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  public center:Center;
  public centerInStorage: any;

  constructor(private centerService: CenterService, private router: Router) {
    this.center = new Center('', '', '', '', 0, 0, 0);
  }

  ngOnInit(): void {
    this.fillForm()
  }

  fillForm(){
    this.centerInStorage = JSON.parse(localStorage.getItem('center'));
  }    

  update(){
    this.centerService.centerUpdate(this.centerInStorage._id, this.centerInStorage).subscribe(
      (res:any)=> {
        if(res.statusCode !== 200){
        alert('No se puede actualizar el centro') 
        }else{
          alert('Centro actualizado')
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
