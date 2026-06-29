import React, { useState, useCallback, useMemo, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { menuCategories, Category } from './data/menuData';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { BulkUpload } from './components/BulkUpload';
import { ExportButton } from './components/ExportButton';
import { Toast, ToastMessage } from './components/Toast';

function App() {
  // Map of itemId -> { file: File, url: string }
  const [images, setImages] = useState<Record<string, { file: File; url: string }>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(menuCategories[0]?.id || null);
  const [isExporting, setIsExporting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const addToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, text, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleImageUpload = useCallback((itemId: string, file: File) => {
    const url = URL.createObjectURL(file);
    setImages((prev) => {
      if (prev[itemId]?.url) {
        URL.revokeObjectURL(prev[itemId].url);
      }
      return { ...prev, [itemId]: { file, url } };
    });
    addToast('تصویر با موفقیت آپلود شد', 'success');
  }, [addToast]);

  const handleImageRemove = useCallback((itemId: string) => {
    setImages((prev) => {
      if (prev[itemId]?.url) {
        URL.revokeObjectURL(prev[itemId].url);
      }
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    addToast('تصویر حذف شد', 'info');
  }, [addToast]);

  const handleBulkUpload = useCallback((categoryId: string, files: FileList) => {
    const category = menuCategories.find((c) => c.id === categoryId);
    if (!category) return;

    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      addToast('فایل تصویری یافت نشد', 'error');
      return;
    }

    setImages((prev) => {
      const next = { ...prev };
      // Find items without images first, then fill remaining
      const itemsWithoutImage = category.items.filter((item) => !next[item.id]);
      const itemsToFill = [...itemsWithoutImage, ...category.items.filter((item) => next[item.id])];

      imageFiles.forEach((file, i) => {
        if (i < itemsToFill.length) {
          const item = itemsToFill[i];
          if (next[item.id]?.url) {
            URL.revokeObjectURL(next[item.id].url);
          }
          next[item.id] = { file, url: URL.createObjectURL(file) };
        }
      });
      return next;
    });

    addToast(`${imageFiles.length} تصویر برای «${category.name}» آپلود شد`, 'success');
  }, [addToast]);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();

      for (const category of menuCategories) {
        const catItems = category.items.filter((item) => images[item.id]);
        if (catItems.length === 0) continue;

        const folderName = `${category.name}`;
        const folder = zip.folder(folderName);
        if (!folder) continue;

        for (const item of catItems) {
          const img = images[item.id];
          if (!img) continue;

          const ext = img.file.name.split('.').pop() || 'jpg';
          const fileName = `${item.name}.${ext}`;
          const arrayBuffer = await img.file.arrayBuffer();
          folder.file(fileName, arrayBuffer);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'منوی-غذا-تصاویر.zip');
      addToast('فایل ZIP با موفقیت ساخته شد!', 'success');
    } catch (err) {
      console.error(err);
      addToast('خطا در ساخت فایل ZIP', 'error');
    } finally {
      setIsExporting(false);
    }
  }, [images, addToast]);

  const handleCategoryClick = useCallback((id: string) => {
    setActiveCategory(id);
    const el = categoryRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Stats
  const totalItems = useMemo(() => menuCategories.reduce((sum, cat) => sum + cat.items.length, 0), []);
  const uploadedCount = Object.keys(images).length;

  const uploadedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of menuCategories) {
      counts[cat.id] = cat.items.filter((item) => images[item.id]).length;
    }
    return counts;
  }, [images]);

  // Scroll spy
  const handleScroll = useCallback(() => {
    const entries = menuCategories.map((cat) => ({
      id: cat.id,
      el: categoryRefs.current[cat.id],
    })).filter((e) => e.el);

    for (const entry of entries) {
      if (entry.el) {
        const rect = entry.el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 100) {
          setActiveCategory(entry.id);
          break;
        }
      }
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen pb-28">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, #AF52DE 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full opacity-15"
             style={{ background: 'radial-gradient(circle, #34C759 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-15"
             style={{ background: 'radial-gradient(circle, #FFCC00 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-6">
        <Header totalItems={totalItems} uploadedCount={uploadedCount} />

        {/* Sticky category navigation */}
        <div className="sticky top-0 z-20 -mx-4 px-4 py-2"
             style={{ 
               background: 'rgba(240, 230, 255, 0.8)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)',
             }}>
          <CategoryNav
            categories={menuCategories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            uploadedCounts={uploadedCounts}
          />
        </div>

        {/* Categories */}
        {menuCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            images={images}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            onBulkUpload={handleBulkUpload}
            ref={(el) => { categoryRefs.current[category.id] = el; }}
          />
        ))}

        {/* Footer */}
        <footer className="glass-card p-5 mt-8 mb-4 text-center fade-in-scale">
          <p className="text-xs text-gray-500 leading-relaxed">
            طراحی و توسعه توسط{' '}
            <span className="font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #34C759, #AF52DE)' }}>
              احسان احترامی
            </span>
            {' '}| تابستان ۱۴۰۵
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#34C759]"></span>
            <span className="w-2 h-2 rounded-full bg-[#AF52DE]"></span>
            <span className="w-2 h-2 rounded-full bg-[#FFCC00]"></span>
          </div>
        </footer>
      </div>

      <ExportButton
        onClick={handleExport}
        isExporting={isExporting}
        uploadedCount={uploadedCount}
      />

      <Toast messages={toasts} onRemove={removeToast} />
    </div>
  );
}

// Category Section Component
interface CategorySectionProps {
  category: Category;
  images: Record<string, { file: File; url: string }>;
  onImageUpload: (itemId: string, file: File) => void;
  onImageRemove: (itemId: string) => void;
  onBulkUpload: (categoryId: string, files: FileList) => void;
}

const CategorySection = React.forwardRef<HTMLDivElement, CategorySectionProps>(
  ({ category, images, onImageUpload, onImageRemove, onBulkUpload }, ref) => {
    // Group items by subcategory
    const groupedItems = useMemo(() => {
      const groups: { subcategory: string | null; items: typeof category.items }[] = [];
      const subcategories = new Map<string | undefined, typeof category.items>();

      for (const item of category.items) {
        const key = item.subcategory || undefined;
        if (!subcategories.has(key)) {
          subcategories.set(key, []);
        }
        subcategories.get(key)!.push(item);
      }

      for (const [key, items] of subcategories) {
        groups.push({ subcategory: key || null, items });
      }

      return groups;
    }, [category.items]);

    const uploadedInCategory = category.items.filter((item) => images[item.id]).length;
    const totalInCategory = category.items.length;

    return (
      <div ref={ref} className="mb-6 scroll-mt-24" id={`cat-${category.id}`}>
        <div className="glass-card overflow-hidden">
          {/* Category header */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.emoji}</span>
                <div>
                  <h2 className="text-base font-bold text-gray-800">{category.name}</h2>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {totalInCategory} آیتم · {uploadedInCategory} تصویر آپلود شده
                  </p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${category.colorClass}`}>
                {uploadedInCategory}/{totalInCategory}
              </span>
            </div>

            {/* Progress for category */}
            <div className="mt-3 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${totalInCategory > 0 ? (uploadedInCategory / totalInCategory) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, #34C759, #AF52DE)',
                }}
              />
            </div>
          </div>

          {/* Bulk upload */}
          <div className="p-4 pb-0">
            <BulkUpload category={category} onBulkUpload={onBulkUpload} />
          </div>

          {/* Items */}
          <div className="p-4 pt-0">
            {groupedItems.map((group, gi) => (
              <div key={gi}>
                {group.subcategory && (
                  <div className="flex items-center gap-2 mb-2 mt-3">
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-200"></div>
                    <span className="text-[11px] font-medium text-purple-400 px-2">
                      {group.subcategory}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-200"></div>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {group.items.map((item, idx) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      imageUrl={images[item.id]?.url || null}
                      onImageUpload={onImageUpload}
                      onImageRemove={onImageRemove}
                      index={gi * 10 + idx}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

CategorySection.displayName = 'CategorySection';

export default App;
