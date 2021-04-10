import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SectionsModule } from '../../sections/sections.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartComponent } from './cart.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        SectionsModule,
        FlexLayoutModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTooltipModule,
        NgImageSliderModule,
        MatProgressSpinnerModule
    ],
    declarations: [ CartComponent ],
    exports: [ CartComponent ],
    providers: []
})
export class CartModule { }
