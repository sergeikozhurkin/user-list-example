import { type User } from '@repo/types';

export const users: User[] = [
  { id: 1, fullName: 'John Doe', roles: ['Admin', 'User'], birthDate: '1990-05-15' },
  { id: 2, fullName: 'Jane Smith', roles: ['User'], birthDate: '1985-08-22' },
  { id: 3, fullName: 'Bob Johnson', roles: ['Manager', 'User'], birthDate: '1992-03-10' },
  { id: 4, fullName: 'Alice Williams', roles: ['User'], birthDate: '1988-11-30' },
  { id: 5, fullName: 'Charlie Brown', roles: ['Admin'], birthDate: '1995-07-18' },
];

let nextId = 6;

export const getNextId = () => nextId++;
