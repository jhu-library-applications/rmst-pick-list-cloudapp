import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-button',
  templateUrl: './print-button.component.html',
  styleUrls: ['./print-button.component.scss']
})
export class PrintButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  print() {
    window.print();
  }
}
