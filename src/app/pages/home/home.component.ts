import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    breakpoint: number;
    album1 = [];
    album2 = [];

    constructor(private lightbox: Lightbox) {
        this.breakpoint = (window.innerWidth <= 1000) ? ((window.innerWidth <= 700) ? 1 : 2) : 4;
        this.setAlbums();
    }
    
    onResize(event: any) {
      this.breakpoint = (event.target.innerWidth <= 1000) ? ((event.target.innerWidth <= 700) ? 1 : 2) : 4;
    }

    open(album: any[], index: number): void {
        this.lightbox.open(album, index);
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

    private setAlbums() {
        this.album1 = [
            {
                src: `../../../assets/img/home/1.png`,
                thumb: `../../../assets/img/home/1.png`,
                rows: 2,
                cols: 1
            },
            {
                src: `../../../assets/img/home/2.png`,
                thumb: `../../../assets/img/home/2.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/3.png`,
                thumb: `../../../assets/img/home/3.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/4.png`,
                thumb: `../../../assets/img/home/4.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/5.png`,
                thumb: `../../../assets/img/home/5.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/6.png`,
                thumb: `../../../assets/img/home/6.png`,
                rows: 1,
                cols: 2
            }
            // {
            //     src: `../../../assets/img/home/7.png`,
            //     thumb: `../../../assets/img/home/7.png`,
            //     rows: 1,
            //     cols: 1
            // },
        ];

        this.album2 = [
            {
                src: `../../../assets/img/home/7.png`,
                thumb: `../../../assets/img/home/7.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/8.png`,
                thumb: `../../../assets/img/home/8.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/9.png`,
                thumb: `../../../assets/img/home/9.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/10.png`,
                thumb: `../../../assets/img/home/10.png`,
                rows: 2,
                cols: 1
            },
            {
                src: `../../../assets/img/home/11.png`,
                thumb: `../../../assets/img/home/11.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/12.png`,
                thumb: `../../../assets/img/home/12.png`,
                rows: 1,
                cols: 1
            },
            {
                src: `../../../assets/img/home/13.png`,
                thumb: `../../../assets/img/home/13.png`,
                rows: 1,
                cols: 1
            },
        ];
    }
}
