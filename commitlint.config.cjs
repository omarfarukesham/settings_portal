/* eslint-env node */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Introduce a new feature
        'fix', // Fix a bug
        'refactor', // Refactor existing code
        'revert', // Reverted to previous code
        'change', // Change the implementation of existing feature
        'chore', // Maintenance, not any specific feature
        'style', // Style update
        'docs', // Updated the doc
        'perf', // Performance improvements
      ],
    ],
  },
};
