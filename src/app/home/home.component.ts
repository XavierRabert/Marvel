import { Component, effect, inject } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private subscription!: Subscription;
  isVisible!: boolean;
  constructor(private generalService: GeneralService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.generalService.data$.subscribe(
      (data) => (this.isVisible = data)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickEnter() {
    this.generalService.enter();
    this.router.navigate(['/characters/']);
  }
}
