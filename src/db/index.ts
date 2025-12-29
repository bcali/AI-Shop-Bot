import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// For edge runtimes (Cloudflare Pages), we usually use drizzle-orm/postgres-js or drizzle-orm/neon-http
// Since we are using standard PostgreSQL driver here, it's suitable for Node.js runtimes.
// If using Neon, we could switch to neon-http for better edge compatibility.

const client = postgres(connectionString);
export const db = drizzle(client, { schema });

