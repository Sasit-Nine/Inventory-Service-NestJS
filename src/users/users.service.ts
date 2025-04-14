import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
// export type User = any;
export interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      role: 'admin',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      role: 'user',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
