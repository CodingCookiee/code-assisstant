import { motion } from 'framer-motion';
import React from 'react';

const BouncingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 bg-indigo-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default BouncingDots;