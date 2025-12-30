import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// For Supabase + Cloudflare Pages, we use postgres-js.
// We use ssl: 'require' for secure connection to Supabase.
const client = postgres(connectionString, { 
  prepare: false,
  ssl: 'require' 
});
export const db = drizzle(client, { schema });

