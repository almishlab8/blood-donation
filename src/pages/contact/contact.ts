import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  ,ViewController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FeedbackProvider } from '../../providers/crud/feedbackProvider';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  feedbackData = {
 
    title:'', 
    comment:'',
    archived: 0 ,
    added_by: '' 
    
  }
  constructor( 
    public navCtrl: NavController, 
    public FeedbackProvider:FeedbackProvider,
    public storage: Storage ,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {

  }
  ionViewDidEnter(){
    this.checkAuthState();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendfeedback(){
    this.storage.get('userId').then((value) => {
      this.feedbackData.added_by=value;
   });
   this.feedbackData.archived=0;
    this.FeedbackProvider.insertPosts(this.feedbackData).then((result)=>{
      console.log(result)
      this.showAlert();
    },(err)=>{
      console.log("insert err: "+ err)
      console.log("this.myreq: "+ JSON.stringify(this.feedbackData))
    })
    
   
   }

   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'شكرا لك',
      subTitle: 'شاكرين تواصلك معنا وسنأخذ برأيك بعين الاعتبار',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.dismiss();
          }
        },
      ]
    });
    alert.present();
  }

  checkAuthState(){
    this.storage.get('UserIsLogin').then((UserIsLogin) => {
        if (!UserIsLogin) {
          this.navCtrl.setRoot(LoginPage);
        }   
    });
  }
}
