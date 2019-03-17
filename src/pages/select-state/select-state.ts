import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllDonorsPage } from '../all-donors/all-donors';

/**
 * Generated class for the SelectStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-state',
  templateUrl: 'select-state.html',
})
export class SelectStatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectStatePage');
  }
  donors(st){
    this.navCtrl.push(AllDonorsPage, {"st":st});
  }
}
