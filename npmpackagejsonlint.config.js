const error = 'error';

module.exports = {
  extends: 'npm-package-json-lint-config-default',
  rules: {
    'prefer-absolute-version-dependencies': error,
    'prefer-absolute-version-devDependencies': error,
    'prefer-alphabetical-dependencies': error,
    'prefer-alphabetical-devDependencies': error,
    'require-engines': error,
  },
};
