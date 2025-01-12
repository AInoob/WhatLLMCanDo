import { observer } from 'mobx-react-lite'
import { Section } from '../components/Section'
import { TreeNode, TreeNodeData } from '../components/TreeNode'
import { motion } from 'framer-motion'
import { RatingBar } from '../components/RatingBar'
import { ToolCard, ToolInfo } from '../components/ToolCard'
import { ResourceSection, Resource } from '../components/ResourceSection'

interface CategoryData extends TreeNodeData {
  rating: number;
  tools?: ToolInfo[];
  resources?: {
    videos: Resource[];
    articles: Resource[];
    news: Resource[];
  };
}

const llmCapabilitiesData: CategoryData[] = [
  {
    label: "Chat and Communication",
    description: "Advanced conversational capabilities across multiple contexts",
    rating: 8.5,
    tools: [
      {
        name: "GPT-4",
        provider: "OpenAI",
        description: "Leading conversational AI with extensive context window",
        rating: 9
      },
      {
        name: "Claude 3",
        provider: "Anthropic",
        description: "Advanced AI focused on thoughtful, nuanced responses",
        rating: 8.5
      },
      {
        name: "LLaMA 3.1",
        provider: "Meta",
        description: "Open-source model with strong multilingual capabilities",
        rating: 8
      }
    ],
    resources: {
      videos: [
        {
          title: "GPT-4's Advanced Chat Capabilities Explained",
          url: "https://youtube.com/example1",
          source: "OpenAI",
          date: "2025-01-05",
          description: "Deep dive into GPT-4's conversational abilities and context handling",
          type: "video",
          thumbnail: "https://example.com/thumbnail1.jpg"
        },
        {
          title: "The Evolution of Conversational AI",
          url: "https://youtube.com/example2",
          source: "AI Research Weekly",
          date: "2024-12-28",
          description: "How chat models have evolved from basic Q&A to complex conversations",
          type: "video",
          thumbnail: "https://example.com/thumbnail2.jpg"
        }
      ],
      articles: [
        {
          title: "Understanding Context Windows in Modern LLMs",
          url: "https://example.com/article1",
          source: "AI Research Journal",
          date: "2025-01-10",
          description: "Technical analysis of how LLMs handle extended context",
          type: "article"
        },
        {
          title: "The Future of Human-AI Communication",
          url: "https://example.com/article2",
          source: "Tech Review",
          date: "2025-01-08",
          description: "Exploring the impact of advanced chat models on communication",
          type: "article"
        }
      ],
      news: [
        {
          title: "Claude 3 Breaks Record in Conversation Length",
          url: "https://example.com/news1",
          source: "Tech News Daily",
          date: "2025-01-11",
          description: "Anthropic's latest model achieves breakthrough in conversation duration",
          type: "news"
        },
        {
          title: "Meta Releases LLaMA 3.1 with Enhanced Multilingual Support",
          url: "https://example.com/news2",
          source: "AI News",
          date: "2025-01-09",
          description: "New open-source model supports 100+ languages with improved accuracy",
          type: "news"
        }
      ]
    },
    children: [
      {
        label: "Conversational Abilities",
        children: [
          { label: "Context Length", description: "Understanding up to 128,000 tokens (GPT-4, LLaMA 3.1)" },
          { label: "Multi-turn Dialog", description: "Maintaining context across multiple exchanges" },
          { label: "Memory Management", description: "Retaining and referencing previous conversation points" }
        ]
      },
      {
        label: "Language Support",
        children: [
          { label: "Multilingual", description: "Support for hundreds of languages" },
          { label: "Cross-lingual", description: "Ability to translate and understand between languages" }
        ]
      }
    ]
  },
  {
    label: "Coding Capabilities",
    description: "Comprehensive software development assistance",
    rating: 7.5,
    tools: [
      {
        name: "GitHub Copilot",
        provider: "GitHub/OpenAI",
        description: "Advanced code completion and generation",
        rating: 8.5
      },
      {
        name: "Amazon CodeWhisperer",
        provider: "Amazon",
        description: "AI-powered code suggestions with security scanning",
        rating: 7.5
      },
      {
        name: "Devin",
        provider: "Cognition Labs",
        description: "Autonomous software development assistant",
        rating: 6.5
      }
    ],
    resources: {
      videos: [
        {
          title: "GitHub Copilot: Beyond Code Completion",
          url: "https://youtube.com/example3",
          source: "GitHub",
          date: "2025-01-07",
          description: "Advanced features and capabilities of the latest Copilot version",
          type: "video",
          thumbnail: "https://example.com/thumbnail3.jpg"
        }
      ],
      articles: [
        {
          title: "AI Pair Programming: A New Era",
          url: "https://example.com/article3",
          source: "Dev.to",
          date: "2025-01-06",
          description: "How AI is transforming the way developers write code",
          type: "article"
        }
      ],
      news: [
        {
          title: "Devin Achieves Human-Level Performance in System Design",
          url: "https://example.com/news3",
          source: "TechCrunch",
          date: "2025-01-12",
          description: "AI developer assistant shows remarkable capabilities in complex tasks",
          type: "news"
        }
      ]
    },
    children: [
      {
        label: "Code Operations",
        children: [
          { label: "Generation", description: "Creating code from natural language descriptions" },
          { label: "Translation", description: "Converting between programming languages" },
          { label: "Review", description: "Identifying bugs and suggesting improvements" }
        ]
      }
    ]
  },
  {
    label: "Text Processing",
    description: "Advanced text analysis and generation capabilities",
    rating: 9,
    tools: [
      {
        name: "GPT-4",
        provider: "OpenAI",
        description: "State-of-the-art text generation and analysis",
        rating: 9.5
      },
      {
        name: "Gemini Ultra",
        provider: "Google",
        description: "Advanced text processing with multimodal capabilities",
        rating: 9
      }
    ],
    resources: {
      videos: [],
      articles: [],
      news: []
    },
    children: [
      {
        label: "Content Creation",
        children: [
          { label: "Blog Posts", description: "Writing engaging blog content" },
          { label: "Marketing Copy", description: "Creating compelling marketing materials" }
        ]
      }
    ]
  },
  {
    label: "Specialized Tasks",
    description: "Focused capabilities for specific domains",
    rating: 7,
    tools: [
      {
        name: "Claude Analytics",
        provider: "Anthropic",
        description: "Specialized in data analysis and interpretation",
        rating: 7.5
      },
      {
        name: "Moderation AI",
        provider: "OpenAI",
        description: "Content moderation and safety analysis",
        rating: 8
      }
    ],
    resources: {
      videos: [],
      articles: [],
      news: []
    },
    children: [
      {
        label: "Analysis",
        children: [
          { label: "Data Interpretation", description: "Understanding and explaining data patterns" },
          { label: "Sentiment Analysis", description: "Detecting emotional tone in text" }
        ]
      }
    ]
  },
  {
    label: "Enterprise Applications",
    description: "Business-focused solutions and integrations",
    rating: 6.5,
    tools: [
      {
        name: "Microsoft Copilot for Enterprise",
        provider: "Microsoft",
        description: "Integrated enterprise automation and assistance",
        rating: 7
      },
      {
        name: "Watson Enterprise",
        provider: "IBM",
        description: "Enterprise-grade AI solutions",
        rating: 6.5
      }
    ],
    resources: {
      videos: [],
      articles: [],
      news: []
    },
    children: [
      {
        label: "Document Management",
        children: [
          { label: "Processing", description: "Automated document analysis and handling" },
          { label: "Knowledge Base", description: "Managing internal information systems" }
        ]
      }
    ]
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
            <Section title={category.label}>
              <div className="space-y-4">
                <RatingBar 
                  rating={category.rating} 
                  label="Category Maturity" 
                  size="lg"
                />
                
                <TreeNode {...category} />

                {category.tools && (
                  <div>
                    <h3 className="font-semibold text-lg mt-6 mb-3">Available Tools</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.tools.map((tool, toolIndex) => (
                        <ToolCard key={toolIndex} tool={tool} />
                      ))}
                    </div>
                  </div>
                )}

                {category.resources && (
                  <div className="mt-8 space-y-8">
                    <ResourceSection 
                      resources={category.resources.videos}
                      type="video"
                    />
                    <ResourceSection 
                      resources={category.resources.articles}
                      type="article"
                    />
                    <ResourceSection 
                      resources={category.resources.news}
                      type="news"
                    />
                  </div>
                )}
              </div>
            </Section>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

export default observer(Home)
