import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit(): void {
    const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!this.newPassword || !this.oldPassword || !this.repeatPassword){
      this.errorMessage = 'Compilare tutti i campi';
      return;
    }
    else if (!passRegex.test(this.newPassword)) {
        this.errorMessage = 'Password non valida';
        return;
    }
    else if (this.newPassword !== this.repeatPassword){
        this.errorMessage = 'Le password non corrispondono!';
        return;
    }

    this.authProxy.changePassword(this.route.snapshot.paramMap.get('userId'), this.oldPassword, this.newPassword).subscribe((data) => {
        this.router.navigate(['/home']);
        this.messageService.success("Password cambiata con successo");
      },
      (err) => {
        this.errorMessage =  err.error.message;
      }
    );
  }
}
