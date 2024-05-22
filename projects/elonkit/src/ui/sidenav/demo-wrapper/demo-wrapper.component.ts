import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 100vh; display: flex; gap: 20px; overflow: auto;">
      <es-sidenav
        [isOpen]="isOpen"
        (selectedPageEvent)="onElementSelect($event)"
        (closeEvent)="onCloseEvent($event)"
        [disableEscapeKeyDown]="disableEscapeKeyDown"
        [disableItemHover]="disableItemHover">
        <es-sidebar id="rail" [color]="color">
          <es-sidebar-menu>
            <es-sidenav-item
              (itemClick)="onSidenavItemClick($event)"
              [selected]="getSelectedStatus('empty')"
              icon="es-24:at-line-w500"
              [color]="color"
              text="Tootip text"></es-sidenav-item>
          </es-sidebar-menu>
          <es-sidebar-toggle (openEvent)="isOpen = $event" [isOpen]="isOpen"></es-sidebar-toggle>
          <es-sidebar-menu>
            <es-sidenav-item
              id="projects"
              (itemClick)="onSidenavItemClick($event)"
              [selected]="getSelectedStatus('projects')"
              icon="es-24:at-line-w500"
              [color]="color"></es-sidenav-item>
            <es-sidenav-item
              id="reports"
              (itemClick)="onSidenavItemClick($event)"
              [selected]="getSelectedStatus('reports')"
              icon="es-24:at-line-w500"
              [color]="color"></es-sidenav-item>
          </es-sidebar-menu>
          <es-sidebar-spacer></es-sidebar-spacer>
          <es-sidebar-divider></es-sidebar-divider>
          <es-sidebar-menu>
            <es-sidenav-item icon="es-24:at-line-w500" [color]="color"></es-sidenav-item>
          </es-sidebar-menu>
        </es-sidebar>

        <es-sidebar
          id="drawer"
          color="default"
          (widthChange)="resize($event)"
          (widthChangeCommit)="resizeEnd()"
          [width]="width"
          [maxWidth]="maxWidth"
          [minWidth]="minWidth"
          [isOpen]="true">
          <ng-container [ngSwitch]="selectedPage ? selectedPage : '1'">
            <ng-container *ngSwitchCase="'projects'">
              <div style="margin-bottom: 24px;">
                <h6 class="es-h6" style="padding: 16px;">Projects</h6>
                <es-sidebar-divider />
              </div>

              <es-sidebar-scrollable>
                <div class="es-caption" style="padding: 0 16px; flex-shrink: 0; opacity: .75;">Favorites</div>
                <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
                  <es-sidebar-item icon="es-24:at-line-w500" text="All projects"></es-sidebar-item>
                  <es-sidebar-item id="1" icon="es-24:list-alt-line-w500" text="Documents">
                    <ng-template #items>
                      <es-sidebar-item [inset]="true" text="Document #1"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Document #2"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Document #3"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Document #4"></es-sidebar-item>
                    </ng-template>
                  </es-sidebar-item>
                  <es-sidebar-item id="2" icon="es-24:view-kanban" text="New projects">
                    <ng-template #items>
                      <es-sidebar-item [inset]="true" text="New project #1"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="New project #2"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="New project #3"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="New project #4"></es-sidebar-item>
                    </ng-template>
                  </es-sidebar-item>
                </es-sidebar-menu>

                <div class="es-caption" style="padding: 0 16px; flex-shrink: 0; opacity: .75;">Current projects</div>
                <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
                  <es-sidebar-item icon="es-24:view-kanban" text="Current project 1#"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current project 2#"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current project 3#"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current project 4#"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current project 5#"></es-sidebar-item>
                </es-sidebar-menu>
              </es-sidebar-scrollable>
            </ng-container>

            <ng-container *ngSwitchCase="'reports'">
              <div style="margin-bottom: 24px;">
                <h6 class="es-h6" style="padding: 16px;">Reports</h6>
                <es-sidebar-divider />
              </div>

              <es-sidebar-scrollable>
                <div class="es-caption" style="padding: 0 16px; flex-shrink: 0; opacity: .75;">Favorites</div>
                <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
                  <es-sidebar-item icon="es-24:at-line-w500" text="All reports"></es-sidebar-item>
                  <es-sidebar-item id="3" icon="es-24:list-alt-line-w500" text="Saved reports">
                    <ng-template #items>
                      <es-sidebar-item [inset]="true" text="Saved report #1"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Saved report #2"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Saved report #3"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Saved report #4"></es-sidebar-item>
                    </ng-template>
                  </es-sidebar-item>
                  <es-sidebar-item id="4" icon="es-24:view-kanban" text="Planned reports">
                    <ng-template #items>
                      <es-sidebar-item [inset]="true" text="Planned report #1"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Planned report #2"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Planned report #3"></es-sidebar-item>
                      <es-sidebar-item [inset]="true" text="Planned report #4"></es-sidebar-item>
                    </ng-template>
                  </es-sidebar-item>
                </es-sidebar-menu>

                <div class="es-caption" style="padding: 0 16px; flex-shrink: 0; opacity: .75;">Current reports</div>
                <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
                  <es-sidebar-item icon="es-24:view-kanban" text="Current report #1"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current report #2"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current report #3"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current report #4"></es-sidebar-item>
                  <es-sidebar-item icon="es-24:view-kanban" text="Current report #5"></es-sidebar-item>
                </es-sidebar-menu>
              </es-sidebar-scrollable>
            </ng-container>
          </ng-container>
        </es-sidebar>
      </es-sidenav>
      <div
        [ngStyle]="{
          'padding-left': isOpen ? this.width + 'px' : '0px',
          transition: (inResize$ | async) ? 'none' : 'padding-left 200ms ease'
        }">
        <h2 class="es-h3">{{ selectedPage }}</h2>
        <br />
        <p class="es-body-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nihil quibusdam natus dolore suscipit deleniti? Alias quod
          veritatis odit ipsa nam ipsum atque placeat voluptates, molestias ipsam, necessitatibus facilis provident consequuntur
          beatae! Aut incidunt non debitis, nesciunt necessitatibus ex praesentium error tenetur veniam velit fugiat ullam quas
          similique impedit eveniet. Consectetur sint sunt cumque molestiae quos rem autem fugiat. Perferendis eveniet facilis
          porro necessitatibus at. Voluptate maxime omnis dolore ipsum rerum? Dolorum voluptatibus atque perspiciatis incidunt
          non, iusto, officiis consequuntur harum aperiam doloribus, veritatis quo dignissimos ratione ex magni quaerat!
        </p>

        <br />
        <p class="es-body-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsa sint, eos quidem, pariatur obcaecati culpa
          voluptas ducimus ad velit deleniti, nostrum facere voluptatum id odit facilis? Nostrum minima vitae accusantium
          reprehenderit, tempora quo saepe eligendi assumenda tenetur vero quasi alias esse sunt quod veniam consectetur nemo
          beatae accusamus delectus odit impedit exercitationem laudantium ipsum. Repellat vitae nisi voluptatibus ea in rerum
          eaque perferendis doloribus, dolores corrupti ipsam illum recusandae maxime nihil sit sed delectus commodi obcaecati
          consequuntur non enim doloremque error tempore. Ea sequi, ipsa, hic temporibus eveniet ipsam eius libero accusamus
          quaerat harum, iste recusandae! Maiores assumenda illum labore? Nihil ipsam dolores error, cum sunt, harum architecto
          hic ex quibusdam nobis cumque laboriosam rerum tempore quo, ut magni aspernatur! Quo nihil exercitationem consequatur
          eius distinctio assumenda, repellat hic. Vel, velit eius facere repudiandae dicta earum doloribus, et aliquam,
          perspiciatis vitae obcaecati. At, autem placeat maiores molestias neque voluptatum!
        </p>

        <br />
        <p class="es-body-100">
          I want to say something very important. I want to say a very important thing. Many people are starting to buy knives
          instead of cutting carrots, potatoes... Or... Eggplants are being sold, they're being bought up. ..to buy MIXERS! It's
          going on, because there's a lot of enthusiasm for MIXERS. Mixers are appearing now, and young tomboys, who are running
          in easy packs in the yards. They also want to buy this mixer to mix everything, as they say, because no, this tradition
          is already gone, a fine tradition, when you take carrots, potatoes, eggplants, or take more, for example, more marcels,
          for example, green ones, and these old people gather somewhere in the kitchen, and if you like in the kitchen, if you
          like in the kitchen, people gather and quietly do everything with their hands. From this mixer came MIX-Culture.
          MIX-Culture is cut in underground clubs, where young people go nowadays. Look around you! Their faces have already
          become as round as the moon from beer, because it's beer, it's not just water. It's beer - it's made with the help of a
          mixer and everything is mixed with this mixer. Mixing is done with a mixer now: any kind of things. And in underground
          clubs everything is mixed. It's stirring, they don't chop quietly, the knife is small, there are bigger knives on sale
          now. You need them. And cut these things properly, because there's mixing of mixers, underground. Look at the people
          around here! They're all mixed up in their heads. They've got their heads all messed up... They've got their heads all
          messed up. We have to tell everyone, and tell the bear to give us the bear and tell the horses to give us the bones.
          We'll make a house out of the bones. We'll put lard on the house before the mixer. This mixer, as soon as I saw the
          picture, I ran away!...Thank you.
        </p>
      </div>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() disableEscapeKeyDown: boolean;
  @Input() disableItemHover: boolean;
  @Input() color: 'default' | 'primary' | 'secondary';
  @Input() width: number;
  @Input() maxWidth: number;
  @Input() minWidth: number;
  @Input() isOpen: boolean;
  @Input() behavior: 'click' | 'hover';
  @Input() exclusive: boolean;
  @Input() disabled: boolean;

  public selectedPage = 'projects';

  public inResize = false;
  public inResize$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  public onCloseEvent(close: boolean): void {
    console.log('event:', close);
    this.isOpen = false;
  }

  public onElementSelect(value: string | null): void {
    if (value) {
      this.selectedPage = value;
    }
  }

  public getSelectedStatus(page: string): boolean {
    return this.selectedPage === page;
  }

  public resize(resizeEvent: number): void {
    this.width = resizeEvent;
    this.inResize = true;
    this.inResize$.next(this.inResize);
  }

  public resizeEnd(): void {
    this.inResize = false;
    this.inResize$.next(this.inResize);
  }

  public onSidenavItemClick(id: string | null): void {
    console.log('click on sidenav item', id ? 'with id ' + id : 'without id');
  }
}
