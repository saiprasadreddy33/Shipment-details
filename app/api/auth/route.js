// app/api/auth/route.js
import { supabase } from '../../../utils/supabase.js';

export async function POST(req) {
  const { email } = await req.json();
  const { error } = await supabase.auth.signInWithOtp({ email });
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  
  return new Response(JSON.stringify({ message: 'OTP sent' }), { status: 200 });
}
