import React from 'react';

interface ExportButtonProps {
  onClick: () => void;
  isExporting: boolean;
  uploadedCount: number;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onClick, isExporting, uploadedCount }) => {
  if (uploadedCount === 0) return null;

  return (
    <button
      onClick={onClick}
      disabled={isExporting}
      className="fab-button fixed bottom-6 left-1/2 -translate-x-1/2 z-40
                 px-7 py-4 rounded-2xl text-white font-bold text-sm
                 flex items-center gap-3 disabled:opacity-60"
    >
      {isExporting ? (
        <>
          <span className="animate-spin text-lg">⏳</span>
          <span>در حال ساخت ZIP...</span>
        </>
      ) : (
        <>
          <span className="text-lg">📦</span>
          <span>خروجی ZIP ({uploadedCount} تصویر)</span>
        </>
      )}
    </button>
  );
};
