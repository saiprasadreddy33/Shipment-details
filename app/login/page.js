"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ThemeProvider } from 'next-themes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supabase = createClientComponentClient();

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      toast.error('Authentication error. Please try again later.');
    } else {
      setIsOtpSent(true);
      toast.info('Check your email for the OTP!');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the OTP.');
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
    setLoading(false);
    if (error) {
      if (error.message.includes('expired')) {
        toast.error('Your OTP has expired. Please request a new one.');
      } else {
        toast.error('Invalid OTP. Please check the code and try again.');
      }
    } else {
      toast.success('Login successful! Redirecting to dashboard...');
      setTimeout(() => router.push('/dashboard'), 2000);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ThemeProvider attribute="class">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="relative">
          <form
            onSubmit={isOtpSent ? handleVerifyOtp : handleLogin}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Login</h2>
            {!isOtpSent ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="border border-gray-900 dark:border-gray-700 p-3 rounded-lg w-full mb-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-white-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full"></span>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="One-Time PIN"
                  className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full mb-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full"></span>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </>
            )}
          </form>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 opacity-30 rounded-lg transform -rotate-6 -z-10"></div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};

export default Login;
