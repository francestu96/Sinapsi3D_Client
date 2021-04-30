import { Component, OnInit, Inject, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from './services/translate.service';

var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private _router: Subscription;

    constructor( 
            @Inject(DOCUMENT,)
            private document: any,
            private element : ElementRef, 
            private renderer : Renderer2,
            private router: Router, 
            public location: Location,
            private _translateService: TranslateService,
		    private _translationLoaderService: TranslationLoaderService,
        ) {
        this._translateService.addLangs(['it-IT', 'en-US']);
		this._translateService.setDefaultLang(navigator.language);
		this._translateService.use(navigator.language);
		// this._translateService.setDefaultLang('it-IT');
		// this._translateService.use('it-IT');
        
        this._translationLoaderService.loadTranslations('form');
        this._translationLoaderService.loadTranslations('navbar');
        this._translationLoaderService.loadTranslations('footer');
        this._translationLoaderService.loadTranslations('home');
        this._translationLoaderService.loadTranslations('products');
        this._translationLoaderService.loadTranslations('contacts');
        this._translationLoaderService.loadTranslations('cart');
        this._translationLoaderService.loadTranslations('order');
    }

    @HostListener('window:scroll', ['$event'])
    hasScrolled() {

        var st = window.pageYOffset;
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        var navbar = document.getElementsByTagName('nav')[0];

        // If they scrolled down and are past the navbar, add class .headroom--unpinned.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            if (navbar.classList.contains('headroom--pinned')) {
                navbar.classList.remove('headroom--pinned');
                navbar.classList.add('headroom--unpinned');
            }
            // $('.navbar.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned');
        } else {
            // Scroll Up
            //  $(window).height()
            if(st + window.innerHeight < document.body.scrollHeight) {
                // $('.navbar.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned');
                if (navbar.classList.contains('headroom--unpinned')) {
                    navbar.classList.remove('headroom--unpinned');
                    navbar.classList.add('headroom--pinned');
                }
            }
        }

        lastScrollTop = st;
    };
    ngOnInit() {
      var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
          if (window.outerWidth > 991) {
              window.document.children[0].scrollTop = 0;
          }else{
              window.document.activeElement.scrollTop = 0;
          }
          this.renderer.listen('window', 'scroll', (event) => {
              const number = window.scrollY;
              if (number > 150 || window.pageYOffset > 150) {
                  // add logic
                  navbar.classList.add('headroom--not-top');
              } else {
                  // remove logic
                  navbar.classList.remove('headroom--not-top');
              }
          });
      });
      this.hasScrolled();
    }
}
