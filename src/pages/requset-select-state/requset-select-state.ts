import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowRequestsPage } from '../show-requests/show-requests';

/**
 * Generated class for the RequsetSelectStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requset-select-state',
  templateUrl: 'requset-select-state.html',
})
export class RequsetSelectStatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequsetSelectStatePage');
  }
  requset(st){
    this.navCtrl.push(ShowRequestsPage, {"st":st});
  }
}
