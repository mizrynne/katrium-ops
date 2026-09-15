import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleSignInButton } from './google-sign-in-button';
import { api } from '@/lib/axios';

export const LoginForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleGoogleLogin = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await api.get<{ url: string }>('/auth/google/redirect');
			if (response.data?.url) {
				window.location.href = response.data.url;
			} else {
					throw new Error('No redirect URL received from server.');
			}
		} catch (err: any) {
			console.error('Google login failed:', err);
			setError(err.response?.data?.message || 'Failed to initiate Google Login.');
		}
			setIsLoading(false);
	};

  return (
    <div className="flex flex-col justify-center w-full h-full p-8 sm:p-12 lg:p-14 bg-white select-none">
      <AnimatePresence mode="wait">
          <motion.div
            key="login-content"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <div>
              <h2 className="text-2xl sm:text-[28px] text-gray-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500 mt-1.5 font-normal">
                Sign in with your Google Workspace account to continue.
              </p>
            </div>

            <div className="mt-8">
              <GoogleSignInButton
                onClick={handleGoogleLogin}
                isLoading={isLoading}
              />
							{error ? (
									<p className="text-xs text-red-500 text-center mt-3 font-normal">{error}</p>
								) : (
									<p className="text-xs text-gray-400 text-center mt-3 font-xs">
										Please log in with an account authorized by KM Staycations.
									</p>
								)}
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
};
