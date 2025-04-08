import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./drizzle/schema";

const client = createClient({
  url: process.env.DB_FILE_NAME!,
});

const db = drizzle(client, { schema });

export { db };
