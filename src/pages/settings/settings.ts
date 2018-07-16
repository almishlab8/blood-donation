import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {DevelopersPage} from '../developers/developers';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {LoginPage} from '../login/login';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import {ShowRequestsPage} from '../show-requests/show-requests';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
isLogin:boolean=false;
userName:any;
toggle01: boolean = true;
toggle02: boolean = false;
val: boolean ;
x:number = 1;
  constructor(public navCtrl: NavController, 
    private oneSignal: OneSignal,
    private ev: Events,
    private toastCtrl: ToastController,
    public navParams: NavParams,public storage: Storage ,
    public modalCtrl: ModalController) {
      //this.sendPush();

      this.storage.get('toggle01').then((val) => {
        this.toggle01=val;
        if(val){
         this.x=0;
        }else{this.x=1;}
        console.log('Your x sittng cc is', this.x);
       });

       
  }

  ionViewDidEnter() {
   
    this.storage.get('UserIsLogin').then((UserIsLogin) => {
       console.log('UserIsLogin:: '+UserIsLogin);
      if (!UserIsLogin) {this.isLogin=false}
      else{this.isLogin=true}
    }) 
    this.storage.get('userName').then((userName) => {
   this.userName=userName;
    }) 


  }
//toogle
toggleOne() {
  this.toggle01 = !this.toggle02;
  this.storage.set('toggle01', this.toggle01);
  this.storage.get('toggle01').then((val1) => {
    if(val1){
      this.x=0;
     }else{this.x=1;}
    console.log('Your val sittng tt is', val1);
    console.log('Your x sittng  tt is', this.x);
   this.publishEvent(val1);
  });
}

toggleTwo() {
  this.toggle02 = !this.toggle01;
}
 publishEvent(v){
  this.ev.publish('v', v);
}
//toggle

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
    this.storage.set('userId', '');
    this.storage.set('userName', '');
    let toast = this.toastCtrl.create({
      message: 'تم تسجيل الخروج من الحساب ',
      duration: 3000,
      position: 'top'
    });
    toast.present();
   }

   sendPush(){
     this.oneSignal.startInit('51ddcf0d-ec69-424f-a225-4c92a7b01dfb', '384647428323');
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      console.log("يوجد طلب جديد لشخص محتاج دم تفقد ذلك");
    });
    
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      this.navCtrl.push(ShowRequestsPage);
    });
    
   this.oneSignal.endInit();
   }


}
