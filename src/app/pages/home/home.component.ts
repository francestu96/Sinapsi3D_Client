import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    breakpoint: number;
    album = [];

    constructor(private lightbox: Lightbox) {
        this.breakpoint = (window.innerWidth <= 1000) ? ((window.innerWidth <= 700) ? 1 : 2) : 4;
        for (let i = 1; i <= 8; i++) {    
            this.album.push({
                src: '../../../assets/img/brand/home-pic-3.jpg',
                thumb: '../../../assets/img/brand/home-pic-3.jpg'
            });
        }
    }
    
    onResize(event: any) {
      this.breakpoint = (event.target.innerWidth <= 1000) ? ((event.target.innerWidth <= 700) ? 1 : 2) : 4;
    }

    open(index: number): void {
        this.lightbox.open(this.album, index);
    }
     
    close(): void {
        this.lightbox.close();
    }

    public isElementVisible(element: any): boolean {
        var top = element.offsetTop;
        var left = element.offsetLeft;
        var width = element.offsetWidth;
        var height = element.offsetHeight;
      
        while(element.offsetParent) {
          element = element.offsetParent;
          top += element.offsetTop;
          left += element.offsetLeft;
        }
      
        return (
          top < (window.pageYOffset + window.innerHeight) &&
          left < (window.pageXOffset + window.innerWidth) &&
          (top + height) > window.pageYOffset &&
          (left + width) > window.pageXOffset
        );
    }
}
