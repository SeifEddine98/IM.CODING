import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-begin',
  templateUrl: './menu-begin.component.html',
  styleUrls: ['./menu-begin.component.css']
})
export class MenuBeginComponent {
  isShown = true;
  isShown2 = false;
  Redirect()
  {
      this.isShown=false;
      this.isShown2=true;
  }
}
