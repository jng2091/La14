import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {

  credentials: FormGroup;
  showSpinner = false;
  hide1=true;
  hide2=true;
  hide3=true;

  constructor(private authService: AuthService, private router: Router, public menuCtrl: MenuController, private formBuilder: FormBuilder
    , public toastController: ToastController) { 

    this.credentials = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ngOnInit() {

  }

  
  change() {

    if (this.credentials.value.password == this.credentials.value.password1) {
      this.presentToast("La contraseña nueva no puede ser igual a la actual");
      return;
    }

    if (this.credentials.value.password1 != this.credentials.value.password2) {
      this.presentToast("La contraseña no coincide");
      return;
    }

    this.showSpinner = true;


    this.authService.change(this.credentials.value.password,this.credentials.value.password1).subscribe(res => {
      if (res.idError == 0) {
        this.showSpinner = false;
       
        this.presentToast("La contraseña se cambio correctamente");
        this.router.navigate(["/tabs"]);
        return;
      }
      else if (res.idError == 1) {
        this.showSpinner = false;
        this.presentToast("Contraseña erronea");
        return;
      }
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
