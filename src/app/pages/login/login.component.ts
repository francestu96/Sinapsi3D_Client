import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProxy } from 'src/app/services/proxy/auth.proxy';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string = null;

  focus: boolean;
  focus1: boolean;

  constructor(
    private authProxy: AuthProxy,
    private storageService: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.email || ! this.password){
      this.errorMessage = 'Inserire credenziali valide';
      return;
    }
    this.authProxy.signin(this.email, this.password).subscribe((data) => {
        this.storageService.saveToken(data.access_token);
        this.storageService.saveIdentity(data.id_token);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.errorMessage =  err.error.message;
      }
    );
  }
}
