/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  rules: {
    // @see https://eslint.org/docs/rules/curly
    curly: 'error',
    'no-restricted-globals': [
      'error',
      {
        name: '__DEV__',
        message: "Use process.env.NODE_ENV !== 'production' instead",
      },
    ],
  },
};
