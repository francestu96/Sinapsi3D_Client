import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFileUploadModule } from 'mat-file-upload';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminProductComponent } from './admin.product.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFileUploadModule
    ],
    declarations: [ AdminProductComponent ],
    providers: [ FormBuilder ]
})
export class AdminProdctModule { }
