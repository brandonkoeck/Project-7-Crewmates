import { createClient } from '@supabase/supabase-js'

const URL = 'https://adogcxwmobwunqnatxzx.supabase.co'
const API_KEY = 'sb_publishable_ahLrOvhbsKRevuU5higmVg_7GV_IzCq'

export const supabase = createClient(URL, API_KEY)