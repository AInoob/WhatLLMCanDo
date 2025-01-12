import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Player } from '../types/llm';

interface FeatureSupport {
  status: 'full' | 'partial' | 'none';
  details?: string;
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

const PlayerFeatureTable: React.FC<PlayerFeatureTableProps> = ({ features, players }) => {
  const getStatusColor = (status: FeatureSupport['status']) => {
    switch (status) {
      case 'full':
        return 'text-green-600 dark:text-green-400';
      case 'partial':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'none':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
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
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Feature
            </th>
            {supportedPlayers.map((player) => (
              <th key={player.name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  {player.iconUrl && (
                    <Image 
                      src={player.iconUrl} 
                      alt={`${player.name} icon`}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  )}
                  <span>{player.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {Object.entries(features)
            .filter(([_, feature]) => 
              Object.values(feature.supported_by).some(support => 
                support.status === 'full' || support.status === 'partial'
              )
            )
            .map(([featureName, feature], index) => (
            <motion.tr
              key={featureName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                <div>{featureName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                <div className="text-xs text-gray-500">{feature.description}</div>
              </td>
              {supportedPlayers.map((player) => {
                const support = feature.supported_by[player.name] || { status: 'none' };
                return (
                  <td key={player.name} className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className={`font-medium ${getStatusColor(support.status)}`}>
                      {support.status.charAt(0).toUpperCase() + support.status.slice(1)}
                    </div>
                    {support.details && (
                      <div className="text-xs text-gray-500">{support.details}</div>
                    )}
                  </td>
                );
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerFeatureTable;
