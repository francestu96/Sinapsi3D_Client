import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PasswordForgotModalComponent } from './password-forgot-modal.component';

@NgModule({
	imports: [
		MatIconModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatOptionModule,
		MatInputModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatButtonModule,
		MatDialogModule,
		CommonModule,
        FormsModule
	],
	declarations: [ PasswordForgotModalComponent ],
	exports: [ PasswordForgotModalComponent ]
})

export class PasswordForgotModalModule {}
