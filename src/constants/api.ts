export const BASE_URL = process.env.REACT_APP_API_URL;

export const API = {
  base: BASE_URL,
  // student
  login: `${BASE_URL}/api/auth/login`,

  // lecturer
  lecLogin: `${BASE_URL}/api/auth/login`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  changePassword: `${BASE_URL}/api/auth/change-password`,

  // admin
  getPlans: `${BASE_URL}/api/investors/plans`,
  getPlanDetails: `${BASE_URL}/api/investors/plan/:id`,
  // with auth
  adminLogin: `${BASE_URL}/api/v1/auth/admins/login`,
  // verifyPayment: (id: string) => `${BASE_URL}/api/investors/payment/${id}`,
};

export default API;
