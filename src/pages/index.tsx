import React from 'react';
import { observer } from 'mobx-react-lite';
import { motion, useScroll, useTransform } from 'framer-motion';
import CapabilityCard from '../components/CapabilityCard';
import llmCapabilitiesJson from '../data/llm_capabilities.json';
import { CapabilitiesData } from '../types/llm';
import IssueButton from '../components/IssueButton';

const capabilities = llmCapabilitiesJson as CapabilitiesData;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.1
    }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut"
    }
  }
};

const floatingOrbVariants = {
  animate: {
    y: [0, -15, 0],
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Home = observer(() => {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  return (
    <motion.main
      key="main-content"
      className="min-h-screen p-8 pb-32 max-w-6xl mx-auto relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none"
        variants={floatingOrbVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl pointer-events-none"
        variants={floatingOrbVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-green-400/15 to-blue-400/15 blur-3xl pointer-events-none"
        variants={floatingOrbVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />

      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative z-10"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 text-center gradient-text"
          variants={titleVariants}
        >
          What LLMs Can Do
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-center mb-16 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          variants={subtitleVariants}
        >
          Exploring the capabilities of Large Language Models across different domains
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        variants={containerVariants}
      >
        {Object.entries(capabilities.capabilities)
          .map(([key, capability]: [string, typeof capabilities.capabilities[keyof typeof capabilities.capabilities]]) => {
            return [key, capability] as const;
          })
          .map(([key, capability], index) => (
            <motion.div
              key={index}
              variants={cardContainerVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
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
      </motion.div>

      <IssueButton />
    </motion.main>
  );
});

export default Home;
