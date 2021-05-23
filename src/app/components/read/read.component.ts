import { Component, OnInit } from '@angular/core';
import { CenterService } from 'src/app/service/center.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  public user: User;
  public centersFound: any = [];
  public searchRole: string;
  constructor(private centerService: CenterService) {
    this.user = new User('', '', '', '', 0, '');
  }

  ngOnInit(): void {
    this.centerService.showCenters().subscribe(
      (res: any) => {
        if (res.statusCode !== 200) {
          alert('Centers not found');
        } else {
          this.centersFound = res.allCenters;
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

  saveCenter(center) {
    const centerString = JSON.stringify(center);
    localStorage.setItem('center', centerString);
  }

  delete(centerId) {
    this.centerService.deleteCenter(centerId).subscribe(
      (res: any) => {
        if (res.statusCode !== 200) {
          alert('Cannot delete a center');
        } else {
          alert('Center deleted');
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
