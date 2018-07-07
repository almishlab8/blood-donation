import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AllDonorsPage} from '../all-donors/all-donors';
import {BloodRequestPage} from '../blood-request/blood-request';
import {ShowRequestsPage} from '../show-requests/show-requests';
import {DonorsRegisterPage} from '../donors-register/donors-register';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  request(){
    this.navCtrl.push(BloodRequestPage);
    }
    showRequried(){
        this.navCtrl.push(ShowRequestsPage);
    }
 
    donors(){
      this.navCtrl.push(AllDonorsPage);
    }
    addDonors(){
      this.navCtrl.push(DonorsRegisterPage)
    }
}
