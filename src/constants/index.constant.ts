export const profileStorageKey = 'penta-user';
export const userStorageKey = 'penta-user-full-data';
export const onboardingDataKey = 'penta-user-onboarding-data';
export const refreshAuthDataKey = 'penta_auth_refresh_state';
export const isClient = typeof window !== 'undefined';
export * from "./api.constant";

export const ALLOWED_IMAGE_UPLOAD_FORMATS = [
    'image/png',
    'image/jpg',
    'image/jpeg',
  ];