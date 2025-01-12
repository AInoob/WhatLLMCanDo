import React from 'react';
import { Player } from '../types/llm';

interface SubcategoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  players: Player[];
  articles?: Array<{
    title: string;
    url: string;
    description: string;
  }>;
  videos?: Array<{
    title: string;
    url: string;
    thumbnail?: string;
  }>;
}

const SubcategoryPopup: React.FC<SubcategoryPopupProps> = ({
  isOpen,
  onClose,
  title,
  description,
  players,
  articles = [],
  videos = [],
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mt-2">
                {description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Top Players Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Top Players</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.map((player, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    {player.iconUrl && (
                      <img 
                        src={player.iconUrl} 
                        alt={`${player.name} icon`}
                        className="w-8 h-8 mb-2 rounded-full"
                      />
                    )}
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.company}</div>
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {player.notable_features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-400">{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Section */}
            {articles.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Related Articles</h3>
                <div className="space-y-3">
                  {articles.map((article, index) => (
                    <a
                      key={index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {article.description}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Section */}
            {videos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Related Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full object-cover aspect-video"
                        />
                      )}
                      <div className="p-4">
                        <div className="font-medium">{video.title}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPopup;
