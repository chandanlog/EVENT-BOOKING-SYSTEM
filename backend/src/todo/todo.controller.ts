import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Controller('todos') // ✅ Matches frontend API calls
export class TodoController {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // ✅ Get all todos
  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  // ✅ Add a new todo (initializing `completed` field)
  @Post()
  async addTodo(@Body('title') title: string): Promise<Todo> {
    if (!title) {
      throw new BadRequestException('Title is required');
    }
    
    const newTodo = this.todoRepository.create({ title, completed: false });
    return await this.todoRepository.save(newTodo);
  }

  // ✅ Edit a todo (Update)
  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body('title') title: string): Promise<Todo> {
    const todoId = parseInt(id, 10);
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    
    if (!title) {
      throw new BadRequestException('Title cannot be empty');
    }

    todo.title = title;
    return await this.todoRepository.save(todo);
  }

  // ✅ Delete a todo (return confirmation)
  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<{ message: string }> {
    const todoId = parseInt(id, 10);
    const result = await this.todoRepository.delete(todoId);

    if (result.affected === 0) {
      throw new NotFoundException('Todo not found');
    }

    return { message: 'Todo deleted successfully' };
  }
}
