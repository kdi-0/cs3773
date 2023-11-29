import {
  createLogger,
  format as _format,
  transports as _transports,
} from 'winston';

export const logger = () => {
  const loggy = createLogger({
    level: 'info',
    format: _format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new _transports.File({ filename: 'error.log', level: 'error' }),
      new _transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    loggy.add(
      new _transports.Console({
        format: _format.simple(),
      })
    );
  }

  return loggy;
};
