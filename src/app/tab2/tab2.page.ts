import { Component } from '@angular/core';
import { Solicitudes } from '../models/Solicitudes';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  show = true;
  solicitudes: Solicitudes;

  constructor(private dataService: DataService, public toastController: ToastController) {
    this.dataService.getSolicitudes().subscribe(data => {



      data.tomadas.forEach(g => {
        g.gestiones = g.gestiones.filter(ges => ges.text != "--Seleccione--");
      })

      this.solicitudes = data;

    });
  }

  save(row) {

    if (row.gestion === null) {

      this.presentToast("Seleccione la gestión");
      return;
    }

    this.show = false;
    this.dataService.save(row.id, row.gestion).subscribe(data => {

      if (data.idError == 1) {
        this.presentToast("Se genero un error");
      }
      else {
        this.presentToast("Se ha guardado la solicitud " + row.id);
        this.dataService.load();
      }
      this.show = true;
    }, err => {
      this.show = true;
      this.presentToast("Se genero un error");
    });

  }


  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
