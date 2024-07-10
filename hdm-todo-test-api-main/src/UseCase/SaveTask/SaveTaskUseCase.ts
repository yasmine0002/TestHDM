import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import { Task } from '@prisma/client';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase


  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {};

  async handle(dto: SaveTaskDto) {
    try {
      return this.taskRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
