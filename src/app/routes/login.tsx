import React from 'react';
import { motion } from 'framer-motion';
import { BrandPanel } from '@/features/auth/components/brand-panel';
import { LoginForm } from '@/features/auth/components/login-form';

export default function Login(): React.JSX.Element {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#eef1f4]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-[920px] min-h-[540px] bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100/80 grid grid-cols-1 md:grid-cols-12"
      >
        <div className="md:col-span-5 min-h-[420px] md:min-h-full">
          <BrandPanel />
        </div>
        <div className="md:col-span-7 flex flex-col justify-center">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
};
