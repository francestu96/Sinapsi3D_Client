import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    if (this.isValidForm()) {
        this.authService.signup(this.name, this.email, this.password).subscribe(
          (data) => {
            this.storageService.saveToken(data.access_token);
            this.storageService.saveIdentity(data.id_token);
            this.router.navigate([`/home`]);
          },
          (err) => {
            this.errorMessage = err.error.message;
          }
        );
    }
  }

  private isValidForm(): boolean {
    const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.\?\/~_\+\-=|]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.name || !this.email || !this.password) {
        this.errorMessage = 'Compilare tutti i campi';
        return false;
    }
    if (!passRegex.test(this.password)) {
        this.errorMessage = 'Password non valida';
        return false;
    }
    if (!emailRegex.test(this.email)) {
        this.errorMessage = 'Email non valida';
        return false;
    }

    return true;
  }
}
