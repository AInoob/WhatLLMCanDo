import { observer } from 'mobx-react-lite'
import { Section } from '../components/Section'
import { TreeNode, TreeNodeData } from '../components/TreeNode'
import { motion } from 'framer-motion'

interface CategoryData extends TreeNodeData {
  memeUrl: string;
}

const llmCapabilitiesData: CategoryData[] = [
  {
    label: "Chat",
    description: "Ask questions, solve puzzles, and have conversations",
    memeUrl: "/images/cat-chat-general.jpg",
    children: [
      {
        label: "General Q&A",
        description: "Ask about anything - math, puzzles, or whether to eat cheese",
        memeUrl: "/images/cat-chat-qa.jpg"
      },
      {
        label: "Realtime Audio Conversation",
        description: "Talk naturally with AI using voice",
        memeUrl: "/images/cat-chat-audio.jpg"
      },
      {
        label: "Realtime Video Conversation",
        description: "Face-to-face conversations with AI",
        memeUrl: "/images/cat-chat-video.jpg"
      }
    ]
  },
  {
    label: "Coding",
    description: "AI-powered software development assistance",
    memeUrl: "/images/cat-coding-general.jpg",
    children: [
      {
        label: "Code Completion",
        description: "Smart code suggestions as you type",
        memeUrl: "/images/cat-coding-completion.jpg"
      },
      {
        label: "Code Review",
        description: "AI reviews your code for improvements",
        memeUrl: "/images/cat-coding-review.jpg"
      },
      {
        label: "Task Completion",
        description: "AI helps complete coding tasks",
        memeUrl: "/images/cat-coding-task.jpg"
      }
    ]
  },
  {
    label: "Transcribe Audio",
    description: "Convert speech to text automatically",
    memeUrl: "/images/cat-transcribe.jpg"
  },
  {
    label: "Image Generation",
    description: "Create images from text descriptions",
    memeUrl: "/images/cat-image-gen.jpg"
  },
  {
    label: "Search",
    description: "Find information quickly and accurately",
    memeUrl: "/images/cat-search.jpg"
  }
];

function Home() {
  return (
    <motion.main 
      className="min-h-screen p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        What LLMs Can Do in 2025
      </motion.h1>
      
      <motion.p
        className="text-xl text-center mb-12 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Exploring the capabilities of Large Language Models across different domains
      </motion.p>

      <div className="space-y-16">
        {llmCapabilitiesData.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <Section title={category.label} memeUrl={category.memeUrl}>
              <div className="space-y-4">
                <TreeNode {...category} />
              </div>
            </Section>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

export default observer(Home)
