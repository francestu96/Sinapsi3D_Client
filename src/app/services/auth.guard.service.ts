import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private storageSerivce: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (!this.storageSerivce.getIdentity()) {
      this.storageSerivce.signOut();
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
