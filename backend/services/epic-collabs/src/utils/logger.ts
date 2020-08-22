import pino from 'pino';

const serviceLog = pino();

/** Supported log levels. */
const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

/**
 * Declaritive interface for log event.
 * @param {Object} details           - event attributes
 * @param {string} details.level     - trace|debug|info|warn|error|fatal
 * @param {string} details.message   - event description
 * @param {array} [details.error]    - error object
 * @param {array} [details.params]   - event parameters
 */
const logEvent = details => {
  if (typeof details.message === 'undefined') {
    return console.error(`invalid log event, no message attribute: ${JSON.stringify(details)}`);
  }
  if (!levels.includes(details.level)) {
    return console.error(`logger called with invalid level: ${details.level}`);
  }

  return serviceLog[details.level](details);
};

/** Simple interface for log events, assumes default scope. */
const logger = {
  trace: (message, ...params) => logEvent({ level: 'trace', message, params }),
  debug: (message, ...params) => logEvent({ level: 'debug', message, params }),
  info: (message, ...params) => logEvent({ level: 'info', message, params }),
  warn: (message, error, ...params) => logEvent({ level: 'warn', message, error, params }),
  error: (message, error, ...params) => logEvent({ level: 'error', message, error, params })
};

export { logger };
