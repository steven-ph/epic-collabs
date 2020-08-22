// Mock pino library and console outputs
const errorSpy = jest.spyOn(console, 'error');
const logSpy = jest.fn();
// @ts-ignore
const actualPino = jest.requireActual('pino');
function mockPino(...args) {
  const thePino = actualPino(...args);
  thePino.trace = logSpy;
  thePino.info = logSpy;
  thePino.debug = logSpy;
  thePino.warn = logSpy;
  thePino.error = logSpy;
  return thePino;
}
Object.assign(mockPino, actualPino);

jest.mock('pino', () => mockPino);

// Get exported library methods after mocking deps
import { logEvent, logger } from '../logger';

describe('#logger', () => {
  let lastLoggedObject;

  beforeEach(() => {
    logSpy.mockClear();
    lastLoggedObject = () => logSpy.mock.calls.pop().pop();
  });
  describe('.logEvent', () => {
    it('logs params if given', () => {
      logEvent({
        level: 'info',
        message: 'testing',
        params: ['foo', 'bar']
      });

      expect(lastLoggedObject()).toEqual(
        expect.objectContaining({
          params: ['foo', 'bar']
        })
      );
    });

    it('writes error for events with invalid level', () => {
      logEvent({
        level: 'ludicrous',
        message: 'testing'
      });

      expect(errorSpy.mock.calls.join()).toEqual(expect.stringMatching(/invalid/));
    });

    it('writes error for events without message', () => {
      logEvent({
        level: 'ludicrous'
      });

      expect(errorSpy.mock.calls.join()).toEqual(expect.stringMatching(/invalid/));
    });

    it('writes error for invalid events', () => {
      logEvent({});

      expect(errorSpy.mock.calls.join()).toEqual(expect.stringMatching(/invalid log event, no message attribute/));
    });
  });

  describe('.logger', () => {
    it('logs event at level with message and any params', () => {
      logger.info('testing', 'foo', 'bar');

      expect(lastLoggedObject()).toEqual(
        expect.objectContaining({
          message: 'testing',
          params: ['foo', 'bar']
        })
      );

      logger.trace('testing', 'foo', 'bar');

      expect(lastLoggedObject()).toEqual(
        expect.objectContaining({
          message: 'testing',
          params: ['foo', 'bar']
        })
      );

      logger.debug('testing', 'foo', 'bar');

      expect(lastLoggedObject()).toEqual(
        expect.objectContaining({
          message: 'testing',
          params: ['foo', 'bar']
        })
      );

      logger.warn('testing', 'foo', 'bar');

      expect(lastLoggedObject()).toEqual(
        expect.objectContaining({
          error: 'foo',
          message: 'testing',
          params: ['bar']
        })
      );
    });

    it('logs first param as error on error/warn', () => {
      const error = new Error('bad thing happen');

      logger.error('oops', error, 'bad param');

      expect(lastLoggedObject()).toEqual(
        expect.objectContaining({
          message: 'oops',
          params: ['bad param'],
          error
        })
      );
    });
  });
});
