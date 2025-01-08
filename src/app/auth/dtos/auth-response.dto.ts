import { StaffDocument, StaffEntity } from 'src/app/staff/staff.entity';
import { UserDocument, UserEntity } from 'src/app/user/user.entity';

export class UserloginResponse extends UserEntity {
  _id: string;
  constructor(obj: UserDocument) {
    super();
    this._id = obj._id?.toString();
    this.name = obj.name;
    this.email = obj.email;
    this.isEmailVerified = obj.isEmailVerified;
    this.site = obj.site;
  }
}

export class StaffloginResponse extends StaffEntity {
  _id: string;
  constructor(obj: StaffDocument) {
    super();
    this._id = obj._id?.toString();
    this.name = obj.name;
    this.email = obj.email;
    this.role = obj.role;
  }
}
