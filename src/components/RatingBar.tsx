import { motion } from 'framer-motion';

export interface RatingProps {
  rating: number; // 1-10
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function RatingBar({ rating, label, size = 'md', showValue = true }: RatingProps) {
  const percentage = (rating / 10) * 100;
  const barColor = rating < 4 ? 'bg-orange-500' : rating < 7 ? 'bg-yellow-500' : 'bg-green-500';
  const maturityLevel = rating < 4 ? 'Early Stage' : rating < 7 ? 'Developing' : 'Mature';

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>{label}</span>
          {showValue && (
            <span className="font-medium">
              {maturityLevel} ({rating}/10)
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <motion.div
          className={`${sizeClasses[size]} ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
