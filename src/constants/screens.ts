type ITypes = 'nid' | 'ip' | 'dl';

const screens = {
  welcome: '/welcome',
  createAccount: '/create-account',
  selectCountry: '/select-country',
  verifyEmail: '/verify-email',
  verifyPhone: '/verify-phone',
  dashboard: 'dashboard',
  home: '/',
  profileHome: '/profile',
  personalInfo: '/profile/personal-info',
  setPin: '/profile/set-pin',
  uploadDocuments: (type = ':type') => `/profile/upload-document/${type}`,
  selectDocumentType: '/profile/select-document',
  userDetails: '/profile/user-details',
  planSuccess: '/plan/success',
  plan: '/plan',
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  report: '/report',
  // settings
  settings: '/settings',
  accountSettings: '/settings/account',
  bankAndWalletDetails: `/settings/account/bank-and-wallet-details`,
  updateTransactionPin: '/settings/account/update-transaction-pin',
  updatePassword: '/settings/account/update-password',
  updateKYC: '/settings/account/update-kyc',
  taxDocuments: '/settings/account/tax-documents',
  profileSettings: '/settings/profile',
  updateDocuments: (type = ':type' as ITypes) =>
    `/settings/account/update-kyc/${type}`,
};
export default screens;
