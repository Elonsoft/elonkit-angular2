import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { delay, switchMap, takeUntil } from 'rxjs/operators';

@Injectable()
export class ESSidenavService {
  private openedDrawerSubject = new BehaviorSubject<string | null>('');
  private cancelCloseSubject = new Subject<void>();

  public openedDrawer$ = this.openedDrawerSubject.asObservable().pipe(
    switchMap((val) => {
      if (val === null) {
        return of(val).pipe(delay(200), takeUntil(this.cancelCloseSubject));
      } else {
        return of(val);
      }
    })
  );

  private selectedPageSubject = new BehaviorSubject<string>('');
  public selectedPage$ = this.selectedPageSubject.asObservable();

  public selectPage(id: string): void {
    if (id) {
      this.selectedPageSubject.next(id);
    }
  }

  public openDrawer(id: string): void {
    if (id) {
      this.cancelCloseSubject.next();
      this.openedDrawerSubject.next(id);
    }
  }

  public closeDrawer(): void {
    this.openedDrawerSubject.next(null);
  }
}
