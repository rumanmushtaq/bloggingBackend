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
          action: { $push: '$_id' },
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
                path: 1,
                icon: 1,
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
        $addFields: {
          'moduledetail.action': '$action',
        },
      },
      {
        $replaceRoot: { newRoot: '$moduledetail' },
      },
    ];
  }
}
