import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthProxy } from 'src/app/services/proxy/auth.proxy';

@Component({
	selector: 'password-forgot-modal',
	templateUrl: './password-forgot-modal.component.html',
})
export class PasswordForgotModalComponent {
    isLoading: boolean;
	email: string;
    errorMessage: string = null;

    focus: boolean;
    focus1: boolean;

	constructor(
		public dialogRef: MatDialogRef<PasswordForgotModalComponent>,
        private authProxy: AuthProxy
	) {	}

    onSubmit(): void {
        if (!this.email){
          this.errorMessage = 'Inserire una email';
          return;
        }
        this.isLoading = true;
        this.authProxy.passwordForgot(this.email).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close(true);
          },
          (err) => {
            this.errorMessage =  err.error.message;
            this.isLoading = false;
          }
        );
      }
}
