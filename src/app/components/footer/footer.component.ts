import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 constructor() {

 }
 ngOnInit(): void {
       
  function anyo():HTMLSpanElement {
    let anyo:number = 0;
    let anyoContainer: HTMLSpanElement = document.querySelector('#year') as HTMLSpanElement;
    window.addEventListener('DOMContentLoaded', () => {
      anyo = new Date().getFullYear();
      anyoContainer.innerHTML = anyo.toString();
    });
    return anyoContainer;
  }
  
  anyo();

  
 }
}
