import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepo.find();
  }

  create(title: string): Promise<Todo> {
    const newTodo = this.todoRepo.create({ title });
    return this.todoRepo.save(newTodo);
  }

  async toggleComplete(id: number): Promise<Todo> {
    const task = await this.todoRepo.findOneBy({ id });
    if (!task) throw new Error('Task not found');
    task.completed = !task.completed;
    return this.todoRepo.save(task);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepo.delete(id);
  }
}
