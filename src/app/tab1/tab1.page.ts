import { Component } from '@angular/core';
import { Solicitudes } from '../models/Solicitudes';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  solicitudes: Solicitudes ;
  show = true;



  constructor(private dataService: DataService, public toastController: ToastController) {



    this.dataService.getSolicitudes().subscribe(data => {
      this.solicitudes = data;
    });



  }

  refresh() {
    this.dataService.load();
  }


  tomar(row) {
    this.show = false;
    this.dataService.take(row.id).subscribe(data => {


      if (data.idError == 1) {
        this.presentToast("Se genero un error");
      }
      else if (data.idError == 2) {
        this.presentToast("Alguien ya tomo la solicitud " + row.id);

      }
      else {
        this.presentToast("Ha tomado la solicitud " + row.id);
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
