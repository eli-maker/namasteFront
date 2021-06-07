import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { CenterService } from './center.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  
  constructor(
    private centerService: CenterService,
    private router: Router
  ) {}

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

  createTextElement(label: string, container: any) {
    const text = L.DomUtil.create('div', '', container);
    text.className = 'mb-2';
    text.innerHTML = label;
    return text;
  }

  createButton(label: string, container: any, success: boolean) {
    const btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.className = `btn ${success ? 'btn-success' : 'btn-danger'}`;
    btn.innerHTML = label;
    return btn;
  }

  makeMarkers(map: L.map): void {
    this.centerService.showCenters().subscribe(
      (res: any) => {
        if (res.statusCode !== 200) {
          alert('Centers not found');
        } else {
          for (const center of res.allCenters) {
            const centerPopUp = L.popup();
            const container = L.DomUtil.create('div'),
              name = this.createTextElement(
                `<div>Name: ${center.name}</div>`,
                container
              ),
              adress = this.createTextElement(
                `<div>Adress: ${center.adress}</div>`,
                container
              ),
              email = this.createTextElement(
                `<div>Email: ${center.email}</div>`,
                container
              ),
              phone = this.createTextElement(
                `<div>Phone: ${center.phone}</div>`,
                container
              ),
              updateBtn = this.createButton('Update', container, true),
              deleteBtn = this.createButton('Delete', container, false);

            const lon = center.longitude;
            const lat = center.latitude;
            const marker = L.marker([lat, lon]);

            centerPopUp.setLatLng([lat, lon]).setContent(container);

            L.DomEvent.on(updateBtn, 'click', () => {
              this.saveCenter(center);
              this.router.navigate(['/update']);
            });

            L.DomEvent.on(deleteBtn, 'click', () => {
              this.delete(center._id);
            });

            marker.bindPopup(centerPopUp);

            marker.addTo(map);
          }
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
}
