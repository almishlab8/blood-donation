import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BloodRequestProvider } from '../../providers/crud/bloodRequestProvider';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-show-requests',
  templateUrl: 'show-requests.html',
})
export class ShowRequestsPage {

  mydata:any
  userId:any
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public BloodRequestProvider:BloodRequestProvider,public storage: Storage ) {

      this.BloodRequestProvider.getPosts().then((data) => {
     
        this.mydata = data["data"] 
        this.storage.get('userId').then((value) => {
          this.userId=value;
 
        });
        console.log( this.mydata)
      });
    

  }
  delete($id){
 
    let $data={
      "hide":"1"
    }
      this.BloodRequestProvider.editPosts($id,$data).then((result)=>{
        console.log(result)
        this.navCtrl.pop()
        let toast = this.toastCtrl.create({
          message: 'تم الحذف بنجاح',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      },(err)=>{
        console.log("insert err: "+ err)
      })
      
    }
}
