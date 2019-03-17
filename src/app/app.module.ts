import { RequsetSelectStatePageModule } from './../pages/requset-select-state/requset-select-state.module';
import { SelectStatePage } from './../pages/select-state/select-state';
import { SettingsPageModule } from './../pages/settings/settings.module';
import { RegisterPageModule } from './../pages/register/register.module';
import { LoginPageModule } from './../pages/login/login.module';
import { DonorsRegisterPageModule } from './../pages/donors-register/donors-register.module';
import { ShowRequestsPageModule } from './../pages/show-requests/show-requests.module';
import { BloodRequestPageModule } from './../pages/blood-request/blood-request.module';
import { DevelopersPageModule } from './../pages/developers/developers.module';
import { AllDonorsPageModule } from './../pages/all-donors/all-donors.module';
import { AboutPageModule } from './../pages/about/about.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsPage } from '../pages/settings/settings';

import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {DevelopersPage} from '../pages/developers/developers';
import {AllDonorsPage} from '../pages/all-donors/all-donors';
import {BloodRequestPage} from '../pages/blood-request/blood-request';
import {ShowRequestsPage} from '../pages/show-requests/show-requests';
import {DonorsRegisterPage} from '../pages/donors-register/donors-register';

import { AuthProvider } from '../providers/auth/auth';
import { BloodRequestProvider } from '../providers/crud/bloodRequestProvider';
import { DonorProvider } from '../providers/crud/donorProvider';
import { FeedbackProvider } from '../providers/crud/feedbackProvider';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http'; 
import { OneSignal } from '@ionic-native/onesignal';
import { CallNumber } from '@ionic-native/call-number';
import { SelectStatePageModule } from '../pages/select-state/select-state.module';
import { RequsetSelectStatePage } from '../pages/requset-select-state/requset-select-state';


@NgModule({
  declarations: [
    MyApp,
  
   ContactPage,
    HomePage,
//       AboutPage,
//     SettingsPage,
//    DevelopersPage,
//     AllDonorsPage,
//     BloodRequestPage,
//     ShowRequestsPage,
//     DonorsRegisterPage,
//     LoginPage,
//     RegisterPage,
//   SelectStatePage,
//  RequsetSelectStatePage,
    TabsPage
  ],
  imports: [
    
    BrowserModule,
    SettingsPageModule,
    BloodRequestPageModule,
    ShowRequestsPageModule,
    DonorsRegisterPageModule,
    LoginPageModule,
    RegisterPageModule,
    AboutPageModule,
    DevelopersPageModule,
    AllDonorsPageModule,
    SelectStatePageModule,
    RequsetSelectStatePageModule,
    IonicModule.forRoot(MyApp, {backButtonText: 'رجوع'},),
    IonicStorageModule.forRoot()  ,
    HttpModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SettingsPage,
    DevelopersPage,
    AllDonorsPage,
    BloodRequestPage,
    ShowRequestsPage,
    DonorsRegisterPage,
    LoginPage,
    RegisterPage,
    SelectStatePage,
    RequsetSelectStatePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    OneSignal,
    SplashScreen,
    CallNumber,
    AuthProvider,
    BloodRequestProvider,
    FeedbackProvider,
    DonorProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
