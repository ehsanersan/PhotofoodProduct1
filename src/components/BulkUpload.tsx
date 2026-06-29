import React, { useRef, useState } from 'react';
import { Category } from '../data/menuData';

interface BulkUploadProps {
  category: Category;
  onBulkUpload: (categoryId: string, files: FileList) => void;
}

export const BulkUpload: React.FC<BulkUploadProps> = ({ category, onBulkUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onBulkUpload(category.id, files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onBulkUpload(category.id, files);
    }
    e.target.value = '';
  };

  return (
    <div
      className={`upload-zone p-5 text-center cursor-pointer transition-all duration-300 mb-4 ${isDragging ? 'dragging' : ''}`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
             style={{ background: 'linear-gradient(135deg, rgba(175,82,222,0.1), rgba(52,199,89,0.1))' }}>
          📁
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">
            آپلود دسته‌ای برای «{category.name}»
          </p>
          <p className="text-xs text-gray-400 mt-1">
            تصاویر به ترتیب به آیتم‌ها اختصاص داده می‌شوند
          </p>
          <p className="text-[10px] text-purple-400 mt-1">
            فایل‌ها را بکشید و رها کنید یا کلیک کنید
          </p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
