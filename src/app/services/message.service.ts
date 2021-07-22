import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
    constructor(private snackBar: MatSnackBar, private translateService: TranslateService) {}

    success(message: string, action: string = null): MatSnackBarRef<TextOnlySnackBar> {
        return this.snackBar.open(message, action ? action : this.translateService.instant("FORM.CLOSE"), {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
        });
    }
    
    error(message: string, action: string = null): MatSnackBarRef<TextOnlySnackBar> {
        return this.snackBar.open(this.translateService.instant("FORM.ERROR") + message, action ? action : this.translateService.instant("FORM.CLOSE"), {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });
    }

    genericError(): MatSnackBarRef<TextOnlySnackBar> {
        return this.snackBar.open(this.translateService.instant("FORM.GENERIC_ERROR"), this.translateService.instant("FORM.CLOSE"), {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });
    }

}
