import { Component, OnInit } from '@angular/core';
import { Center } from 'src/app/models/center';
import { CenterService } from 'src/app/service/center.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public center: Center;

  constructor(private centerService: CenterService) {
    this.center = new Center('', '', '','', 0, 0, 0);
  }

  ngOnInit(): void {}

  register() {
    this.centerService.centerRegister(this.center).subscribe(
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
