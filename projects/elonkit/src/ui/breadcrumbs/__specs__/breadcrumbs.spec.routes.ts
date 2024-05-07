import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  CategoriesListResolver,
  CategoriesShowBreadcrumbsResolver,
  CategoriesShowResolver,
  ItemsListResolver,
  ItemsShowBreadcrumbsResolver,
  ItemsShowResolver,
} from './breadcrumbs.spec.resolver';

import { ESBreadcrumbsModule, ESBreadcrumbsResolver } from '..';

@Component({
  selector: 'es-breadcrumbs-spec-root',
  template: `
    <div>
      <es-breadcrumbs></es-breadcrumbs>
      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsRootComponent {}

@Component({
  selector: 'es-breadcrumbs-spec-leaf',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsLeafComponent {}

export const ROUTES = [
  {
    path: '',
    data: {
      breadcrumb: { icon: 'home', ariaLabel: 'Home' },
    },
    resolve: {
      breadcrumb: ESBreadcrumbsResolver,
    },
    children: [
      {
        path: '',
        component: BreadcrumbsLeafComponent,
      },
      {
        path: 'categories',
        data: {
          breadcrumb: { label: 'Categories' },
        },
        resolve: {
          data: CategoriesListResolver, // We need to move list resolver one level up in order to use horizontal navigation.
          breadcrumb: ESBreadcrumbsResolver,
        },
        children: [
          {
            path: '',
            component: BreadcrumbsLeafComponent,
          },
          {
            path: ':category',
            resolve: {
              data: CategoriesShowResolver,
              breadcrumb: CategoriesShowBreadcrumbsResolver,
            },
            children: [
              {
                path: '',
                component: BreadcrumbsLeafComponent,
                resolve: {
                  data: ItemsListResolver,
                },
              },
              {
                path: ':item',
                resolve: {
                  data: ItemsShowResolver,
                },
                children: [
                  {
                    path: '',
                    resolve: {
                      breadcrumb: ItemsShowBreadcrumbsResolver,
                    },
                    children: [
                      {
                        path: '',
                        component: BreadcrumbsLeafComponent,
                      },
                      {
                        path: 'edit',
                        component: BreadcrumbsLeafComponent,
                        data: {
                          breadcrumb: { label: 'Edit' },
                        },
                        resolve: {
                          breadcrumb: ESBreadcrumbsResolver,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
