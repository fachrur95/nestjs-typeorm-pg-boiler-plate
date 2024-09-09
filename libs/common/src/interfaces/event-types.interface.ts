import { CreateLoggingDto } from '../dto';

export interface EventPayloads {
  'logging.create': CreateLoggingDto;
  'log.create': CreateLoggingDto;
}
