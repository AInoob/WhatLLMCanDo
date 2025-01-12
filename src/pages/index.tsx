import React from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import CapabilityCard from '../components/CapabilityCard';
import llmCapabilitiesJson from '../data/llm_capabilities.json';
import { CapabilitiesData } from '../types/llm';

const capabilities = llmCapabilitiesJson as CapabilitiesData;

const Home = observer(() => {

  return (
    <motion.main 
      key="main-content"
      className="min-h-screen p-8 pb-32 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        key="main-title"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        What LLMs Can Do
      </motion.h1>
      
      <motion.p
        className="text-xl text-center mb-12 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Exploring the capabilities of Large Language Models across different domains
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(capabilities.capabilities)
          .map(([key, capability]: [string, typeof capabilities.capabilities[keyof typeof capabilities.capabilities]]) => {
            return [key, capability] as const;
          })
          .map(([key, capability], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <CapabilityCard
                title={key === 'chat' ? 'Chat' : key.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                description={capability.description}
                stage={capability.stage}
                score={capability.score}
                subsections={capability.subsections}
                players={capability.top_players}
              />
            </motion.div>
          ))}
      </div>


    </motion.main>
  );
});

export default Home;
