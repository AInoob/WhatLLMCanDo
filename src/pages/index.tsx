import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Section } from '../components/Section'
import { motion } from 'framer-motion'
import { Modal } from '../components/Modal'
import { useLanguage } from '../contexts/LanguageContext'

interface CategoryData {
  memeUrl: string;
  children?: CategoryData[];
}

const llmCapabilitiesData: CategoryData[] = [
  {
    memeUrl: "/cat-chat-general.jpg",
    children: [
      {
        memeUrl: "/cat-chat-qa.jpg"
      },
      {
        memeUrl: "/cat-chat-audio.jpg"
      },
      {
        memeUrl: "/cat-chat-video.jpg"
      }
    ]
  },
  {
    memeUrl: "/cat-coding-general.jpg",
    children: [
      {
        memeUrl: "/cat-coding-completion.jpg"
      },
      {
        memeUrl: "/cat-coding-review.jpg"
      },
      {
        memeUrl: "/cat-coding-task.jpg"
      }
    ]
  },
  {
    memeUrl: "/cat-transcribe.jpg"
  },
  {
    memeUrl: "/cat-image-gen.jpg"
  },
  {
    memeUrl: "/cat-search.jpg"
  }
];
function Home() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const { language, setLanguage } = useLanguage();
  return (
    <motion.main 
      key="main-content"
      className="min-h-screen p-8 pb-32 max-w-6xl mx-auto"
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
        <div className="fixed top-4 right-4 flex gap-2 z-50">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('zh')}
            className={`px-4 py-2 rounded ${language === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            中文
          </button>
        </div>
        <img 
          src={`/images/${language}/cat-title.jpg`}
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
              memeUrl={`/images/${language}${category.memeUrl}`} 
              onClick={() => setOpenSection(openSection === index ? null : index)}
            >
              <Modal
                isOpen={openSection === index}
                onClose={() => setOpenSection(null)}
              >
                <div className="space-y-4">
                  {category.children?.map((child, childIndex) => (
                    <Section
                      key={childIndex}
                      memeUrl={`/images/${language}${child.memeUrl}`}
                    />
                  ))}
                </div>
              </Modal>
            </Section>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}

export default observer(Home);
