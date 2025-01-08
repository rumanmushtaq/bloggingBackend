// ** Nest
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class PermissionQueries {
  async findModuleByPermission(permissionIds: string[]) {
    return [
      {
        $match: {
          _id: {
            $in: permissionIds?.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
      {
        $group: {
          _id: '$module',
        },
      },
      {
        $lookup: {
          from: 'moduleentities',
          localField: '_id',
          foreignField: '_id',
          as: 'moduledetail',
          pipeline: [
            {
              $project: {
                title: 1,
                url: 1,
                isActive: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$moduledetail',
        },
      },
      {
        $replaceRoot: { newRoot: '$moduledetail' },
      },
    ];
  }
}
