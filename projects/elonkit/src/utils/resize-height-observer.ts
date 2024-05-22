// tslint:disable: no-shadowed-variable

import { Observable } from 'rxjs';

export const resizeHeightObserver = (target: HTMLElement) => {
  return new Observable<void>((observer) => {
    let height = target.clientHeight;

    // @ts-ignore
    const resizeObserver = new ResizeObserver((entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.contentRect) {
          if (height !== entry.contentRect.height) {
            height = entry.contentRect.height;
            observer.next();
          }
        }
      });
    });

    resizeObserver.observe(target);

    const unsubscribe = () => {
      resizeObserver.disconnect();
    };

    return unsubscribe;
  });
};
