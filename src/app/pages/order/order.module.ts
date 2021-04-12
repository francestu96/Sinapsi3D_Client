import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { OrderComponent } from './order.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // RouterModule,
        FlexLayoutModule,
        MatIconModule,
        // MatInputModule,
        // MatFormFieldModule,
        // MatButtonModule,
        // MatTooltipModule,
        // ProductModalModule
    ],
    declarations: [ OrderComponent ],
    exports: [ OrderComponent ]
})
export class OrderModule { }