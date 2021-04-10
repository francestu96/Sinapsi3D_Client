import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
    constructor(private snackBar: MatSnackBar) {}

    success(message: string, action: string = null): MatSnackBarRef<TextOnlySnackBar> {
        return this.snackBar.open(message, action ? action : "Chiudi", {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
        });
    }
    
    error(message: string, action: string = null): MatSnackBarRef<TextOnlySnackBar> {
        return this.snackBar.open("Errore: " + message, action ? action : "Chiudi", {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });
    }

    genericError(): MatSnackBarRef<TextOnlySnackBar> {
        return this.snackBar.open("Errore: se l'errore persiste, sarebbe gentile da parte vostra segnalare l'errore ai nostri contatti. Grazie", "Chiudi", {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });
    }

}
