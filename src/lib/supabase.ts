import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
)

export type DbProject = {
  id: string
  industry: string
  title: string
  category: string
  year: string
  youtube_id: string
  description: string
  vertical: boolean
  sort_order: number
  created_at: string
}
