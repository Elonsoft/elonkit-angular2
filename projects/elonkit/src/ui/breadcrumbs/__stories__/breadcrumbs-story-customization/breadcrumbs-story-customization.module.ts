import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MatIconModule } from '@angular/material/icon';

import { BreadcrumbsStoryCustomizationComponent } from './breadcrumbs-story-customization.component';

import { ESBreadcrumbsModule, ESBreadcrumbsResolver } from '../..';
import {
  BreadcrumbsStoryBasicCategoriesListComponent,
  BreadcrumbsStoryBasicHomeComponent,
  BreadcrumbsStoryBasicItemsEditComponent,
  BreadcrumbsStoryBasicItemsListComponent,
  BreadcrumbsStoryBasicItemsShowComponent,
} from '../breadcrumbs-story-basic/breadcrumbs-story-basic.component';
import {
  CategoriesListResolver,
  CategoriesShowBreadcrumbsResolver,
  CategoriesShowResolver,
  ItemsListResolver,
  ItemsShowBreadcrumbsResolver,
  ItemsShowResolver,
} from '../breadcrumbs-story-basic/breadcrumbs-story-basic.resolver';
import { CategoriesService, ItemsService } from '../breadcrumbs-story-basic/breadcrumbs-story-basic.service';

const ROUTES = [
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
    BreadcrumbsStoryCustomizationComponent,
    BreadcrumbsStoryBasicHomeComponent,
    BreadcrumbsStoryBasicCategoriesListComponent,
    BreadcrumbsStoryBasicItemsListComponent,
    BreadcrumbsStoryBasicItemsShowComponent,
    BreadcrumbsStoryBasicItemsEditComponent,
  ],
  imports: [CommonModule, HttpClientModule, MatIconModule, ESBreadcrumbsModule, RouterTestingModule.withRoutes(ROUTES)],
  exports: [BreadcrumbsStoryCustomizationComponent],
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
export class BreadcrumbsStoryCustomizationModule {}
