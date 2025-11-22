import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type-safe database helpers
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          timezone: string
          notification_frequency: 'high' | 'medium' | 'low' | 'minimal'
          distraction_level: 'high' | 'medium' | 'low'
          preferred_focus_duration: number
          preferred_break_duration: number
          focus_mode_enabled: boolean
          theme: 'light' | 'dark' | 'high-contrast'
          reduce_motion: boolean
          ai_coaching_enabled: boolean
          ai_provider: 'gemini' | 'chatgpt' | 'ollama' | null
          ai_api_key_encrypted: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>
      }
      // Add other table types as needed
    }
  }
}
