import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="row">
    <div class="col-md-6 col-md-offset-3">

      
      <router-outlet></router-outlet>      

      <hr>
    </div>
  </div>
</div>`
})
export class AppComponent {
  title = 'app';
  public mssg: string = 'Hiiiii';
  onSubmit(form) {
    console.log(form.value);
  }
}
