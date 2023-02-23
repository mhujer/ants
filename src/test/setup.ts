import '@testing-library/jest-dom';

import * as crypto from 'crypto';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID, crypo.randomUUID is available since node 19
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.crypto = crypto;
