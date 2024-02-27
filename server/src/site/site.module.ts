import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteController } from './site.controller';
import { Site } from 'src/entities/site.entity';
import { SiteService } from './site.service';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
