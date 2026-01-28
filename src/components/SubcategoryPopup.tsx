import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Player, Feature } from '../types/llm';
import PlayerFeatureTable from './PlayerFeatureTable';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    rotateX: 15
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.2 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

const playerCardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }),
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.2 }
  }
};

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="glass-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: "1000px" }}
          >
            <div className="p-6">
              <motion.div
                className="flex justify-between items-start mb-4"
                variants={contentVariants}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                <div>
                  <h2 className="text-2xl font-bold gradient-text">{title}</h2>
                  <motion.p
                    className="text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed"
                    variants={contentVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    {description}
                  </motion.p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>

          <div className="space-y-6">
            {/* Top Players Section */}
            <motion.div
              variants={contentVariants}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 bg-purple-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                Top Players
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportedPlayers.map((player, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={playerCardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
                  >
                    {player.iconUrl && (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={player.iconUrl}
                          alt={`${player.name} icon`}
                          width={32}
                          height={32}
                          className="mb-2 rounded-full ring-2 ring-purple-200 dark:ring-purple-700"
                          unoptimized
                          loader={({ src }) => src.startsWith('/') ? src : `/${src}`}
                        />
                      </motion.div>
                    )}
                    <div className="font-medium text-gray-800 dark:text-gray-200">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.company}</div>
                    {player.context_window && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                        Context Window: {(player.context_window / 1000).toFixed(0)}k tokens
                      </div>
                    )}
                    <ul className="mt-2 space-y-1 text-sm">
                      {player.notable_features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {player.benchmark_scores && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {player.benchmark_scores.mmlu && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                            MMLU: {player.benchmark_scores.mmlu.toFixed(1)}%
                          </span>
                        )}
                        {player.benchmark_scores.humaneval && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                            HumanEval: {player.benchmark_scores.humaneval.toFixed(1)}%
                          </span>
                        )}
                        {player.benchmark_scores.swe_bench && (
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
                            SWE-bench: {player.benchmark_scores.swe_bench.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Feature Support Table */}
            {Object.keys(features).length > 0 && (
              <motion.div
                variants={contentVariants}
                custom={3}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                  />
                  Feature Support
                </h3>
                <PlayerFeatureTable features={features} players={players} />
              </motion.div>
            )}

            {/* Benchmark Scores */}
            {benchmarks.length > 0 && (
              <motion.div
                variants={contentVariants}
                custom={4}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                  />
                  Benchmark Performance
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
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
                        <motion.tr
                          key={index}
                          className="border-t border-gray-200 dark:border-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <td className="py-3 text-sm font-medium">{benchmark.name}</td>
                          {supportedPlayers.map((player) => (
                            <td key={player.name} className="py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                              {benchmark.scores[player.name] || 'N/A'}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            className="mt-6 flex justify-end space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-500 shadow-sm transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubcategoryPopup;
