export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  colorClass: string;
  items: MenuItem[];
}

let idCounter = 0;
function makeId(): string {
  return `item-${++idCounter}`;
}

export const menuCategories: Category[] = [
  {
    id: "polovi",
    name: "غذاهای پلویی",
    emoji: "🍚",
    colorClass: "cat-badge-green",
    items: [
      { id: makeId(), name: "استامبولی", category: "غذاهای پلویی" },
      { id: makeId(), name: "باقالی پلو", category: "غذاهای پلویی" },
      { id: makeId(), name: "چلو ایرانی", category: "غذاهای پلویی" },
      { id: makeId(), name: "عدس پلو", category: "غذاهای پلویی" },
      { id: makeId(), name: "بریانی مرغ", category: "غذاهای پلویی" },
      { id: makeId(), name: "چلو هندی", category: "غذاهای پلویی" },
      { id: makeId(), name: "هواری گوشت", category: "غذاهای پلویی" },
      { id: makeId(), name: "پلو مکزیکی", category: "غذاهای پلویی" },
      { id: makeId(), name: "هواری میگو", category: "غذاهای پلویی" },
      { id: makeId(), name: "هواری ماهی", category: "غذاهای پلویی" },
      { id: makeId(), name: "پلو بندری", category: "غذاهای پلویی" },
      { id: makeId(), name: "باقالی پلو با گوشت گوساله", category: "غذاهای پلویی" },
      { id: makeId(), name: "باقالی پلو با مرغ", category: "غذاهای پلویی" },
      { id: makeId(), name: "زرشک پلو با مرغ", category: "غذاهای پلویی" },
      { id: makeId(), name: "ته چین مرغ", category: "غذاهای پلویی" },
    ],
  },
  {
    id: "kebab",
    name: "کبابی",
    emoji: "🍢",
    colorClass: "cat-badge-purple",
    items: [
      { id: makeId(), name: "جوجه اسپایسی", category: "کبابی" },
      { id: makeId(), name: "چلو کباب کوبیده مخصوص", category: "کبابی" },
      { id: makeId(), name: "جوجه کباب زعفرانی", category: "کبابی" },
      { id: makeId(), name: "چلو جوجه کباب", category: "کبابی" },
      { id: makeId(), name: "چلو جوجه اسپایسی", category: "کبابی" },
      { id: makeId(), name: "چلو کباب وزیری", category: "کبابی" },
      { id: makeId(), name: "سیخ کوبیده", category: "کبابی" },
    ],
  },
  {
    id: "finger-food",
    name: "فینگر فود / غذاهای سبک",
    emoji: "🍟",
    colorClass: "cat-badge-yellow",
    items: [
      { id: makeId(), name: "پیراشکی مرغ", category: "فینگر فود / غذاهای سبک" },
    ],
  },
  {
    id: "khoresh",
    name: "خورشت",
    emoji: "🍲",
    colorClass: "cat-badge-green",
    items: [
      { id: makeId(), name: "خورشت قورمه سبزی", category: "خورشت" },
      { id: makeId(), name: "خورشت قیمه", category: "خورشت" },
      { id: makeId(), name: "مسما بادمجان", category: "خورشت" },
      { id: makeId(), name: "قلیه ماهی", category: "خورشت" },
    ],
  },
  {
    id: "daryaee",
    name: "دریایی",
    emoji: "🦐",
    colorClass: "cat-badge-purple",
    items: [
      { id: makeId(), name: "چلو میگو سوخاری", category: "دریایی" },
      { id: makeId(), name: "چلو ماهی سرخ شده", category: "دریایی" },
    ],
  },
  {
    id: "khorak",
    name: "خوراک",
    emoji: "🥘",
    colorClass: "cat-badge-yellow",
    items: [
      { id: makeId(), name: "کتلت گوشت", category: "خوراک" },
      { id: makeId(), name: "دلمه برگ مو", category: "خوراک" },
      { id: makeId(), name: "لازانیا", category: "خوراک" },
      { id: makeId(), name: "ماکارونی", category: "خوراک" },
    ],
  },
  {
    id: "melal",
    name: "غذای ملل",
    emoji: "🌍",
    colorClass: "cat-badge-green",
    items: [
      { id: makeId(), name: "کشک و بادمجان", category: "غذای ملل" },
      { id: makeId(), name: "سوپ جو", category: "غذای ملل" },
      { id: makeId(), name: "سوپ دال عدس", category: "غذای ملل" },
      { id: makeId(), name: "حمص", category: "غذای ملل" },
      { id: makeId(), name: "ماست و خیار", category: "غذای ملل" },
      { id: makeId(), name: "بورانی بادمجان", category: "غذای ملل" },
    ],
  },
  {
    id: "pishghaza",
    name: "پیش‌غذا",
    emoji: "🥗",
    colorClass: "cat-badge-purple",
    items: [
      { id: makeId(), name: "سالاد پاستا", category: "پیش‌غذا" },
      { id: makeId(), name: "سالاد فتوش", category: "پیش‌غذا" },
      { id: makeId(), name: "سالاد نخود", category: "پیش‌غذا" },
      { id: makeId(), name: "سالاد کلم", category: "پیش‌غذا" },
      { id: makeId(), name: "سالاد طحینه", category: "پیش‌غذا" },
      { id: makeId(), name: "سالاد شیرازی", category: "پیش‌غذا" },
      { id: makeId(), name: "سالاد فصل", category: "پیش‌غذا" },
      { id: makeId(), name: "سالاد سزار", category: "پیش‌غذا" },
    ],
  },
  {
    id: "salad",
    name: "سالاد",
    emoji: "🥬",
    colorClass: "cat-badge-yellow",
    items: [
      { id: makeId(), name: "سالاد پاستا", category: "سالاد" },
      { id: makeId(), name: "سالاد فتوش", category: "سالاد" },
      { id: makeId(), name: "سالاد نخود", category: "سالاد" },
      { id: makeId(), name: "سالاد کلم", category: "سالاد" },
      { id: makeId(), name: "سالاد طحینه", category: "سالاد" },
      { id: makeId(), name: "سالاد شیرازی", category: "سالاد" },
      { id: makeId(), name: "سالاد فصل", category: "سالاد" },
      { id: makeId(), name: "سالاد سزار", category: "سالاد" },
    ],
  },
  {
    id: "drinks",
    name: "نوشیدنی",
    emoji: "🥤",
    colorClass: "cat-badge-green",
    items: [
      // نوشابه قوطی
      { id: makeId(), name: "کوکاکولا (قوطی)", category: "نوشیدنی", subcategory: "نوشابه قوطی" },
      { id: makeId(), name: "فانتا (قوطی)", category: "نوشیدنی", subcategory: "نوشابه قوطی" },
      { id: makeId(), name: "کوکاکولا زیرو (قوطی)", category: "نوشیدنی", subcategory: "نوشابه قوطی" },
      { id: makeId(), name: "اسپرایت (قوطی)", category: "نوشیدنی", subcategory: "نوشابه قوطی" },
      // دلستر قوطی
      { id: makeId(), name: "دلستر استوایی (قوطی)", category: "نوشیدنی", subcategory: "دلستر قوطی هی‌دی" },
      { id: makeId(), name: "دلستر هلویی (قوطی)", category: "نوشیدنی", subcategory: "دلستر قوطی هی‌دی" },
      { id: makeId(), name: "دلستر لیمویی (قوطی)", category: "نوشیدنی", subcategory: "دلستر قوطی هی‌دی" },
      // دلستر خانواده
      { id: makeId(), name: "دلستر استوایی (خانواده)", category: "نوشیدنی", subcategory: "دلستر خانواده هی‌دی" },
      { id: makeId(), name: "دلستر هلویی (خانواده)", category: "نوشیدنی", subcategory: "دلستر خانواده هی‌دی" },
      { id: makeId(), name: "دلستر لیمویی (خانواده)", category: "نوشیدنی", subcategory: "دلستر خانواده هی‌دی" },
      // لیموناد
      { id: makeId(), name: "لیموناد بطری", category: "نوشیدنی", subcategory: "لیموناد" },
      { id: makeId(), name: "لیموناد شیشه‌ای", category: "نوشیدنی", subcategory: "لیموناد" },
      { id: makeId(), name: "لیموناد خانواده", category: "نوشیدنی", subcategory: "لیموناد" },
      // آب معدنی
      { id: makeId(), name: "آب معدنی 1.5 لیتری", category: "نوشیدنی", subcategory: "آب معدنی" },
      { id: makeId(), name: "آب معدنی کوچک", category: "نوشیدنی", subcategory: "آب معدنی" },
      // نوشابه خانواده
      { id: makeId(), name: "کوکاکولا (خانواده)", category: "نوشیدنی", subcategory: "نوشابه خانواده" },
      { id: makeId(), name: "کوکاکولا زیرو (خانواده)", category: "نوشیدنی", subcategory: "نوشابه خانواده" },
      { id: makeId(), name: "فانتا (خانواده)", category: "نوشیدنی", subcategory: "نوشابه خانواده" },
      { id: makeId(), name: "اسپرایت (خانواده)", category: "نوشیدنی", subcategory: "نوشابه خانواده" },
      // دوغ
      { id: makeId(), name: "دوغ قوطی", category: "نوشیدنی", subcategory: "دوغ" },
      { id: makeId(), name: "دوغ بطری", category: "نوشیدنی", subcategory: "دوغ" },
      { id: makeId(), name: "دوغ خانواده", category: "نوشیدنی", subcategory: "دوغ" },
      // شاه‌توت
      { id: makeId(), name: "نوشابه شاه‌توت قوطی", category: "نوشیدنی", subcategory: "نوشابه شاه‌توت" },
      { id: makeId(), name: "نوشابه شاه‌توت خانواده", category: "نوشیدنی", subcategory: "نوشابه شاه‌توت" },
    ],
  },
];

export function getAllItems(): MenuItem[] {
  return menuCategories.flatMap((cat) => cat.items);
}

export function getCategoryById(id: string): Category | undefined {
  return menuCategories.find((cat) => cat.id === id);
}
