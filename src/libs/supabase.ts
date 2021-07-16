import { createClient } from '@supabase/supabase-js';
import { isNullOrUndefined } from '@utils/validate-js-utils';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'] as string;
const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string;
const supabaseServiceKey = process.env['SUPABASE_SERVICE_KEY'] as string;

let supbaseKey = !isNullOrUndefined(supabaseServiceKey)
  ? supabaseServiceKey
  : supabaseAnonKey;
export const supabase = createClient(supabaseUrl, supbaseKey);
