import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CrudProvider } from '../../providers/crud/crud';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-show-requests',
  templateUrl: 'show-requests.html',
})
export class ShowRequestsPage {

  mydata:any
  usertoken:any
  constructor(public navCtrl: NavController,
    public crudProvider:CrudProvider,public storage: Storage ) {

      this.crudProvider.getPosts().then((data) => {
     
        this.mydata = data["data"] 
        this.storage.get('token').then((value) => {
          this.usertoken=value;
 
        });
        console.log( this.mydata)
      });
    

  }

}
