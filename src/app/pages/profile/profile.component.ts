import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/services/message.service';
import { AuthProxy } from 'src/app/services/proxy/auth.proxy';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
  errorMessage: string = null;

  focus: boolean;
  focus1: boolean;

  constructor(
    private authProxy: AuthProxy,
    private translateService: TranslateService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmit(): void {
    const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!this.newPassword || !this.oldPassword || !this.repeatPassword){
      this.errorMessage = 'FORM.FILL';
      return;
    }
    else if (!passRegex.test(this.newPassword)) {
        this.errorMessage = 'FORM.INVALID_PASSWORD';
        return;
    }
    else if (this.newPassword !== this.repeatPassword){
        this.errorMessage = 'FORM.NO_MATCH_PASSWORD';
        return;
    }

    this.authProxy.changePassword(this.oldPassword, this.newPassword).subscribe((data) => {
        this.router.navigate(['/home']);
        this.messageService.success(this.translateService.instant("FORM.PASSWORD_CHANGED"));
      },
      (err) => {
        this.errorMessage =  err.error.message;
      }
    );
  }
}
