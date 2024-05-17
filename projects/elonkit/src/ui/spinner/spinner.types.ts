export type ESSpinnerEaseType = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
export type ESSpinnerVariant = 'ring' | 'fadingRing' | 'fadingDoubleRing' | 'dashRing' | 'fadingDots' | 'fadingBars';

export interface ESSpinnerDefaultOptions {
  variant: ESSpinnerVariant;
  size?: number;
  color?: string;
  duration?: number;
  ease?: ESSpinnerEaseType;
}
