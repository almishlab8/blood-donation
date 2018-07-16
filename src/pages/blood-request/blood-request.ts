import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BloodRequestProvider } from '../../providers/crud/bloodRequestProvider';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {LoginPage} from '../login/login';
import {Http, Headers} from '@angular/http';

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
    public http :Http ,
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
      this.sendNotification(this.requestData.location,this.requestData.bloodtype,this.requestData.state);
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

  sendNotification(location,bloodtype,state){
    let headers = new Headers();
    headers.append('Content-Type','application/json;');
    headers.append('Authorization','Basic NDkxMzNlMWYtMzE5OS00MjY0LTlhZmMtZjg3OWM2MmYyZTk3');
      let body ={
        "app_id": "51ddcf0d-ec69-424f-a225-4c92a7b01dfb",
        "included_segments": ["All"],
        "data": {"foo": "bar"},
        "contents": {"en":"يوجد شخص يحتاج الى التبرع بالدم "+bloodtype+"  في محافظة " +state}
      };
      this.http.post('https://onesignal.com/api/v1/notifications',JSON.stringify(body),{headers: headers}).map(res=>res.json()).subscribe(data=>{
        console.log(data);
      })
    }
}
