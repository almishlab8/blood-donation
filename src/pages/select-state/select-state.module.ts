import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectStatePage } from './select-state';

@NgModule({
  declarations: [
    SelectStatePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectStatePage),
  ],
})
export class SelectStatePageModule {}
