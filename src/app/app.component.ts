import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneralService } from './services/general.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private _generalService = inject(GeneralService);

  title = 'Marvel';

  private subscription!: Subscription;
  isVisible!: boolean;

  public apiDeprecated = this._generalService.apiDeprecated;

  ngOnInit(): void {
    this.subscription = this._generalService.data$.subscribe(
      (data) => (this.isVisible = data),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
