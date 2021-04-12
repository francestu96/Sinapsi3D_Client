import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    constructor() {}

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
