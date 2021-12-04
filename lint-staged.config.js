module.exports = {
  '*.@(js|ts|tsx)': [
    filenames => `eslint --cache --fix ${filenames.join(' ')}`,
  ],
  //   '*.{ts,tsx,js}': 'eslint --cache --fix',
  '*.{js,css,md}': 'prettier --write',
  //   '*.js': 'eslint --cache --fix',
};
