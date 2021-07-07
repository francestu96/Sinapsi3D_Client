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

import { MatFormFieldModule } from '@angular/material/form-field';
import { CartComponent } from './cart.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayPalModule } from 'src/app/shared/paypal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTooltipModule,
        NgImageSliderModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        TranslateModule,

        PayPalModule.init({
            clientId: "AUNogjlAz__6CSfpd5Lu1SOUfxzO1wSMpmpS8mZY7abwmkSypUTMOiOokEUWdJCupMMdHVoeFgLLKtm6", // Using sandbox for testing purposes only
            currency: "EUR",
            integrationDate: "2021-07-07"
        })
    ],
    declarations: [ CartComponent ]
})
export class CartModule { }
