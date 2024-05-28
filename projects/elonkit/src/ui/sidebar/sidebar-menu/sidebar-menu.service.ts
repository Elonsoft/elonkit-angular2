import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ESSidebarMenuService {
  private openedItemsSubject = new BehaviorSubject<string[]>([]);
  public openedItems$ = this.openedItemsSubject.asObservable();

  public behaviour: 'click' | 'hover' = 'click';
  private exclusive = false;

  public setConfig(behaviour: 'click' | 'hover', exclusive: boolean): void {
    this.behaviour = behaviour;
    this.exclusive = exclusive;
  }

  public openItem(id: string): void {
    if (this.exclusive) {
      this.openedItemsSubject.next([id]);
    } else {
      const currentItems = this.openedItemsSubject.getValue();
      if (!currentItems.includes(id)) {
        this.openedItemsSubject.next([...currentItems, id]);
      }
    }
  }

  public closeItem(id: string): void {
    const currentItems = this.openedItemsSubject.getValue();
    this.openedItemsSubject.next(currentItems.filter((item) => item !== id));
  }
}
