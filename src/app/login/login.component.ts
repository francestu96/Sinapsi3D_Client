import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string = null;

  focus: boolean;
  focus1: boolean;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.email || ! this.password){
      this.errorMessage = 'Inserire credenziali valide';
      return;
    }
    this.authService.signin(this.email, this.password).subscribe((data) => {
        this.storageService.saveToken(data.access_token);
        this.storageService.saveUser(data.id_token);
      },
      (err) => {
        this.errorMessage =  err.error.message;
      }
    );
  }
}
