// ** Nest
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// ** Constants
import { X_CLIENT_DEVICE, X_CLIENT_IP } from 'src/constants/values.constants';

export const IpAndDevice = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const ip = request.headers[X_CLIENT_IP];
    const device = request.headers[X_CLIENT_DEVICE];

    if (!ip || !device)
      throw new BadRequestException(
        `${X_CLIENT_IP} or ${X_CLIENT_DEVICE} header is required`,
      );

    return {
      ip,
      device,
    };
  },
);
