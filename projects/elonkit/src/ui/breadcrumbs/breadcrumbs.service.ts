import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ESBreadcrumb } from './breadcrumbs.types';

@Injectable({ providedIn: 'root' })
export class ESBreadcrumbsService implements OnDestroy {
  public breadcrumbs$ = new BehaviorSubject<ESBreadcrumb[]>([]);
  public destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getBreadcrumbs();

    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.getBreadcrumbs();
      });
  }

  public ngOnDestroy() {
    this.destroyed$.next();
  }

  private getBreadcrumbs() {
    const breadcrumbs = [];

    let route: ActivatedRoute | null = this.activatedRoute;
    while (route) {
      if (
        (route.routeConfig?.resolve?.['breadcrumb'] || route.routeConfig?.data?.['breadcrumb']) &&
        route.snapshot.data['breadcrumb']
      ) {
        breadcrumbs.push({
          path: this.getPath(route),
          parentPath: this.getPath(route.parent),
          data: route.snapshot.data['breadcrumb'],
        });
      }
      route = route.firstChild;
    }

    this.breadcrumbs$.next(breadcrumbs);
  }

  private getPath(route: ActivatedRoute | null) {
    let path = '';

    while (route) {
      const segment = route.snapshot.url.map((s) => s.path).join('/');
      if (segment) {
        path = `${segment}/${path}`;
      }
      route = route.parent;
    }

    return `/${path}`;
  }
}
