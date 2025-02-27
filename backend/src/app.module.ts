import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';  // Keep User entity
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';  // Import ToDoModule
import { Todo } from './todo/todo.entity';  // Import ToDo entity

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // For managing environment variables
    TypeOrmModule.forRoot({
      type: 'mysql',  // MySQL database
      host: process.env.DB_HOST,  // From your .env file
      port: Number(process.env.DB_PORT),  // Database port
      username: process.env.DB_USER,  // Database username
      password: process.env.DB_PASS,  // Database password
      database: process.env.DB_NAME,  // Database name
      entities: [User, Todo],  // Add both User and ToDo entities
      synchronize: true, // Set false in production for safety
    }),
    AuthModule,  // Auth module for authentication
    TodoModule,  // ToDo module for task management
  ],
})
export class AppModule {}
