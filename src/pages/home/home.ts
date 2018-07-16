import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {AllDonorsPage} from '../all-donors/all-donors';
import {BloodRequestPage} from '../blood-request/blood-request';
import {ShowRequestsPage} from '../show-requests/show-requests';
import {DonorsRegisterPage} from '../donors-register/donors-register';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  x:number = 2;

  constructor(private ev: Events,private oneSignal: OneSignal,public navCtrl: NavController,private storage: Storage) 
  {
    this.ev.subscribe('v', v => {
      if(v){
        this.x=0;
        console.log('Your x sub is', this.x);
       }else{
         this.x=1;
        console.log('Your x sub is', this.x);
      }
    })
    this.storage.get('toggle01').then((val) => {
     if(val){
      this.x=0;
     }else{this.x=1;}
     console.log('Your x home is', this.x);
    });
    
 
  }
  ionViewDidEnter(){
    this.storage.get('toggle01').then((val) => {
      if(val){
       this.x=0;
      }else{this.x=1;}
      console.log('Your x home is', this.x);
     });
  }
  request(){
    this.navCtrl.push(BloodRequestPage);
    }
    showRequried(){
        this.navCtrl.push(ShowRequestsPage);
    }
 
    donors(){
      this.navCtrl.push(AllDonorsPage);
    }
    addDonors(){
      this.navCtrl.push(DonorsRegisterPage)
    }
}
