import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoles = pgEnum('user_roles', ['user', 'admin', 'guest']);
export const taskStatus = pgEnum('status', [
  'todo',
  'processing',
  'completed',
  'cancelled',
]);
