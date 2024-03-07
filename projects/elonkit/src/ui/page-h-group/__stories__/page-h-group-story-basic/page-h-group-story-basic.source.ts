export const PAGE_H_GROUP_STORY_BASIC_SOURCE = {
  html: `
    <es-page-h-group>
      <es-page-h-group-breadcrumbs>You / Can / Put / Here / Breadcrumbs</es-page-h-group-breadcrumbs>
      <es-page-h-group-main>
        <es-page-h-group-heading
          [maxLines]="3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </es-page-h-group-heading>
        <es-page-h-group-actions>
          <button mat-raised-button color="primary">Remove</button>
          <button mat-raised-button>Save</button>
          <button mat-raised-button color="accent">Else</button>
        </es-page-h-group-actions>
      </es-page-h-group-main>
      <es-page-h-group-status>Status: online</es-page-h-group-status>
    </es-page-h-group>
  `,
};
