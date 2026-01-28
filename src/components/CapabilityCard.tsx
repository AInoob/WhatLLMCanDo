import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Player, Subsection } from '../types/llm';
import MaturityScore from './MaturityScore';
import PlayerFeatureTable from './PlayerFeatureTable';
import SubcategoryPopup from './SubcategoryPopup';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const subsectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100
    }
  }),
  hover: {
    x: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    transition: { duration: 0.2 }
  }
};

const playerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 150,
      damping: 12
    }
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.2 }
  }
};

interface CapabilityCardProps {
  title: string;
  description: string;
  stage: 'mature' | 'emerging' | 'early';
  score: number;
  subsections?: { [key: string]: Subsection };

  players: Player[];
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  title,
  description,
  stage,
  score,
  subsections,
  players,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<{name: string; data: Subsection} | null>(null);

  const handleSubsectionClick = (name: string, section: Subsection) => {
    // Filter players to only show those with supported features
    const supportedPlayers = players.filter(player => 
      section.features ? Object.values(section.features).some(feature => 
        feature.supported_by[player.name]?.status === 'full' || 
        feature.supported_by[player.name]?.status === 'partial'
      ) : true
    );
    
    setSelectedSubsection({ 
      name, 
      data: {
        ...section,
        description: `${section.description}\n\nMaturity Score: ${section.score}/100 - ${section.stage.charAt(0).toUpperCase() + section.stage.slice(1)} Stage`
      }
    });
    setIsPopupOpen(true);
  };
  const stageColors: Record<CapabilityCardProps['stage'], string> = {
    mature: 'bg-green-100 text-green-800',
    emerging: 'bg-yellow-100 text-yellow-800',
    early: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="glass-card rounded-2xl shadow-xl p-6 card-glow cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <motion.div
        className="flex justify-between items-start mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="flex flex-col items-end gap-2">
          <motion.span
            className={`px-3 py-1 rounded-full text-sm font-medium ${stageColors[stage]} shadow-sm`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {stage}
          </motion.span>
          <MaturityScore score={score} />
        </div>
      </motion.div>
      <motion.p
        className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </motion.p>
      

      
      <AnimatePresence>
        {subsections && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <motion.span
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              Subsections
            </h4>
            <div className="space-y-3">
              {Object.entries(subsections).map(([name, section]: [string, Subsection], index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={subsectionVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="border-l-4 border-blue-500 pl-4 py-2 cursor-pointer rounded-r-lg transition-all"
                  onClick={() => handleSubsectionClick(name, section)}
                >
                  <div className="flex justify-between items-center">
                    <motion.div
                      className="font-medium text-gray-800 dark:text-gray-200"
                      whileHover={{ color: "#3b82f6" }}
                    >
                      {name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </motion.div>
                    <div className="flex flex-col items-end gap-1">
                      <motion.span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[section.stage]} shadow-sm`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {section.stage}
                      </motion.span>
                      <MaturityScore score={section.score} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{section.description}</p>
                  {section.features && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.2 }}
                    >
                      <PlayerFeatureTable
                        features={section.features}
                        players={players}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <motion.span
            className="w-2 h-2 bg-purple-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          />
          Top Players
        </h4>
        <div className="space-y-3">
          {players.map((player, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={playerVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="border-l-4 border-purple-500 pl-4 py-3 rounded-r-lg bg-gradient-to-r from-transparent to-purple-50 dark:to-purple-900/20"
            >
              <div className="flex items-center space-x-3">
                {player.iconUrl && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={player.iconUrl}
                      alt={`${player.name} icon`}
                      width={28}
                      height={28}
                      className="rounded-full ring-2 ring-purple-200 dark:ring-purple-700"
                      unoptimized
                      loader={({ src }) => src.startsWith('/') ? src : `/${src}`}
                    />
                  </motion.div>
                )}
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{player.name}</div>
                  <div className="text-sm text-gray-500">{player.company}</div>
                  {player.context_window && (
                    <motion.div
                      className="text-xs text-blue-600 dark:text-blue-400 font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Context: {(player.context_window / 1000).toFixed(0)}k tokens
                    </motion.div>
                  )}
                </div>
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {player.notable_features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="text-gray-600 dark:text-gray-400 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              {player.benchmark_scores && (
                <motion.div
                  className="mt-3 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
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
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>


      {isPopupOpen && selectedSubsection && (
        <SubcategoryPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title={selectedSubsection.name.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          description={selectedSubsection.data.description}
          players={players}
          features={selectedSubsection.data.features}
          benchmarks={[
            {
              name: 'Maturity Score',
              scores: {
                [players[0].name]: `${selectedSubsection.data.score}/100`
              }
            }
          ]}
        />
      )}
    </motion.div>
  );
};

export default CapabilityCard;
