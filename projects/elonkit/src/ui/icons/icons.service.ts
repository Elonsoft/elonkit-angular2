import { Injectable } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const ES_SVG_ICONS: any = {
  'es-empty-state': [
    'bar-chart',
    'bell',
    'box',
    'camera',
    'cart',
    'chat',
    'face',
    'file',
    'filter',
    'image',
    'lock',
    'pie-chart',
    'search',
    'smile',
    'wi-fi',
    'wi-fi-off',
  ] as const,
  'es-audio-player': [
    'check',
    'chevron-left',
    'chevron-right',
    'download',
    'more-vert',
    'mute',
    'pause',
    'play',
    'speed',
    'un-mute',
  ] as const,
  'es-autocomplete-multiple': ['clear-small', 'clear', 'magnify', 'menu-down', 'menu-up'] as const,
};

@Injectable()
export class ESIconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  /**
   * Add svg icons by resource url.
   * @param overrides Path mapping to icons to use instead of built-in ones.
   */
  public register(overrides?: {
    [component in keyof typeof ES_SVG_ICONS]?: {
      [icon in (typeof ES_SVG_ICONS)[component][number]]?: string;
    };
  }) {
    Object.keys(ES_SVG_ICONS).forEach((component) => {
      ES_SVG_ICONS[component].forEach((icon: any) => {
        this.matIconRegistry.addSvgIconInNamespace(
          `${component}`,
          `${icon}`,
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            overrides?.[component]?.[icon] || `./assets/elonkit/${component}/${icon}.svg`
          )
        );
      });
    });
  }
}
