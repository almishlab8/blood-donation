import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BloodRequestProvider } from '../../providers/crud/bloodRequestProvider';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';


@IonicPage()
@Component({
  selector: 'page-show-requests',
  templateUrl: 'show-requests.html',
})
export class ShowRequestsPage {

  requsetsData:any
  userId:any
  filter=1
  states=1
  requests=[];
  st:string;
  internet=false;

  constructor(public navCtrl: NavController,
    public navparam:NavParams ,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,

    private callNumber: CallNumber,
    public BloodRequestProvider:BloodRequestProvider,public storage: Storage ) {

      this.st = this.navparam.get("st");  

      const loader = this.loadingCtrl.create({
        content: "يرجى الانتظار ... يعمد على سرعة الانترنيت لديك",});
      loader.present();
      setTimeout(() => {
        if (this.internet == false) {
           loader.dismiss();
         this.noInternet();
          }
        }, 20000);
      this.BloodRequestProvider.getPosts().then((data) => {
     
        if (data) {
          loader.dismiss();
          this.internet=true
        }
           this.requsetsData = data["data"]
           for(var i = 0; i < this.requsetsData.length; i++) {
             var obj = this.requsetsData[i];
             if (obj.hide == "0") {
               this.requests.push(obj)
             }
             console.log(obj);
         } 
        this.storage.get('userId').then((value) => {
          this.userId=value;
 
        });
        console.log( this.requsetsData)
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

    doRefresh(refresher) {
      
      this.BloodRequestProvider.getPosts().then((data) => {
        this.requsetsData = data["data"]
        this.requests=[];
        for(var i = 0; i < this.requsetsData.length; i++) {
          var obj = this.requsetsData[i];
          
          if (obj.hide == "0") {
            this.requests.push(obj)
          }
          
          console.log(obj);
      } 
      });
  
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }


    call(phone){
      this.callNumber.callNumber(phone , true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
    }
    noInternet() {
    
      const alert = this.alertCtrl.create({
        title: 'لا يوجد اتصال',
        subTitle: "تأكد من اتصالك بالانترنيت",
        buttons: ['حسناً']
      });
      alert.present();
    }
}
