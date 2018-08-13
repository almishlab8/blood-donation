import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DonorProvider } from '../../providers/crud/donorProvider';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

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

  donordata:any
  userId:any
  filter=1

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private callNumber: CallNumber,
    public DonorProvider:DonorProvider,public storage: Storage ) {

      this.DonorProvider.getPosts().then((data) => {
     
        this.donordata = data["data"] 
        this.storage.get('userId').then((value) => {
          this.userId=value;
 
        });
        console.log( this.donordata)
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
        console.log( this.donordata)
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

    
}
