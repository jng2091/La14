import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Solicitudes, GestionAgrupada } from '../models/Solicitudes';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {


  gestionesAgrupadas: GestionAgrupada[];

  constructor(private dataService: DataService, ) {

    this.dataService.report().subscribe(data => {
      this.gestionesAgrupadas = data;

    });

  }

  ngOnInit() {
  }

}
