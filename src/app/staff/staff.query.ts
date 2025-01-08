import { Injectable } from '@nestjs/common';
import { StaffDocument } from './staff.entity';

@Injectable()
export class StaffQueries {
  async findStaffWithRole(criteria: Partial<StaffDocument>) {
    return [
      {
        $match: criteria,
      },
      {
        $lookup: {
          from: 'roleentities',
          localField: 'role',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $addFields: {
          role: { $arrayElemAt: ['$role', 0] },
        },
      },
    ];
  }
}
