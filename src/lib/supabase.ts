import { createClient } from '@supabase/supabase-js'

// هذه المعلومات تجدها في حسابك بموقع Supabase تحت إعدادات API
const supabaseUrl = 'https://mjospnmbnprbvbicvqfi.supabase.co'
const supabaseAnonKey = 'sb_publishable_2K_J1rh-hATt_YG3ePxS8g_7C-GOlfg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)