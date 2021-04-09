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

import { HomeComponent } from './home.component';

import { SectionsModule } from '../../sections/sections.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductModalModule } from '../product-modal/product-modal.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
        ProductModalModule
    ],
    declarations: [ HomeComponent ],
    exports: [ HomeComponent ],
    entryComponents: [ ProductModalComponent ]
})
export class HomeModule { }
