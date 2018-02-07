import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-success',
  template: `
    <h2>
      Your submission has been received successfully!
    </h2>
  `,
  styles: []
})
export class SuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
