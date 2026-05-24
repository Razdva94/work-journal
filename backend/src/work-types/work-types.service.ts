import { Injectable } from '@nestjs/common';
import { WorkTypesRepository } from './work-types.repository.js';
import type { WorkTypeDto } from './work-types.types.js';

@Injectable()
export class WorkTypesService {
  constructor(private readonly workTypesRepository: WorkTypesRepository) {}

  async findAll(): Promise<WorkTypeDto[]> {
    return this.workTypesRepository.findAll();
  }
}
