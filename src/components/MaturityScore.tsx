import React from 'react';
import { motion } from 'framer-motion';

interface MaturityScoreProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
}

function getMaturityColor(score: number): { stroke: string; text: string; glow: string } {
  if (score >= 70) {
    return {
      stroke: '#22c55e',
      text: '#16a34a',
      glow: 'rgba(34, 197, 94, 0.3)'
    };
  } else if (score >= 40) {
    return {
      stroke: '#eab308',
      text: '#ca8a04',
      glow: 'rgba(234, 179, 8, 0.3)'
    };
  } else {
    return {
      stroke: '#ef4444',
      text: '#dc2626',
      glow: 'rgba(239, 68, 68, 0.3)'
    };
  }
}

const sizeConfig = {
  sm: { size: 36, strokeWidth: 3, fontSize: 'text-xs' },
  md: { size: 44, strokeWidth: 3.5, fontSize: 'text-sm' },
  lg: { size: 56, strokeWidth: 4, fontSize: 'text-base' }
};

const MaturityScore: React.FC<MaturityScoreProps> = ({ score, size = 'sm' }) => {
  const colors = getMaturityColor(score);
  const config = sizeConfig[size];
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative flex items-center justify-center"
      style={{ width: config.size, height: config.size }}
    >
      {/* Background circle */}
      <svg
        className="absolute transform -rotate-90"
        width={config.size}
        height={config.size}
      >
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            filter: `drop-shadow(0 0 6px ${colors.glow})`
          }}
        />
      </svg>
      {/* Score text */}
      <motion.div
        className={`${config.fontSize} font-bold`}
        style={{ color: colors.text }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {score}
      </motion.div>
    </motion.div>
  );
};

export default MaturityScore;
