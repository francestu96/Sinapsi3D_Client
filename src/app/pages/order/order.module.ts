import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';
import { OrderComponent } from './order.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        NgImageSliderModule,
        MatGridListModule
    ],
    declarations: [ OrderComponent ],
    exports: [ OrderComponent ]
})
export class OrderModule { }