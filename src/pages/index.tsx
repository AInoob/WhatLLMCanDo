import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Section } from '../components/Section'
import { motion, AnimatePresence } from 'framer-motion'

interface CategoryData {
  memeUrl: string;
  children?: CategoryData[];
}

const llmCapabilitiesData: CategoryData[] = [
  {
    memeUrl: "/images/cat-chat-general.jpg",
    children: [
      {
        memeUrl: "/images/cat-chat-qa.jpg"
      },
      {
        memeUrl: "/images/cat-chat-audio.jpg"
      },
      {
        memeUrl: "/images/cat-chat-video.jpg"
      }
    ]
  },
  {
    memeUrl: "/images/cat-coding-general.jpg",
    children: [
      {
        memeUrl: "/images/cat-coding-completion.jpg"
      },
      {
        memeUrl: "/images/cat-coding-review.jpg"
      },
      {
        memeUrl: "/images/cat-coding-task.jpg"
      }
    ]
  },
  {
    memeUrl: "/images/cat-transcribe.jpg"
  },
  {
    memeUrl: "/images/cat-image-gen.jpg"
  },
  {
    memeUrl: "/images/cat-search.jpg"
  }
];

function Home() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  return (
    <motion.main 
      className="min-h-screen p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/images/cat-title.jpg" 
          alt="What LLMs Can Do - Title Meme"
          className="max-w-2xl mx-auto rounded-lg shadow-lg"
        />
      </motion.div>

      <div className="space-y-16">
        {llmCapabilitiesData.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <Section 
              memeUrl={category.memeUrl} 
              onClick={() => setOpenSection(openSection === index ? null : index)}
            >
              <AnimatePresence>
                {openSection === index && category.children && (
                  <motion.div
                    className="mt-4 space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {category.children.map((child, childIndex) => (
                      <Section
                        key={childIndex}
                        memeUrl={child.memeUrl}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Section>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

export default observer(Home)
