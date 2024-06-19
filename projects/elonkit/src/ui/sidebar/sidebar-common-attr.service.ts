import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ESSidebarCommonAttrService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpenSubject.asObservable();

  public color: 'default' | 'primary' | 'secondary' = 'default';

  public setColor(color: 'default' | 'primary' | 'secondary'): void {
    this.color = color;
    console.log('color in cas: ', color);
  }

  public operateOpenState(isOpen: boolean): void {
    this.isOpenSubject.next(isOpen);
    console.log('open stat in cas: ', isOpen);
  }
}
