import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public mssg: string = 'Hiiiii';

  onSubmit(form) {
    console.log(form.value);
  }
}
