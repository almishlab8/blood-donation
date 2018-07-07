import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodRequestPage } from './blood-request';

@NgModule({
  declarations: [
    BloodRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(BloodRequestPage),
  ],
})
export class BloodRequestPageModule {}
