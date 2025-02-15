import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Player, Subsection } from '../types/llm';
import MaturityScore from './MaturityScore';
import PlayerFeatureTable from './PlayerFeatureTable';
import SubcategoryPopup from './SubcategoryPopup';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${stageColors[stage]}`}>
            {stage}
          </span>
          <MaturityScore score={score} />
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      

      
      {subsections && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Subsections</h4>
          <div className="space-y-4">
            {Object.entries(subsections).map(([name, section]: [string, Subsection], index) => (
              <div 
                key={index} 
                className="border-l-4 border-blue-500 pl-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-sm"
                onClick={() => handleSubsectionClick(name, section)}
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium">
                    {name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[section.stage]}`}>
                      {section.stage}
                    </span>
                    <MaturityScore score={section.score} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{section.description}</p>
                {section.features && (
                  <div className="mt-4">
                    <PlayerFeatureTable 
                      features={section.features}
                      players={players}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Top Players</h4>
        <div className="space-y-4">
          {players.map((player, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center space-x-2">
                {player.iconUrl && (
                  <Image 
                    src={player.iconUrl} 
                    alt={`${player.name} icon`}
                    width={24}
                    height={24}
                    className="rounded-full"
                    unoptimized
                    loader={({ src }) => src.startsWith('/') ? src : `/${src}`}
                  />
                )}
                <div>
                  <div className="font-medium">{player.name}</div>
                  <div className="text-sm text-gray-500">{player.company}</div>
                  {player.context_window && (
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      Context: {(player.context_window / 1000).toFixed(0)}k tokens
                    </div>
                  )}
                </div>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm">
                {player.notable_features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-400">{feature}</li>
                ))}
              </ul>
              {player.benchmark_scores && (
                <div className="mt-2 text-xs space-y-1">
                  {player.benchmark_scores.mmlu && (
                    <div className="text-green-600 dark:text-green-400">
                      MMLU: {player.benchmark_scores.mmlu.toFixed(1)}%
                    </div>
                  )}
                  {player.benchmark_scores.humaneval && (
                    <div className="text-blue-600 dark:text-blue-400">
                      HumanEval: {player.benchmark_scores.humaneval.toFixed(1)}%
                    </div>
                  )}
                  {player.benchmark_scores.swe_bench && (
                    <div className="text-purple-600 dark:text-purple-400">
                      SWE-bench: {player.benchmark_scores.swe_bench.toFixed(1)}%
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


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
