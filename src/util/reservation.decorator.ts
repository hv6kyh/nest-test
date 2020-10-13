import { SetMetadata } from '@nestjs/common';

export const Reservation = (...args: string[]) => SetMetadata('reservation', args);
