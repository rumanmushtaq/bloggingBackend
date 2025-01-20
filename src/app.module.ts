import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { BlogModule } from './app/blog/blog.module';
import { CategoryModule } from './app/category/category.module';
import { ModuleModule } from './app/module/module.module';
import { PermissionModule } from './app/permission/permission.module';
import { RoleModule } from './app/role/role.module';
import { SiteModule } from './app/site/site.module';
import { StaffModule } from './app/staff/staff.module';
import { UserModule } from './app/user/user.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    SharedModule,
    ModuleModule,
    RoleModule,
    PermissionModule,
    BlogModule,
    CategoryModule,
    StaffModule,
    SiteModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // ensure 'public' directory exists here
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
