export const API_AUTH_HOST = 'https://auth.ropeafrica.com';
export const API_ACCOUNT_HOST = 'https://account.ropeafrica.com';
export const API_SUB_HOST = 'https://subscription.ropeafrica.com';

export const API = {
  // Auth
  login: '/api/v1/auth/account/login',
  register: '/api/v1/auth/account/sign-up',
  resetPassword: '/api/v1/auth/account/forgot-password',
  changePassword: '/api/v1/auth/account/change-password',
  generateToken: '/api/v1/auth/account/generate-token',
  
  // Account
  createBusiness: '/api/v1/business',

  // Subscription
  getSubscription: '/api/v1/subscription'
};

export default API;