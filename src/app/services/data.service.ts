import { Injectable } from '@angular/core';
import { Solicitudes, GestionAgrupada } from '../models/Solicitudes';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _solicitudes: BehaviorSubject<Solicitudes>
  private solicitudes: Solicitudes;


  baseUrl = "https://desarrollo.epik.com.co:6626";

  constructor(private httpClient: HttpClient) {

    this._solicitudes = <BehaviorSubject<Solicitudes>>new BehaviorSubject(this.solicitudes);

  }

  getSolicitudes() {
    return this._solicitudes.asObservable();
  }

  load() {

    this.httpClient.get<Solicitudes>(this.baseUrl + "/api/values/all"
      //, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) }
    ).subscribe(data => {
      console.log("se consulto el servicio");
      this.solicitudes = data;
      this._solicitudes.next(Object.assign({}, this.solicitudes));

    });
  }

  take(id: number) {
    return this.httpClient.get<Solicitudes>(this.baseUrl + "/api/values/take/" + id
      //, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) }
    );
  }

  save(id: number, gestion: number) {
    return this.httpClient.post<Solicitudes>(this.baseUrl + "/api/values/save"
      , { id: id, gestion: gestion }
      //, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) }
    );
  }

  report() {
    return this.httpClient.get<GestionAgrupada[]>(this.baseUrl + "/api/values/report"
      //, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) }
    );   
  }

}
