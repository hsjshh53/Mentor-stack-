import React from 'react';
import { motion } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({ children, id, className = "" }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "Apple" feel
        opacity: { duration: 1 }
      }}
      className={`relative py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
};
