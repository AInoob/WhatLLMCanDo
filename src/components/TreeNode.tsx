import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TreeNodeProps {
  label: string;
  description?: string;
  children?: TreeNodeData[];
  depth?: number;
}

export interface TreeNodeData {
  label: string;
  description?: string;
  children?: TreeNodeData[];
}

export function TreeNode({ label, description, children, depth = 0 }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = children && children.length > 0;
  const indent = depth * 20;

  return (
    <div className="my-2">
      <motion.div
        className="flex items-start cursor-pointer"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        initial={false}
        animate={{ opacity: 1 }}
        style={{ marginLeft: `${indent}px` }}
      >
        {hasChildren && (
          <motion.span
            className="mr-2 inline-block"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▶
          </motion.span>
        )}
        <div>
          <span className="font-semibold">{label}</span>
          {description && (
            <motion.p
              className="text-sm text-gray-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children.map((child, index) => (
              <TreeNode
                key={`${child.label}-${index}`}
                {...child}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
