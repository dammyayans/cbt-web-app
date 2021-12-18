export const BASE_URL = process.env.REACT_APP_API_URL;
// export const BASE_URL = 'https://.cryptolife.capital';
// API_URL=https://cryptolife-ng.herokuapp.com

export const API = {
  base: BASE_URL,
  // profile
  personalWithNextOfin: `${BASE_URL}/api/auth/profile/details`,
  userInvestmentProfile: `${BASE_URL}/api/auth/profile/investment/info`,
  documentValidation: `${BASE_URL}/api/auth/profile/kyc/details`,
  transactionPin: `${BASE_URL}/api/auth/profile/pin`,
  updateProfilePic: `${BASE_URL}/api/auth/profile/picture`,
  userProfile: `${BASE_URL}/api/auth/me`,
  verifyOtpFull: (otpcode: string) =>
    `${BASE_URL}/api/auth/otp/verify/${otpcode}`,
  verifyOtp: `${BASE_URL}/api/auth/otp/verify`,
  resendOtpEmail: `${BASE_URL}/api/auth/otp/resend/email`,
  resendOtpPassword: `${BASE_URL}/api/auth/otp/resend/phone`,
  // auth
  login: `${BASE_URL}/api/auth/login`,
  registerWithEmail: `${BASE_URL}/api/auth/register`,
  registerUserDetails: `${BASE_URL}/api/auth/register/details`,
  registerWithGoogle: `${BASE_URL}/api/auth/register/google`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${BASE_URL}/api/auth/reset-password`,
  changePassword: `${BASE_URL}/api/auth/change-password`,
  // investor
  // get
  getPlans: `${BASE_URL}/api/investors/plans`,
  getPlanDetails: `${BASE_URL}/api/investors/plan/:id`,
  // with auth
  getInvestorSubscriptions: `${BASE_URL}/api/investors/subscriptions`,
  subscribeToPlan: `${BASE_URL}/api/investors/subscribe/:planid`,
  getTransactions: `${BASE_URL}/api/investors/transactions`,
  getTransactionDetails: `${BASE_URL}/api/investors/transaction/:id`,
  getPaymentWalletAddress: `${BASE_URL}/api/investors/payment/fetch-address`,
  verifyPayment: (id: string) => `${BASE_URL}/api/investors/payment/${id}`,
  initiatePayment: `${BASE_URL}/api/transactions/initiate`,
  userTransactions: `${BASE_URL}/api/transactions`,
  userCompletedTransactions: `${BASE_URL}/api/transactions/completed`,
};

export default API;
