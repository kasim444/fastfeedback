import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { stream, send } = logflarePinoVercel({
  apiKey: 'wDKE8nnMJ_ON',
  sourceToken: '508a5ffe-aaba-43c6-ae3e-38a2726b9705'
});

const logger = pino(
  {
    browser: {
      transmit: {
        send: send
      }
    },
    level: 'debug',
    base: {
      env: process.env.NODE_ENV || 'NODE_ENV not set',
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA
    }
  },
  stream
);

const formatObjectKeys = (headers) => {
  const keyValues = {};
  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, '_');
    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

export { logger, formatObjectKeys };
