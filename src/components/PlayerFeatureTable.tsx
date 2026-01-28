import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Player } from '../types/llm';

interface FeatureSupport {
  status: 'full' | 'partial' | 'none';
  details?: string;
  benchmark_score?: number;
  context_size?: number;
  added_date?: string;
}

interface Feature {
  description: string;
  supported_by: {
    [player: string]: FeatureSupport;
  };
}

interface PlayerFeatureTableProps {
  features: { [key: string]: Feature };
  players: Player[];
}

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    scale: 1.01,
    transition: { duration: 0.2 }
  }
};

const statusVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const PlayerFeatureTable: React.FC<PlayerFeatureTableProps> = ({ features, players }) => {
  const getStatusConfig = (status: FeatureSupport['status']) => {
    switch (status) {
      case 'full':
        return {
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-100 dark:bg-green-900/30',
          icon: '✓',
          label: 'Full'
        };
      case 'partial':
        return {
          color: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          icon: '◐',
          label: 'Partial'
        };
      case 'none':
        return {
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-100 dark:bg-red-900/30',
          icon: '✗',
          label: 'None'
        };
      default:
        return {
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          icon: '-',
          label: 'N/A'
        };
    }
  };

  // Filter out players with no supported features
  const supportedPlayers = players.filter(player => 
    Object.values(features).some(feature => 
      feature.supported_by[player.name]?.status === 'full' || 
      feature.supported_by[player.name]?.status === 'partial'
    )
  );

  return (
    <motion.div
      className="mt-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Feature
            </th>
            {supportedPlayers.map((player, idx) => (
              <motion.th
                key={player.name}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center space-x-2">
                  {player.iconUrl && (
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Image
                        src={player.iconUrl}
                        alt={`${player.name} icon`}
                        width={18}
                        height={18}
                        className="rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
                        unoptimized
                        loader={({ src }) => src.startsWith('/') ? src : `/${src}`}
                      />
                    </motion.div>
                  )}
                  <span>{player.name}</span>
                </div>
              </motion.th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800"
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(features)
            .filter(([_, feature]) =>
              Object.values(feature.supported_by).some(support =>
                support.status === 'full' || support.status === 'partial'
              )
            )
            .map(([featureName, feature], index) => (
            <motion.tr
              key={featureName}
              variants={rowVariants}
              whileHover="hover"
              className="cursor-pointer"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                <div className="font-semibold">{featureName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                <div className="text-xs text-gray-500 mt-0.5 max-w-xs">{feature.description}</div>
              </td>
              {supportedPlayers.map((player) => {
                const support = feature.supported_by[player.name] || { status: 'none' };
                const config = getStatusConfig(support.status);
                return (
                  <td key={player.name} className="px-6 py-4 text-sm">
                    <motion.div
                      variants={statusVariants}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.color} font-medium text-xs`}
                    >
                      <span className="text-sm">{config.icon}</span>
                      {config.label}
                    </motion.div>
                    {support.details && (
                      <motion.div
                        className="text-xs text-gray-500 mt-1.5 max-w-[150px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {support.details}
                      </motion.div>
                    )}
                    {(support.benchmark_score || support.context_size) && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {support.benchmark_score && (
                          <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                            {support.benchmark_score.toFixed(1)}%
                          </span>
                        )}
                        {support.context_size && (
                          <span className="px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-xs">
                            {(support.context_size / 1000).toFixed(0)}k ctx
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </motion.div>
  );
};

export default PlayerFeatureTable;
