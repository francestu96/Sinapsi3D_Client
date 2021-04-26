import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductModalComponent } from './product-modal.component';

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
		FlexLayoutModule,
		NgImageSliderModule,
        TranslateModule
	],
	declarations: [ProductModalComponent],
	exports: [ProductModalComponent]
})

export class ProductModalModule {}
