export const API_AUTH_HOST = 'https://penta.ropeafrica.com/auth';
export const API_ACCOUNT_HOST = 'https://penta.ropeafrica.com/accounts';
export const API_SUB_HOST = 'https://penta.ropeafrica.com/subscriptions';

export const API = {
  // Auth
  login: '/account/login',
  register: '/account/sign-up',
  resetPassword: '/api/v1/auth/account/forgot-password',
  changePassword: '/api/v1/auth/account/change-password',
  generateToken: '/api/v1/auth/account/generate-token',
  verifyOtp: '/api/v1/auth/account/verify-otp',
  
  // Account
  createBusiness: '/business',

  // Subscription
  getSubscription: '/subscription',

  // Upload
  upload: '/file/upload',

  // Branch
  branch: '/branch',

  // Account Update
  updateAccountProfile: '/account',
  updateCompany: '/account/company-settings',

  // Tracker
  track: '/onboard-tracker'
};

export default API;