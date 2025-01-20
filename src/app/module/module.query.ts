import { Injectable } from '@nestjs/common';

@Injectable()
export class ModuleQueries {
  async getAllModuleWithPermission() {
    return [
      {
        $lookup: {
          from: 'permissionentities',
          localField: '_id',
          foreignField: 'module',
          as: 'permissions',
        },
      },
      {
        $project: {
          url: 0,
        },
      },
    ];
  }
}
