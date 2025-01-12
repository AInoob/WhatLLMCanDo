import React from 'react';
import { motion } from 'framer-motion';

const IssueButton: React.FC = () => {
  return (
    <motion.a
      href="https://github.com/AInoob/WhatLLMCanDo/issues/new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50 flex items-center space-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <span>Create Issue</span>
    </motion.a>
  );
};

export default IssueButton;
