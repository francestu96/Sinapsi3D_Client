import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class AuthAdminGuardService implements CanActivate {
  constructor(private storageSerivce: StorageService, private router: Router) {}

  canActivate(): boolean {
    return this.storageSerivce.getIdentity().roles.includes("admin");
  }
}
