import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [ProfilesModule],
  controllers: [ProfilesController],
  providers: [ProfilesModule],
})
export class AppModule {}
