import { Controller, Get } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {
  @Get()
  getAll() {
    return [
      {
        id: 1,
        name: 'Profile 1',
      },
      {
        id: 2,
        name: 'Profile 2',
      },
    ];
  }
}
