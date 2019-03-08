import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://desarrollo.epik.com.co:6626";

  constructor(private httpClient: HttpClient) { }

  authenticate(email, password) {

    return this.httpClient.post<{ token: string, expired: number, error: number }>(this.baseUrl + "/api/auth/token"
      , { Email: email, Password: password }
      , { headers: new HttpHeaders({ "No-Auth": "True" }) }
    );
  }

  extend() {
    return this.httpClient.get<{ token: string, expired: number, error: number }>(this.baseUrl + "/api/auth/extend");
  }

  change(ContrasenaActual: string, ContrasenaNueva: string) {
    return this.httpClient.post<{ idError: number }>(this.baseUrl + "/api/auth/change"
      , { ContrasenaActual: ContrasenaActual, ContrasenaNueva: ContrasenaNueva }
    );
  }

}
