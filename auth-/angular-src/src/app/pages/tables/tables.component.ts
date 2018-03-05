import { Component } from '@angular/core';

@Component({
  selector: 'ngx-tables',
  template: `<router-outlet></router-outlet>`,
})
export class TablesComponent {
  constructor(){
    console.log('Inside tables parent constructor');
  }
}
