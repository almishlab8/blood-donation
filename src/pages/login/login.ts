import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams  } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

import { Storage } from '@ionic/storage';
import {apiKey} from "../../app/apiurls/serverurls.js";
import { Http , Headers } from '@angular/http';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  email:string = '';
  password:string = '';

  errorMsg:string;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage , public http: Http,
    public authService: AuthProvider ,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController ,
  
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  errorFunc(message){
    let alert = this.alertCtrl.create({
      title: '!انتبه',
      subTitle: message,
      buttons: ['حسناً']
    });
    alert.present();
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'خطا ',
      subTitle: ' ! يرجى التاكد من الايميل و كلمة السر الخاصة بك ',
      buttons: ['حسنا ']
    });
    alert.present();
  }

  skip(){
    this.navCtrl.setRoot(TabsPage);

  }
  Login(){
 
    if (this.email.trim() !==''    ) {    
      
      console.log(this.email.trim() + "   " + this.password.trim() )
       
      if (this.password.trim()  === '') {
        this.showAlert();
 
      }else{
 
        let credentials = {
          email: this.email,
            password: this.password
        };
 
        
         this.authService.login(credentials).then((result) => {
            console.log(result);
           
             if (result['email']=="The email must be a valid email address.") {
                    this.showAlert();
            }else{
              this.getUserInfo();
              this.navCtrl.setRoot(TabsPage);
              let toast = this.toastCtrl.create({
                message: 'اهلا بك مجددا  ',
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
            
            
            
           
        }, (err) => {
     
            console.log(err);
            this.showAlert();
            console.log("credentials: "+JSON.stringify(credentials))
            
        });
 
      }
      
   }
   else{
    
    this.showAlert();
   
    }
 
}




 register(){
    this.navCtrl.push(RegisterPage);
    }

    getUserInfo(){
      return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
    
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', 'Bearer '+value);
    
          console.log('value: ' + value);
     
          this.http.get(apiKey+'/users', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
              this.storage.set('userId', data.id);
              console.log('id: ' + data.id);
              this.storage.set('userName', data.name);
              console.log('name: ' + data.name);
              resolve(data);
            }, (err) => {
              reject(err);
            }); 
        }) 
    
      });
    }
}
 