export const ACTION_HEADING_STORY_BASIC_SOURCE = {
  html: `
    <es-action-heading>
      <es-heading-breadcrumbs>You / Can / Put / Here / Breadcrumbs</es-heading-breadcrumbs>
      <es-heading-main>
        <es-heading-header
          [maxLines]="3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </es-heading-header>
        <es-heading-actions>
          <button mat-raised-button color="primary">Remove</button>
          <button mat-raised-button>Save</button>
          <button mat-raised-button color="accent">Else</button>
        </es-heading-actions>
      </es-heading-main>
      <es-heading-status>Status: online</es-heading-status>
    </es-action-heading>
  `
};