import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

export const supabase = createClient(
  //@ts-ignore
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
