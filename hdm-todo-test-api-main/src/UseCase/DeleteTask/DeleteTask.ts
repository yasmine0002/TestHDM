// @todo SOMETHING IS WRONG HERE, THE ENDPOINT IS BROKEN, FIX IT
import { BadRequestException } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

export default class DeleteTask
  implements UseCase<Promise<boolean>, [id: number]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number) {
    try {
      await this.taskRepository.delete(id);

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
