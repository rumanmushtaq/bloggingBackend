// ** Nest
import { Module } from '@nestjs/common';

// ** Services
import { StaffService } from './staff.service';
import { StaffQueries } from './staff.query';
import { StaffController } from './staff.controller';

@Module({
  providers: [StaffService, StaffQueries],
  exports: [StaffService, StaffQueries],
  controllers: [StaffController],
})
export class StaffModule {}
