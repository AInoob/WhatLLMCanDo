import { motion } from 'framer-motion';
import Image from 'next/image';

export interface Resource {
  title: string;
  url: string;
  source: string;
  date: string;
  description: string;
  type: 'video' | 'article' | 'news';
  thumbnail?: string;
}

interface ResourceSectionProps {
  resources: Resource[];
  type: 'video' | 'article' | 'news';
}

export function ResourceSection({ resources, type }: ResourceSectionProps) {
  const typeTitle = {
    video: 'Featured Videos',
    article: 'Recommended Articles',
    news: 'Latest News'
  }[type];

  const typeIcon = {
    video: '🎥',
    article: '📚',
    news: '📰'
  }[type];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="mr-2">{typeIcon}</span>
        {typeTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <motion.a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {resource.thumbnail && (
              <div className="relative h-40 bg-gray-100">
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  width={320}
                  height={160}
                  className="object-cover"
                  style={{ width: '100%', height: '100%' }}
                />
                {type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-80">
                      <span className="text-2xl">▶️</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                {resource.title}
              </h4>
              <p className="text-sm text-gray-500 mb-2">
                {resource.source} • {resource.date}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {resource.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
