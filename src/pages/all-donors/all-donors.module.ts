import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDonorsPage } from './all-donors';

@NgModule({
  declarations: [
    AllDonorsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDonorsPage),
  ],
})
export class AllDonorsPageModule {}
