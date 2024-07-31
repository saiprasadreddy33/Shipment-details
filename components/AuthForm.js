"use client";
import { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setIsOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
    if (!error) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white shadow-md rounded">
      {!isOtpSent ? (
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className="border p-2 rounded w-full mb-2"
          />
          <button 
            onClick={handleLogin} 
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input 
            type="text" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            placeholder="One-Time PIN" 
            className="border p-2 rounded w-full mb-2"
          />
          <button 
            onClick={handleVerifyOtp} 
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
