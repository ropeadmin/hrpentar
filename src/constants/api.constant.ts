export const API_AUTH_HOST = 'https://auth.ropeafrica.com';
export const API_ACCOUNT_HOST = 'https://account.ropeafrica.com';

export const API = {
  // Auth
  login: '/api/v1/auth/account/login',
  register: '/api/v1/account',
  resetPassword: '/api/v1/auth/account/forgot-password',
  changePassword: '/api/v1/auth/account/change-password',
  generateToken: '/api/v1/auth/account/generate-token',
};

export default API;