import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import {
  BreadcrumbsStoryBasicCategoriesListComponent,
  BreadcrumbsStoryBasicComponent,
  BreadcrumbsStoryBasicHomeComponent,
  BreadcrumbsStoryBasicItemsEditComponent,
  BreadcrumbsStoryBasicItemsListComponent,
  BreadcrumbsStoryBasicItemsShowComponent,
} from './breadcrumbs-story-basic.component';
import {
  CategoriesListResolver,
  CategoriesShowBreadcrumbsResolver,
  CategoriesShowResolver,
  ItemsListResolver,
  ItemsShowBreadcrumbsResolver,
  ItemsShowResolver,
} from './breadcrumbs-story-basic.resolver';
import { CategoriesService, ItemsService } from './breadcrumbs-story-basic.service';

import { ESBreadcrumbsModule, ESBreadcrumbsResolver } from '../..';

const ROUTES = [
  {
    path: '',
    data: {
      breadcrumb: { svgIcon: 'home', ariaLabel: 'Home' },
    },
    resolve: {
      breadcrumb: ESBreadcrumbsResolver,
    },
    children: [
      {
        path: '',
        component: BreadcrumbsStoryBasicHomeComponent,
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
            component: BreadcrumbsStoryBasicCategoriesListComponent,
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
                component: BreadcrumbsStoryBasicItemsListComponent,
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
                        component: BreadcrumbsStoryBasicItemsShowComponent,
                      },
                      {
                        path: 'edit',
                        component: BreadcrumbsStoryBasicItemsEditComponent,
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

@NgModule({
  declarations: [
    BreadcrumbsStoryBasicComponent,
    BreadcrumbsStoryBasicHomeComponent,
    BreadcrumbsStoryBasicCategoriesListComponent,
    BreadcrumbsStoryBasicItemsListComponent,
    BreadcrumbsStoryBasicItemsShowComponent,
    BreadcrumbsStoryBasicItemsEditComponent,
  ],
  imports: [CommonModule, HttpClientModule, ESBreadcrumbsModule, RouterTestingModule.withRoutes(ROUTES)],
  exports: [BreadcrumbsStoryBasicComponent],
  providers: [
    CategoriesService,
    ItemsService,
    CategoriesListResolver,
    CategoriesShowResolver,
    CategoriesShowBreadcrumbsResolver,
    ItemsListResolver,
    ItemsShowResolver,
    ItemsShowBreadcrumbsResolver,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class BreadcrumbsStoryBasicModule {}
