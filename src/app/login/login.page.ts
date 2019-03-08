import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;
  showSpinner = false;
  hide1 = true;

  constructor(
    private authService: AuthService, 
    private router: Router, public menuCtrl: MenuController, private formBuilder: FormBuilder
    , public toastController: ToastController) {


    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'myMenu');
  }

  ngOnInit() {

  }

  logForm() {

    this.showSpinner = true;


    this.authService.authenticate(this.credentials.value.email, this.credentials.value.password).subscribe(res => {

      if (res.error == 0) {
        this.presentToast("Usuario y/o contraseña erroneos");
        this.showSpinner = false;
        return;
      }


      localStorage.setItem("token", res.token);
      localStorage.setItem("expired", res.expired.toString());

      this.showSpinner = false;
      this.credentials.reset();
      this.router.navigate(["/tabs"]);

    }, err => {
      this.showSpinner = false;
      this.presentToast("Se generó un error");
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
