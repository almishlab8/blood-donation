import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DonorProvider } from '../../providers/crud/donorProvider';
import {LoginPage} from '../login/login';

/**
 * Generated class for the DonorsRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donors-register',
  templateUrl: 'donors-register.html',
})
export class DonorsRegisterPage {
  donorData = {
 
    name:'', 
    bloodtype:'',
    phone: '' ,
    location: '', 
    state:'' ,
    notes:' ' ,
    hide: 0 ,
    added_by: '' 
    
  }
  constructor(public navCtrl: NavController, 
    public DonorProvider:DonorProvider,
    public storage: Storage ,
    private toastCtrl: ToastController,
    public navParams: NavParams) {
  }
  ionViewDidEnter(){
    this.checkAuthState();
  }

  addDonor(){
    this.storage.get('userId').then((value) => {
      this.donorData.added_by=value;
   });
   this.donorData.hide=0;
    this.DonorProvider.insertPosts(this.donorData).then((result)=>{
      console.log(result)
      this.navCtrl.pop()
      let toast = this.toastCtrl.create({
        message: 'تم تسجيلك كمتبرع بنجاح',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    },(err)=>{
      console.log("insert err: "+ err)
      console.log("this.myreq: "+ JSON.stringify(this.donorData))
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
