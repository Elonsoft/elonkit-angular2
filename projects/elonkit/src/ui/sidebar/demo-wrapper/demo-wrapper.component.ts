import { Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <div style="height: 100vh; display: flex; gap: 20px; overflow: auto;">
      <es-sidebar
        [color]="color"
        [width]="width"
        [maxWidth]="maxWidth"
        [minWidth]="minWidth"
        [isOpen]="isOpen"
        style="position: sticky; top: 0;">
        <es-sidebar-menu>
          <es-sidebar-item text="CRM" icon="es-24:at-line-w500"></es-sidebar-item>
        </es-sidebar-menu>
        <es-sidebar-toggle (openEvent)="isOpen = $event"></es-sidebar-toggle>
        <es-sidebar-menu>
          <es-sidebar-item (itemClick)="onElementValueClick('Work Time')" icon="es-24:at-line-w500" text="Work Time">
          </es-sidebar-item>
        </es-sidebar-menu>
        <es-sidebar-divider></es-sidebar-divider>

        <es-sidebar-scrollable>
          <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
            <es-sidebar-item
              (itemClick)="onElementValueClick('Projects')"
              [isExpandClickable]="true"
              id="0"
              icon="es-24:at-line-w500"
              text="Projects"
              [selected]="true">
              <ng-template #items>
                <es-sidebar-item (itemClick)="onElementValueClick('Project №0')" text="Project №0" inset></es-sidebar-item>
                <es-sidebar-item (itemClick)="onElementValueClick('Project №1')" text="Project №1" inset></es-sidebar-item>
                <es-sidebar-item
                  (itemClick)="onElementValueClick('Project №2')"
                  text="Project №2"
                  inset
                  [selected]="true"></es-sidebar-item>
                <es-sidebar-item (itemClick)="onElementValueClick('Project №3')" text="Project №3" inset></es-sidebar-item>
                <es-sidebar-item
                  (itemClick)="onElementValueClick('Project №4')"
                  [disabled]="disabled"
                  text="Project №4"
                  inset></es-sidebar-item>
                <es-sidebar-item (itemClick)="onElementValueClick('Project №5')" text="Project №5" inset></es-sidebar-item>
              </ng-template>
            </es-sidebar-item>
            <es-sidebar-item
              (itemClick)="onElementValueClick('Files')"
              [disabled]="disabled"
              id="1"
              icon="es-24:at-line-w500"
              text="Files">
              <ng-template #items>
                <es-sidebar-item [disabled]="disabled" text="File №0" inset></es-sidebar-item>
                <es-sidebar-item [disabled]="disabled" text="File №1" inset></es-sidebar-item>
                <es-sidebar-item [disabled]="disabled" text="File №2" inset></es-sidebar-item>
                <es-sidebar-item [disabled]="disabled" text="File №3" inset></es-sidebar-item>
                <es-sidebar-item [disabled]="disabled" text="File №4" inset></es-sidebar-item>
                <es-sidebar-item [disabled]="disabled" text="File №5" inset></es-sidebar-item>
                <es-sidebar-item [disabled]="disabled" text="File №6" inset></es-sidebar-item>
                <es-sidebar-item [disabled]="disabled" text="File №7" inset></es-sidebar-item>
              </ng-template>
            </es-sidebar-item>
            <es-sidebar-item icon="es-24:at-line-w500" text="Infographic"> </es-sidebar-item>
            <es-sidebar-item icon="es-24:at-line-w500" text="Schedule"> </es-sidebar-item>
            <es-sidebar-item icon="es-24:at-line-w500" text="Messages"> </es-sidebar-item>
            <es-sidebar-item icon="es-24:at-line-w500" text="Inbox"> </es-sidebar-item>
          </es-sidebar-menu>
          <es-sidebar-divider role="after-scroll-content"></es-sidebar-divider>
        </es-sidebar-scrollable>

        <es-sidebar-spacer></es-sidebar-spacer>
        <es-sidebar-menu>
          <es-sidebar-item icon="es-24:magnify-2-line-w500" text="Search"> </es-sidebar-item>
          <es-sidebar-item icon="es-24:bell-line-line-w500" text="Notifications"> </es-sidebar-item>
        </es-sidebar-menu>
        <es-sidebar-divider></es-sidebar-divider>
        <es-sidebar-menu>
          <es-sidebar-item icon="es-24:account-line-w500" text="Name"> </es-sidebar-item>
        </es-sidebar-menu>
      </es-sidebar>
      <div>
        <h2 class="es-h2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
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
  @Input() color: 'default' | 'primary' | 'secondary';
  @Input() width: number;
  @Input() maxWidth: number;
  @Input() minWidth: number;
  @Input() isOpen: boolean;
  @Input() behavior: 'click' | 'hover';
  @Input() exclusive: boolean;
  @Input() disabled: boolean;
  constructor() {}

  public onElementValueClick(value: string): void {
    console.log(`click on ${value}`);
  }
}
