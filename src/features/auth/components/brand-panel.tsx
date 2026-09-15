import React from 'react';
import { VillaCarousel } from './villa-carousel';

export const BrandPanel: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-between w-full h-full p-8 sm:p-10 bg-[#16221e] text-white select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_0%_100%,rgba(225,92,40,0.55),rgba(170,60,20,0.28)_40%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,rgba(45,85,72,0.4),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
            <img src="/km-logo.png" alt="Logo" className="w-8 h-8 rounded-xl" />
          </div>

          <div>
            <h1 className="text-white font-medium text-lg leading-tight tracking-tight">
              KM Staycations
            </h1>
            <p className="text-[#7ec2a8] text-[9px] font-normal tracking-[0.2em] uppercase mt-0.5">
              We make every stay worry-free
            </p>
          </div>
        </div>

        <div className="my-6">
          <VillaCarousel />
        </div>

        <div className="space-y-1">
          <h2 className="text-white font-semibold text-lg tracking-tight leading-snug">
            Stylish spaces, Seamless Stays.
          </h2>
          <p className="text-[#72b79e] text-base sm:text-lg font-normal tracking-tight">
            Always worry-free.
          </p>
        </div>
      </div>
    </div>
  );
};
