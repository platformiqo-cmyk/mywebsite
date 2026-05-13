import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etofnsrkyosapqajladr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b2Zuc3JreW9zYXBxYWpsYWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY4NDgsImV4cCI6MjA4NzY5Mjg0OH0.cpFc9Xa60kBGaRrJJgRs6x3ZWRBkM5K5PB2MnjozqCs';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
