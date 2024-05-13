import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabaseAdminKey = process.env.SUPABASE_ADMIN_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
    }
});

const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey, {
    auth: {
        persistSession: false,
    }
})

export { supabase, supabaseAdmin }