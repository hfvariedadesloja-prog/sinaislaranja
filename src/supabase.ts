import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jzgyaasebgdrhsxwdeqd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z3lhYXNlYmdkcmhzeHdkZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTAzNzksImV4cCI6MjA5NDY2NjM3OX0.5irPYsyfz-zRWKpegUfcr1iITudeF6WotEpt6VJp0Zk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
