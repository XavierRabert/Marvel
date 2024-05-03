import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Marvel';

  menuOptions = [
    {
      title: 'Characters',
      href: '/characters',
    },
    {
      title: 'Comics',
      href: '/comics',
    },
    {
      title: 'Series',
      href: '/series',
    },
  ];
}
