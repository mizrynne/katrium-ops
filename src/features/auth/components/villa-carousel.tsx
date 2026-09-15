import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface VillaShowcase {
  id: string;
  name: string;
  subtitle: string;
  imageUrl: string;
}

export const villas: VillaShowcase[] = [
  {
    id: 'azure-north-pampanga',
    name: 'Azure North Pampanga',
    subtitle: 'Charming Condo Unit',
    imageUrl: '/azure-north-pampanga.jpg',
  },
  {
    id: 'azure-north-san-fernando',
    name: 'Azure North San Fernando',
    subtitle: 'Serene & Luxurious Retreat',
    imageUrl: '/azure-north-san-fernando.jpg',
  },
  {
    id: 'magalang-pool-farm',
    name: 'Magalang Pool & Farm',
    subtitle: 'Private Room in a Farm Stay',
    imageUrl: '/magalang-pool-farm.jpg',
  },
];

export const VillaCarousel: React.FC = () => {
  const [activeVillaIndex, setActiveVillaIndex] = useState(0);
  const currentVilla = villas[activeVillaIndex];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group aspect-10/9 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVilla.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={currentVilla.imageUrl}
            alt={currentVilla.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10">
        <div>
          <h4 className="text-white font-semibold text-sm tracking-tight drop-shadow-xs">
            {currentVilla.name}
          </h4>
          <p className="text-white/80 text-xs font-normal drop-shadow-xs mt-0.5">
            {currentVilla.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 pb-1">
          {villas.map((villa, idx) => {
            const isActive = idx === activeVillaIndex;
            return (
              <button
                key={villa.id}
                onClick={() => setActiveVillaIndex(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? 'w-4 h-1.5 bg-white shadow-xs'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`View ${villa.name}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
