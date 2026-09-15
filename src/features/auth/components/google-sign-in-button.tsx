import React from 'react';
import { motion } from 'framer-motion';

export interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: disabled || isLoading ? 1 : 1.005 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full h-12 px-5 bg-white hover:bg-gray-50/75 border border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <img src="/google-g-logo.png" alt="Google Logo" className="w-4.5 h-4.5 shrink-0" />
      )}
      <span>Continue with Google</span>
    </motion.button>
  );
};
