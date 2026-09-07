import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/entities/index.entities';
import { users } from 'src/entities/schema.entities';
import type { NewUser } from 'src/entities/schema.entities';

@Injectable()
export class UsersService {
  // Find by user email
  async findUserByEmailAsync(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }
  //   find user by ID
  async findUserByIdAsync(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  //   Create new user
  async createNewUserAsync(data: NewUser) {
    const [newUser] = await db.insert(users).values(data).returning();
    return newUser;
  }

  //   update existing user
  async updateUserAsync(id: string, data: Partial<NewUser>) {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  //   fetch all users
  async getAllUsersAsync() {
    return db.query.users.findMany();
  }

  //   delete user
  async deleteUserAsync(id: string) {
    return db.delete(users).where(eq(users.id, id));
  }
}
