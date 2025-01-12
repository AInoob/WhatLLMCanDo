import { motion } from 'framer-motion';
import { RatingBar } from './RatingBar';

export interface ToolInfo {
  name: string;
  description: string;
  rating: number;
  provider: string;
}

interface ToolCardProps {
  tool: ToolInfo;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{tool.name}</h4>
          <p className="text-sm text-gray-500">{tool.provider}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
      <RatingBar rating={tool.rating} size="sm" />
    </motion.div>
  );
}
