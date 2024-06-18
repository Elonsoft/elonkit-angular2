import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ESSidenavService {
  private openedDrawerSubject = new BehaviorSubject<string | null>(null);
  public openedDrawer$ = this.openedDrawerSubject.asObservable();

  public openDrawer(id: string): void {
    if (id) {
      this.openedDrawerSubject.next(id);
    }
  }

  public closeDrawer(): void {
    this.openedDrawerSubject.next(null);
  }
}
