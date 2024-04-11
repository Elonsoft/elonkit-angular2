export interface ESBreadcrumbData {
  icon?: string;
  svgIcon?: string;
  label?: string;
  ariaLabel?: string;
}

export interface ESBreadcrumb {
  callback?: () => void;
  data: ESBreadcrumbData;
}
