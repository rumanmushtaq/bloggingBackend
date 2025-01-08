import { OtpEntity, OtpSchema } from 'src/app/auth/entities/otp.entity';
import {
  SessionHistoryEntity,
  SessionHistorySchema,
} from 'src/app/auth/entities/session-history.entity';
import { BlogEntity, BlogSchema } from 'src/app/blog/entities/blog.entity';
import {
  BlogDistributionEntity,
  BlogDistributionSchema,
} from 'src/app/blog/entities/blogDistribution.entity';
import {
  CategoryEntity,
  CategorySchema,
} from 'src/app/category/category.entity';
import { ModuleEntity, ModuleSchema } from 'src/app/module/module.entity';
import {
  PermissionEntity,
  PermissionSchema,
} from 'src/app/permission/permission.entity';
import { RoleEntity, RoleSchema } from 'src/app/role/role.entity';
import { SiteEntity, SiteSchema } from 'src/app/site/entities/site.entity';
import { StaffEntity, StaffSchema } from 'src/app/staff/staff.entity';
import { UserEntity, UserSchema } from 'src/app/user/user.entity';

// ** Entities
export const ENTITIES = [
  { name: OtpEntity.name, schema: OtpSchema },
  { name: BlogEntity.name, schema: BlogSchema },
  { name: BlogDistributionEntity.name, schema: BlogDistributionSchema },
  { name: CategoryEntity.name, schema: CategorySchema },
  { name: ModuleEntity.name, schema: ModuleSchema },
  { name: PermissionEntity.name, schema: PermissionSchema },
  { name: RoleEntity.name, schema: RoleSchema },
  { name: SiteEntity.name, schema: SiteSchema },
  { name: StaffEntity.name, schema: StaffSchema },
  { name: UserEntity.name, schema: UserSchema },
  { name: SessionHistoryEntity.name, schema: SessionHistorySchema },
];
