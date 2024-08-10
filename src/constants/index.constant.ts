export const profileStorageKey = 'merchstore-user';
export const userStorageKey = 'merchstore-user-full-data';
export const onboardingDataKey = 'merchstore-user-onboarding-data';
export const refreshAuthDataKey = 'merchstore_auth_refresh_state';
export const isClient = typeof window !== 'undefined';
export * from "./api.constant";

export const ALLOWED_IMAGE_UPLOAD_FORMATS = [
    'image/png',
    'image/jpg',
    'image/jpeg',
  ];