// Add this component above your FeedPage export
import { useState, useEffect } from 'react';

export default function ExpandablePostContent({ content }: { content: String }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = content.length > 180;

  return (
    <div className="mb-4">
      <p
        className={`text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-300 ${
          !expanded && isLong ? 'line-clamp-3' : ''
        }`}
      >
        {content}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline focus:outline-none"
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
}