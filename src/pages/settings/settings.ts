import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {DevelopersPage} from '../developers/developers';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  aboutModal() {
    let modal = this.modalCtrl.create(AboutPage);
    modal.present();
  }
  contactModal() {
    let modal = this.modalCtrl.create(ContactPage);
    modal.present();
  }
  developerModal() {
    let modal = this.modalCtrl.create(DevelopersPage);
    modal.present();
  }
}
