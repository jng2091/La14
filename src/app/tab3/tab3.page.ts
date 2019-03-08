import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Solicitudes } from '../models/Solicitudes';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  solicitudes: Solicitudes;

  constructor(private dataService: DataService){

    this.dataService.getSolicitudes().subscribe(data => {
      this.solicitudes = data;
    });
    
  }
}
