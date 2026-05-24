/**
 * Default flyer content + theme tokens per CODED bootcamp product.
 *
 * The flyer template is pixel-accurate to the Cybersecurity Figma master
 * (1240 × 1748). Each product carries:
 *
 *   - content: Arabic copy + numbers the marketing team can edit
 *   - theme:   the exact gradient stops, brand colors, and accents the
 *              flyer uses for backgrounds, glows, pills, total bar,
 *              phone chip, etc.
 *
 * Picking a product preset loads both at once. Editing copy never touches
 * the theme; switching theme via the palette switcher only swaps colors.
 */

export type FlyerPhase = {
  name: string;
  topic: string;
  duration: string;
  price: string;
};

/** Color tokens that drive the flyer's visual identity per product. */
export type FlyerTheme = {
  /** 3-stop vertical gradient for the flyer background. */
  bgGradient: [string, string, string];
  /** Primary brand color (kicker, phone chip, total bar, accent pill). */
  brand: string;
  /** Lighter highlight tint (top of title gradient, badge dots). */
  brandLight: string;
  /** Darker shade (bottom of brand gradient, deep shadow tints). */
  brandDark: string;
  /** Secondary accent (phase-2 highlight, time icon background). */
  accent: string;
  /** Darker shade of the secondary accent for gradients. */
  accentDark: string;
};

export type FlyerProductContent = {
  paletteId: string;
  productLabelAr: string;
  programTag: string;
  kickerAr: string;
  titleAr: string;
  subtitleAr: string;
  dateRangeAr: string;
  skillsHeadingAr: string;
  /** First skill in the list is rendered with the accent (brand) pill style. */
  skillsAr: string[];
  detailsHeadingAr: string;
  phasesHeadingAr: string;
  phases: FlyerPhase[];
  currency: string;
  totalLabelAr: string;
  totalPrice: string;
  installmentsAr: string;
  durationHeadingAr: string;
  durationNumber: string;
  durationUnitAr: string;
  scheduleLabelAr: string;
  scheduleValueAr: string;
  scheduleSubAr: string;
  timeLabelAr: string;
  timeValueAr: string;
  locationLabelAr: string;
  locationValueAr: string;
  phone: string;
  contactCtaAr: string;
  taglineEn: string;
  theme: FlyerTheme;
};

// ────────────── Themes ──────────────
// Cybersecurity values come straight from the Figma master flyer.
// AI / Data Science derived from each product's brand palette so the
// flyer keeps the same structure while feeling on-brand for the product.

const CYBER_THEME: FlyerTheme = {
  bgGradient: ["#0a1330", "#060b1c", "#04070f"],
  brand: "#e11c2c",
  brandLight: "#ff4555",
  brandDark: "#9b1320",
  accent: "#3059ff",
  accentDark: "#1b349b",
};

const AI_THEME: FlyerTheme = {
  bgGradient: ["#031f24", "#022731", "#01151c"],
  brand: "#00B9B4",
  brandLight: "#62FFE5",
  brandDark: "#026678",
  accent: "#16D7D1",
  accentDark: "#026678",
};

const DS_THEME: FlyerTheme = {
  bgGradient: ["#150b25", "#10081f", "#080315"],
  brand: "#C466EF",
  brandLight: "#E085FF",
  brandDark: "#8A3EB5",
  accent: "#7E31E0",
  accentDark: "#4B1B85",
};

// ────────────── Defaults per product ──────────────

export const flyerProducts: Record<string, FlyerProductContent> = {
  "cybersecurity-bootcamp": {
    paletteId: "cybersecurity-bootcamp",
    productLabelAr: "معسكر الأمن السيبراني",
    programTag: "Cybersecurity Bootcamp",
    kickerAr: "فتحنا باب التسجيل",
    titleAr: "معسكر الأمن السيبراني",
    subtitleAr: "",
    dateRangeAr: "17 مايو — 23 يوليو 2026",
    skillsHeadingAr: "المهارات المكتسبة",
    skillsAr: [
      "أساسيات الأمن السيبراني",
      "الفريق الأحمر",
      "الفريق الأزرق",
      "اختبار الاختراق",
      "حماية الأنظمة",
      "تطبيقات عملية",
      "شهادات معتمدة",
    ],
    detailsHeadingAr: "تفاصيل المعسكر",
    phasesHeadingAr: "مراحل ورسوم المعسكر",
    phases: [
      {
        name: "المرحلة الأولى",
        topic: "أساسيات الأمن السيبراني",
        duration: "أسبوعان",
        price: "450",
      },
      {
        name: "المرحلة الثانية",
        topic: "الفريق الأحمر · الفريق الأزرق",
        duration: "8 أسابيع",
        price: "2,150",
      },
    ],
    currency: "د.ك",
    totalLabelAr: "الإجمالي",
    totalPrice: "2,600",
    installmentsAr: "قابلة للتقسيط",
    durationHeadingAr: "المدة والمكان",
    durationNumber: "10",
    durationUnitAr: "أسابيع",
    scheduleLabelAr: "الموعد",
    scheduleValueAr: "17 مايو — 23 يوليو",
    scheduleSubAr: "الأحد إلى الخميس",
    timeLabelAr: "التوقيت",
    timeValueAr: "5:00 – 8:45 PM",
    locationLabelAr: "الموقع",
    locationValueAr: "المنطقة الحرة، أرجان",
    phone: "+965 6079 1018",
    contactCtaAr: "للتواصل والتسجيل",
    taglineEn: "THE GO-TO PLACE FOR AI & TECH EDUCATION",
    theme: CYBER_THEME,
  },

  "ai-app-developer": {
    paletteId: "ai-app-developer",
    productLabelAr: "AI App Developer",
    programTag: "AI App Developer Bootcamp",
    kickerAr: "فتحنا باب التسجيل",
    titleAr: "معسكر AI App Developer",
    subtitleAr: "احترف صناعة التطبيقات بالذكاء الاصطناعي من دون كتابة كود",
    dateRangeAr: "31 مايو — 02 يوليو 2026",
    skillsHeadingAr: "المهارات المكتسبة",
    skillsAr: [
      "تطبيقات الذكاء الاصطناعي",
      "تصميم واجهات احترافية",
      "ربط خدمات الـ AI",
      "حماية التطبيقات",
      "قواعد البيانات",
      "النشر السحابي",
    ],
    detailsHeadingAr: "تفاصيل المعسكر",
    phasesHeadingAr: "مراحل ورسوم المعسكر",
    phases: [
      {
        name: "المرحلة الأولى",
        topic: "أساسيات الذكاء الاصطناعي",
        duration: "أسبوعان",
        price: "390",
      },
      {
        name: "المرحلة الثانية",
        topic: "بناء ونشر تطبيقات AI",
        duration: "3 أسابيع",
        price: "1,210",
      },
    ],
    currency: "د.ك",
    totalLabelAr: "الإجمالي",
    totalPrice: "1,600",
    installmentsAr: "قابلة للتقسيط",
    durationHeadingAr: "المدة والمكان",
    durationNumber: "5",
    durationUnitAr: "أسابيع",
    scheduleLabelAr: "الموعد",
    scheduleValueAr: "31 مايو — 02 يوليو",
    scheduleSubAr: "3 أيام في الأسبوع",
    timeLabelAr: "التوقيت",
    timeValueAr: "5:00 – 8:45 PM",
    locationLabelAr: "الموقع",
    locationValueAr: "المنطقة الحرة، أرجان",
    phone: "+965 6079 1018",
    contactCtaAr: "للتواصل والتسجيل",
    taglineEn: "THE GO-TO PLACE FOR AI & TECH EDUCATION",
    theme: AI_THEME,
  },

  "data-science-bootcamp": {
    paletteId: "data-science-bootcamp",
    productLabelAr: "علم البيانات",
    programTag: "AI & Data Bootcamp",
    kickerAr: "فتحنا باب التسجيل",
    titleAr: "معسكر علم البيانات",
    subtitleAr: "تعلم تحليل البيانات والذكاء الاصطناعي وبناء النماذج",
    dateRangeAr: "07 يونيو — 13 أغسطس 2026",
    skillsHeadingAr: "المهارات المكتسبة",
    skillsAr: [
      "تعلم الآلة",
      "تحليل البيانات",
      "ذكاء الأعمال",
      "تطبيقات AI المتقدمة",
      "تنفيذ المشاريع",
    ],
    detailsHeadingAr: "تفاصيل المعسكر",
    phasesHeadingAr: "مراحل ورسوم المعسكر",
    phases: [
      {
        name: "المرحلة الأولى",
        topic: "مقدمة في علم البيانات",
        duration: "أسبوعان",
        price: "450",
      },
      {
        name: "المرحلة الثانية",
        topic: "تطبيقات الذكاء الاصطناعي",
        duration: "8 أسابيع",
        price: "1,750",
      },
    ],
    currency: "د.ك",
    totalLabelAr: "الإجمالي",
    totalPrice: "2,200",
    installmentsAr: "قابلة للتقسيط",
    durationHeadingAr: "المدة والمكان",
    durationNumber: "10",
    durationUnitAr: "أسابيع",
    scheduleLabelAr: "الموعد",
    scheduleValueAr: "07 يونيو — 13 أغسطس",
    scheduleSubAr: "الأحد إلى الخميس",
    timeLabelAr: "التوقيت",
    timeValueAr: "5:00 – 8:45 PM",
    locationLabelAr: "الموقع",
    locationValueAr: "المنطقة الحرة، أرجان",
    phone: "+965 6079 1018",
    contactCtaAr: "للتواصل والتسجيل",
    taglineEn: "THE GO-TO PLACE FOR AI & TECH EDUCATION",
    theme: DS_THEME,
  },
};

export const flyerProductIds = Object.keys(flyerProducts);

export function defaultFlyerProduct(): FlyerProductContent {
  return flyerProducts["cybersecurity-bootcamp"];
}

/** Map a brand palette id → flyer theme. Falls back to the cyber theme. */
export function themeForPalette(paletteId: string): FlyerTheme {
  return (
    flyerProducts[paletteId]?.theme ?? CYBER_THEME
  );
}
