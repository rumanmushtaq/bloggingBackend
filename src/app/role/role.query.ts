import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleQueries {
  async getAllRolesWithStaff() {
    return [
      {
        $match: {
          isAdmin: false,
        },
      },
      {
        $lookup: {
          from: 'staffentities',
          localField: '_id',
          foreignField: 'role',
          as: 'staffs',
        },
      },
      {
        $project: {
          isAdmin: 0,
        },
      },
    ];
  }
}
