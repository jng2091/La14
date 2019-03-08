import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Solicitudes } from '../models/Solicitudes';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  solicitudes: Solicitudes;
  interval;


  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'myMenu');
  }



  constructor(private dataService: DataService, public menuCtrl: MenuController) {

    this.dataService.load();

    this.dataService.getSolicitudes().subscribe(data => {
      this.solicitudes = data;
    }, err => {
      console.log("Se genero un error");
    });


  }

  // ionViewDidLeave() {
  //   //clearInterval(this.interval);
  // }


}
