import React from 'react';
import Image from 'next/image';
import { Player, Feature } from '../types/llm';
import PlayerFeatureTable from './PlayerFeatureTable';

interface SubcategoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  players: Player[];
  features?: { [key: string]: Feature };
  benchmarks?: Array<{
    name: string;
    scores: { [player: string]: string };
  }>;
}

const SubcategoryPopup: React.FC<SubcategoryPopupProps> = ({
  isOpen,
  onClose,
  title,
  description,
  players,
  features = {},
  benchmarks = [],
}) => {
  // Filter players to only show those with supported features
  const supportedPlayers = players.filter(player => 
    Object.values(features).some(feature => 
      feature.supported_by[player.name]?.status === 'full' || 
      feature.supported_by[player.name]?.status === 'partial'
    )
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mt-2">
                {description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Top Players Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Top Players</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportedPlayers.map((player, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    {player.iconUrl && (
                      <Image 
                        src={player.iconUrl} 
                        alt={`${player.name} icon`}
                        width={32}
                        height={32}
                        className="mb-2 rounded-full"
                        loader={({ src }) => src}
                        unoptimized
                      />
                    )}
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.company}</div>
                    {player.context_window && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Context Window: {(player.context_window / 1000).toFixed(0)}k tokens
                      </div>
                    )}
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {player.notable_features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-400">{feature}</li>
                      ))}
                    </ul>
                    {player.benchmark_scores && (
                      <div className="mt-2 text-xs space-y-1">
                        {player.benchmark_scores.mmlu && (
                          <div className="text-green-600 dark:text-green-400">
                            MMLU Score: {player.benchmark_scores.mmlu.toFixed(1)}%
                          </div>
                        )}
                        {player.benchmark_scores.humaneval && (
                          <div className="text-blue-600 dark:text-blue-400">
                            HumanEval Score: {player.benchmark_scores.humaneval.toFixed(1)}%
                          </div>
                        )}
                        {player.benchmark_scores.swe_bench && (
                          <div className="text-purple-600 dark:text-purple-400">
                            SWE-bench Score: {player.benchmark_scores.swe_bench.toFixed(1)}%
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Support Table */}
            {Object.keys(features).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Feature Support</h3>
                <PlayerFeatureTable features={features} players={players} />
              </div>
            )}

            {/* Benchmark Scores */}
            {benchmarks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Benchmark Performance</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Benchmark</th>
                        {supportedPlayers.map((player) => (
                          <th key={player.name} className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">
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
                    <tbody>
                      {benchmarks.map((benchmark, index) => (
                        <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="py-3 text-sm font-medium">{benchmark.name}</td>
                          {supportedPlayers.map((player) => (
                            <td key={player.name} className="py-3 text-sm">
                              {benchmark.scores[player.name] || 'N/A'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPopup;
