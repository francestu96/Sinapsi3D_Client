import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { AuthProxy } from 'src/app/services/proxy/auth.proxy';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  errorMessage: string = null;

  focus: boolean;
  focus1: boolean;
  focus2: boolean;

  constructor(
    private authProxy: AuthProxy,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    if (this.isValidForm()) {
        this.authProxy.signup(this.name, this.email, this.password).subscribe(
          (data) => {
            this.storageService.saveToken(data.access_token);
            this.storageService.saveIdentity(data.id_token);
            this.router.navigate([`/home`]);
            this.messageService.success("Registrazione avvenuta con successo");
          },
          (err) => {
            this.errorMessage = err.error.message;
          }
        );
    }
  }

  private isValidForm(): boolean {
    const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.name || !this.email || !this.password) {
        this.errorMessage = 'FORM.FILL';
        return false;
    }
    if (!passRegex.test(this.password)) {
        this.errorMessage = 'FORM.INVALID_PASSWORD';
        return false;
    }
    if (!emailRegex.test(this.email)) {
        this.errorMessage = 'FORM.INVALID_EMAIL';
        return false;
    }

    return true;
  }
}
