import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams  } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';



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

myLogOut(){
  this.authService.logout();
}


 register(){
    this.navCtrl.push(RegisterPage);
    }

}
 