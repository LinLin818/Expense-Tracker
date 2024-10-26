import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon("postgresql://finansmart-database_owner:QYTEk9yn6Psm@ep-round-cherry-a57oow5z.us-east-2.aws.neon.tech/expense-tracker%20database?sslmode=require");
const db = drizzle(sql, { schema });

export default db;
