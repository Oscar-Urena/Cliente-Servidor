import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-head',
  imports: [RouterLink],
  templateUrl: './head.html',
  styles: ``,
})
export class Head {
  testClick() {
    console.log('Click funciona!');
  }
}
