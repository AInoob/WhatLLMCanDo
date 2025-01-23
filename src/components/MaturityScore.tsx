import React from 'react';
import { motion } from 'framer-motion';

interface MaturityScoreProps {
  score: number; // 0-100
}

function getMaturityColor(score: number): string {
  // Ensure reasonable color intensity (not too light, not too dark)
  const minIntensity = 50;  // Prevents colors from being too dark
  const maxIntensity = 200; // Prevents colors from being too light
  const range = maxIntensity - minIntensity;
  
  // Calculate red and green values with controlled intensity
  const red = Math.round(minIntensity + (range * (100 - score) / 100));
  const green = Math.round(minIntensity + (range * score / 100));
  
  return `rgb(${red}, ${green}, 0)`;
}

const MaturityScore: React.FC<MaturityScoreProps> = ({ score }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-2 mt-1"
    >
      <div 
        className="font-semibold text-sm"
        style={{ color: getMaturityColor(score) }}
      >
        {score}
      </div>
      <div className="text-xs text-gray-500">/100</div>
    </motion.div>
  );
};

export default MaturityScore;
