import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.entities';

const dbClient = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: dbClient, schema: schema });
