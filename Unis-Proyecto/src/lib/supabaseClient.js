import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fjxqzgzckjxrevcgbzqf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeHF6Z3pja2p4cmV2Y2dienFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTM0MjAsImV4cCI6MjA2NDc4OTQyMH0.uomqLZbbzi1Q2-Nv8JFxtW3trywRwmGicjg7hAkEfrk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
