import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgImageSliderModule } from 'ng-image-slider';
import { OrderComponent } from './order.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatIconModule,
        NgImageSliderModule
    ],
    declarations: [ OrderComponent ],
    exports: [ OrderComponent ]
})
export class OrderModule { }