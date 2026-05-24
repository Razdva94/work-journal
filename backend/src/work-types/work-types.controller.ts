import { Controller, Get } from '@nestjs/common';
import { WorkTypesService } from './work-types.service.js';
import type { WorkTypeDto } from './work-types.types.js';

@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly workTypesService: WorkTypesService) {}

  @Get()
  findAll(): Promise<WorkTypeDto[]> {
    return this.workTypesService.findAll();
  }
}
