export const API_AUTH_HOST = 'https://www.penta.ropeafrica.com';
export const API_ACCOUNT_HOST = 'https://www.penta.ropeafrica.com/accounts';
export const API_SUB_HOST = 'https://www.penta.ropeafrica.com/subscription';

export const API = {
  // Auth
  login: '/api/v1/auth/account/login',
  register: '/auth/account/sign-up',
  resetPassword: '/api/v1/auth/account/forgot-password',
  changePassword: '/api/v1/auth/account/change-password',
  generateToken: '/api/v1/auth/account/generate-token',
  verifyOtp: '/api/v1/auth/account/verify-otp',
  
  // Account
  createBusiness: '/api/v1/business',

  // Subscription
  getSubscription: '/api/v1/subscription',

  // Upload
  upload: '/api/v1/file/upload',

  // Branch
  branch: '/api/v1/branch',

  // Account Update
  updateAccountProfile: '/api/v1/account'
};

export default API;