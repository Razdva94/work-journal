import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { WorkTypesController } from './work-types.controller.js';
import { WorkTypesRepository } from './work-types.repository.js';
import { WorkTypesService } from './work-types.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [WorkTypesController],
  providers: [WorkTypesRepository, WorkTypesService],
  exports: [WorkTypesService, WorkTypesRepository],
})
export class WorkTypesModule {}
