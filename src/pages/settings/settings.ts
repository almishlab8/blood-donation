import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {DevelopersPage} from '../developers/developers';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {LoginPage} from '../login/login';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
isLogin:boolean=false;

  constructor(public navCtrl: NavController, 
    private toastCtrl: ToastController,
    public navParams: NavParams,public storage: Storage ,
    public modalCtrl: ModalController) {

  }

  ionViewDidEnter() {
   
    this.storage.get('UserIsLogin').then((UserIsLogin) => {
       console.log('UserIsLogin:: '+UserIsLogin);
      if (!UserIsLogin) {this.isLogin=false}
      else{this.isLogin=true}
    }) 


  }
  aboutModal() {
    let modal = this.modalCtrl.create(AboutPage);
    modal.present();
  }
  contactModal() {
    let modal = this.modalCtrl.create(ContactPage);
    modal.present();
  }
  developerModal() {
    let modal = this.modalCtrl.create(DevelopersPage);
    modal.present();
  }
  login(){
    this.navCtrl.setRoot(LoginPage);
  }
  logout(){
    this.storage.set('token', '');
    this.isLogin=false;
    this.storage.set('UserIsLogin', false);
    let toast = this.toastCtrl.create({
      message: 'تم تسجيل الخروج من الحساب ',
      duration: 3000,
      position: 'top'
    });
    toast.present();
   }
}
