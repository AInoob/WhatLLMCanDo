import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Top Players Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Top Players</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((player, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
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

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Done</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubcategoryPopup;
