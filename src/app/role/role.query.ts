import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleQueries {
  async getAllRolesWithStaff() {
    return [
      {
        $lookup: {
          from: 'staffentities',
          localField: '_id',
          foreignField: 'role',
          as: 'staffs',
        },
      },
    ];
  }
}
