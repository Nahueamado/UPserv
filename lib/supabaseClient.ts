import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rlcujjlsyiabvukmaqza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsY3VqamxzeWlhYnZ1a21hcXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MDgwNjAsImV4cCI6MjA2MjA4NDA2MH0.WSrUkuLxpDxZkxcORX2-f0tIvq4tU3T7cnviF82g8lE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
