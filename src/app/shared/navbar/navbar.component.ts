import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/UserModel';
import { TranslateService } from '@ngx-translate/core';

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
  public langIconPaths = new Map<string, string>();
  public selectedLang: string;

  constructor(
    public location: Location,
    private router: Router,
    private storageSerice: StorageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.langIconPaths.set("it-IT", "./assets/img/brand/it-IT.png");
    // this.langIconPaths.set("en-US", "./assets/img/brand/en-US.png");
    // this.langIconPaths.set("fr-FR", "./assets/img/brand/fr-FR.png");
    // this.langIconPaths.set("es-ES", "./assets/img/brand/es-ES.png");

    // this.selectedLang = this.langIconPaths.get(navigator.language);
    this.selectedLang = this.langIconPaths.get("it-IT");

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
    this.storageSerice.authEmitter.subscribe(() => this.identity = this.storageSerice.getIdentity());
    this.identity = this.storageSerice.getIdentity();
  }

  isAdmin(): boolean {
      return this.storageSerice.isAdmin();
  }

  changeLang(lang: string){
      this.translateService.use(lang);
      this.selectedLang = this.langIconPaths.get(lang);
  }

  signOut() {
    this.storageSerice.signOut();
    this.router.navigate(['/home']);
  }
}
