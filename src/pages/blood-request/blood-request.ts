import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BloodRequestProvider } from '../../providers/crud/bloodRequestProvider';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {LoginPage} from '../login/login';

/**
 * Generated class for the BloodRequestPage page.

 */

@IonicPage()
@Component({
  selector: 'page-blood-request',
  templateUrl: 'blood-request.html',
})
export class BloodRequestPage {
  requestData = {
 
    name:'', 
    age:'' ,
    bloodtype:'',
    phone: '' ,
    location: '', 
    state:'' ,
    notes:' ' ,
    hide: false ,
    added_by: '' 
    
  } 
  constructor(public navCtrl: NavController, 
    public BloodRequestProvider:BloodRequestProvider,
    public storage: Storage ,
    private toastCtrl: ToastController,
    public navParams: NavParams) {
  }

  ionViewDidEnter(){
    this.checkAuthState();
  }
  addRequired(){
    this.storage.get('userId').then((value) => {
      this.requestData.added_by=value;
   });
   this.requestData.hide=false;
    this.BloodRequestProvider.insertPosts(this.requestData).then((result)=>{
      console.log(result)
      this.navCtrl.pop()
      let toast = this.toastCtrl.create({
        message: 'تم اضافة الطلب بنجاح',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    },(err)=>{
      console.log("insert err: "+ err)
      console.log("this.myreq: "+ JSON.stringify(this.requestData))
    })
    
   
   }
   checkAuthState(){
    this.storage.get('UserIsLogin').then((UserIsLogin) => {
        if (!UserIsLogin) {
          this.navCtrl.setRoot(LoginPage);
        }   
    });
  }
}
