import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly categories = signal<Array<{ id: number; title: string }>>([
    { id: 1, title: 'Долгосрочные идеи и цели' },
    { id: 2, title: 'Риски, волатильность, баланс' },
    { id: 3, title: 'Отрасли, рынки, тренды' },
    { id: 4, title: 'Доходы, дивиденды, капитал' }
  ]);
  readonly selectedCategoryId = signal<number>(this.categories()[0]?.id ?? 0);
  readonly selectedCategoryTitle = computed<string>(() => {
    const currentId = this.selectedCategoryId();
    const match = this.categories().find((item) => item.id === currentId);
    return match?.title ?? 'Категория';
  });

  handleCategorySelect(categoryId: number): void {
    if (categoryId === this.selectedCategoryId()) {
      return;
    }
    this.selectedCategoryId.set(categoryId);
  }

  handleCategoryKeyDown(event: KeyboardEvent, categoryId: number): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    this.handleCategorySelect(categoryId);
  }
}
