import React, { useRef, useState } from 'react';
import { MenuItem } from '../data/menuData';

interface MenuItemCardProps {
  item: MenuItem;
  imageUrl: string | null;
  onImageUpload: (itemId: string, file: File) => void;
  onImageRemove: (itemId: string) => void;
  index: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  imageUrl,
  onImageUpload,
  onImageRemove,
  index,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(item.id, file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(item.id, file);
    }
    e.target.value = '';
  };

  return (
    <div
      className="item-enter"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div
        className={`
          glass-card-subtle p-3 transition-all duration-300
          hover:shadow-lg hover:bg-white/70
          ${isDragging ? 'ring-2 ring-purple-400 bg-purple-50/30' : ''}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-3">
          {/* Image area */}
          <div
            className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative group"
            onClick={() => fileInputRef.current?.click()}
          >
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-lg transition-opacity">
                    ✏️
                  </span>
                </div>
              </>
            ) : (
              <div className={`
                w-full h-full flex flex-col items-center justify-center
                bg-gradient-to-br from-purple-50 to-green-50
                border-2 border-dashed border-gray-300
                group-hover:border-purple-400 transition-colors
                rounded-xl
              `}>
                <span className="text-gray-400 text-lg">📷</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Item info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h3>
            {item.subcategory && (
              <p className="text-[10px] text-gray-400 mt-0.5">{item.subcategory}</p>
            )}
            <div className="flex items-center gap-1 mt-1.5">
              {imageUrl ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                  ✓ آپلود شده
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  بدون تصویر
                </span>
              )}
            </div>
          </div>

          {/* Action button */}
          {imageUrl && (
            <button
              onClick={(e) => { e.stopPropagation(); onImageRemove(item.id); }}
              className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center
                         bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600
                         transition-all duration-200 text-xs"
              title="حذف تصویر"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
