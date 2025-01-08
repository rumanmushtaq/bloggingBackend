// ** Nest js
import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';

@Global()
@Module({
  imports: [...DatabaseProvider],
  exports: [...DatabaseProvider],
})
export class DatabaseModule {}
