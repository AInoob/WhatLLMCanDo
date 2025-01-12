import React from 'react';
import { motion } from 'framer-motion';
import { CodingTool } from '../types/llm';

interface CodingToolsTableProps {
  tools: { [key: string]: CodingTool };
}

const CodingToolsTable: React.FC<CodingToolsTableProps> = ({ tools }) => {
  const capabilities = ['code_completion', 'code_modification', 'pr_review', 'agentic_programming'] as const;
  const capabilityNames: Record<typeof capabilities[number], string> = {
    code_completion: 'Code Completion',
    code_modification: 'Code Modification',
    pr_review: 'PR Review',
    agentic_programming: 'Agentic Programming'
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Tool
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Company
            </th>
            {capabilities.map((cap) => (
              <th key={cap} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {capabilityNames[cap]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {Object.entries(tools).map(([key, tool], index) => (
            <motion.tr
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {tool.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {tool.company}
              </td>
              {capabilities.map((cap) => (
                <td key={cap} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {tool.capabilities[cap]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodingToolsTable;
