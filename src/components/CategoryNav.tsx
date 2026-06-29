import React from 'react';
import { Category } from '../data/menuData';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryClick: (id: string) => void;
  uploadedCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  uploadedCounts,
}) => {
  return (
    <div className="mb-5 fade-in-scale">
      <div className="flex gap-2 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const uploaded = uploadedCounts[cat.id] || 0;
          const total = cat.items.length;
          const isComplete = uploaded === total && total > 0;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className={`
                flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium
                transition-all duration-300 border
                ${isActive
                  ? 'text-white shadow-lg scale-[1.02]'
                  : 'text-gray-700 hover:bg-white/60 border-white/30 bg-white/40'
                }
              `}
              style={isActive ? {
                background: 'linear-gradient(135deg, #34C759 0%, #AF52DE 100%)',
                borderColor: 'transparent',
                boxShadow: '0 4px 20px rgba(52, 199, 89, 0.3)',
              } : {}}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="whitespace-nowrap">{cat.name}</span>
              {isComplete && (
                <span className="w-5 h-5 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center">
                  ✓
                </span>
              )}
              {!isComplete && uploaded > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30">
                  {uploaded}/{total}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
