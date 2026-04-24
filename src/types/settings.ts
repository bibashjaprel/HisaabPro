export type CurrencyCode = 'NPR';

export interface Settings {
  userName: string;
  currency: CurrencyCode;
  onboardingCompleted: boolean;
  darkModeEnabled: boolean;
}
