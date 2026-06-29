import React from 'react';

interface HeaderProps {
  totalItems: number;
  uploadedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalItems, uploadedCount }) => {
  const progress = totalItems > 0 ? (uploadedCount / totalItems) * 100 : 0;

  return (
    <header className="glass-card p-6 mb-6 fade-in-scale">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
               style={{ background: 'linear-gradient(135deg, #34C759 0%, #AF52DE 50%, #FFCC00 100%)' }}>
            🍽️
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">منوی غذا</h1>
            <p className="text-xs text-gray-500 mt-0.5">آپلود تصاویر و خروجی ZIP</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-gray-500 mb-1">
            {uploadedCount} از {totalItems} تصویر
          </span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #34C759, #AF52DE, #FFCC00)',
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
