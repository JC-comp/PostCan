"use client";

import { motion } from "framer-motion";

export const TrashCanLoader = () => {
  // Shared timing configuration for synchronization
  const duration = 1.5;
  const repeatDelay = 0.5;

  return (
    <div className="flex items-center justify-center scale-125">
      <div className="relative w-10 h-12">
        {/* The Post/Item - Moves up when lid is open */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, 0, -25, -25, 0], // Stay hidden, move up, stay up, reset
            opacity: [0, 1, 1, 0, 0],
            scale: [0.8, 1, 1, 0.8, 0.8]
          }}
          transition={{
            duration: duration,
            times: [0, 0.2, 0.5, 0.8, 1], // Sync with lid stages
            repeat: Infinity,
            repeatDelay: repeatDelay,
            ease: "easeInOut"
          }}
          className="absolute left-1/2 -translate-x-1/2 top-2 w-6 h-6 bg-amber-400 rounded-sm z-0 flex items-center justify-center shadow-sm"
        >
           <div className="w-4 h-[2px] bg-amber-600 rounded-full" />
        </motion.div>

        {/* The Lid - Hinges open from the left */}
        <motion.div
          style={{ originX: 0, originY: 1 }} // Pivot point at bottom-left of lid
          animate={{ 
            rotate: [0, -110, -110, 0, 0], // Open, hold, close, wait
          }}
          transition={{ 
            duration: duration,
            times: [0, 0.3, 0.7, 0.9, 1],
            repeat: Infinity,
            repeatDelay: repeatDelay,
            ease: "circInOut" 
          }}
          className="absolute -top-1 left-0 w-10 h-2 bg-blue-600 dark:bg-blue-400 rounded-t-sm z-20"
        >
          {/* Lid Handle */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-blue-700 dark:bg-blue-500 rounded-t-full" />
        </motion.div>

        {/* The Can Body */}
        <div className="absolute bottom-0 w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-b-lg flex flex-col items-center justify-evenly p-1 z-10">
          <div className="flex gap-1 w-full justify-center">
            <div className="w-1 h-6 bg-blue-400/50 dark:bg-blue-300/30 rounded-full" />
            <div className="w-1 h-6 bg-blue-400/50 dark:bg-blue-300/30 rounded-full" />
            <div className="w-1 h-6 bg-blue-400/50 dark:bg-blue-300/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};