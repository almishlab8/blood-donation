import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DonorProvider } from '../../providers/crud/donorProvider';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the AllDonorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-donors',
  templateUrl: 'all-donors.html',
})
export class AllDonorsPage {

  donordata:any;
  userId:any;
  filter=1;
  states=1
  donors=[];
  internet=false;

st:string;
  constructor(public navCtrl: NavController,
    public navparam:NavParams ,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,

    private callNumber: CallNumber,
    public DonorProvider:DonorProvider,public storage: Storage ) {
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
      this.DonorProvider.getPosts().then((data) => {
        if (data) {
          loader.dismiss();
          this.internet=true
        }
        this.donordata = data["data"]
        for(var i = 0; i < this.donordata.length; i++) {
          var obj = this.donordata[i];
         if (obj.hide == "0") {
           this.donors.push(obj)
         }
            
          
          console.log(obj);
      } 
        this.storage.get('userId').then((value) => {
          this.userId=value;
 
        });
        //console.log( this.donordata[0].state)
      });
      

      
    }
    
    delete($id){
 
    let $data={
      "hide":"1"
    }
      this.DonorProvider.editPosts($id,$data).then((result)=>{
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
      
      this.DonorProvider.getPosts().then((data) => {
        this.donordata = data["data"]
        this.donors=[];
        for(var i = 0; i < this.donordata.length; i++) {
          var obj = this.donordata[i];
          
          if (obj.hide == "0") {
            this.donors.push(obj)
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
