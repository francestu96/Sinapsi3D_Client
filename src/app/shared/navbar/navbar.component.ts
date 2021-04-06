import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  public identity: UserModel;

  constructor(
    public location: Location,
    private router: Router,
    private storageSerice: StorageService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.storageSerice.loggedEmitter.subscribe(() => this.identity = this.storageSerice.getIdentity());
  }

  signOut() {
    this.storageSerice.signOut();
    this.router.navigate(['/home']);
  }

  isHome() {
    const title = this.location.prepareExternalUrl(this.location.path());
    if (title === '#/home') {
      return true;
    } else {
      return false;
    }
  }
  isDocumentation() {
    const title = this.location.prepareExternalUrl(this.location.path());
    if (title === '#/documentation') {
      return true;
    } else {
      return false;
    }
  }
}
