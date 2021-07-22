import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/services/message.service';
import { AuthProxy } from 'src/app/services/proxy/auth.proxy';
import { StorageService } from '../../services/storage.service';
import { PasswordForgotModalComponent } from './password-forgot-modal/password-forgot-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string = null;

  focus: boolean;
  focus1: boolean;

  constructor(
    private authProxy: AuthProxy,
    private translateService: TranslateService,
    private messageService: MessageService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog 
  ) {}

  onSubmit(): void {
    if (!this.email || ! this.password){
      this.errorMessage = 'FORM.INVALID';
      return;
    }
    this.authProxy.signin(this.email, this.password).subscribe((data) => {
        this.storageService.saveToken(data.access_token);
        this.storageService.saveIdentity(data.id_token);
        this.router.navigate(['/home']);
        this.messageService.success(this.translateService.instant("FORM.LOGIN_SUCCESS"));
      },
      (err) => {
        this.errorMessage =  err.error.message;
      }
    );
  }

    openDialog(): void {
        const dialogRef = this.dialog.open(PasswordForgotModalComponent, { width: "600px" });

        
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigate(['/home']);
                this.messageService.success("FORM.RESET_PASS");
            }
        });
    }
}
