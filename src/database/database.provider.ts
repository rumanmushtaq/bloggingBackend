// ** Nest js
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// ** Modules
import { ConfigModule } from 'src/config/config.module';

// ** Entities schema
import { ENTITIES } from './entities';

export const DatabaseProvider = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('DB_URL'),
    }),
  }),
  MongooseModule.forFeature(ENTITIES),
];
