// بيانات الصحفيين
export const journalists = [
  {
    id: 'karim-almansouri',
    name: 'كريم المنصوري',
    englishName: 'Karim Al Mansouri',
    title: 'Business Development Manager | Strategic Partnerships | Driving Growth in the MENA Region',
    bio: 'خبير في تطوير الأعمال والشراكات الاستراتيجية مع تركيز خاص على منطقة الشرق الأوسط وشمال أفريقيا. يتمتع بخبرة واسعة في كشف الممارسات التجارية المشبوهة وحماية المستثمرين من الاحتيال المالي.',
    image: 'https://khalijtrust.com/img/Karim Al Mansouri.jpg',
    socialMedia: {
      twitter: 'https://x.com/KarimMansouriSA',
      linkedin: 'https://www.linkedin.com/'
    },
    specialties: [
      'تطوير الأعمال',
      'الشراكات الاستراتيجية',
      'كشف الاحتيال المالي',
      'حماية المستثمرين'
    ],
    articles: [
      'abyan-capital-scam',
      'tradee-u-global-scam',
      'wrpro-scam',
      'evest-scam',
      'axia-scam',
      'faisal-alabar-scam',
      'altamimi-fake-office',
      'khalifa-alkindi-scam',
      'alkhaleej-global-scam',
      'elshikh-law-scam',
      'verify-company-license',
      'bank-refund-process',
      'investment-scam-warning-signs',
      'trust-law-profile',
      'alarabia-law-profile',
      'trust-law-forex-recovery-2-5m',
      'trust-law-investment-recovery-1-8m'
    ]
  },
  {
    id: 'omar-elhaddad',
    name: 'عمر الحداد',
    englishName: 'Omar El Haddad',
    title: 'Digital Transformation & Innovation | Scaling Businesses in the MENA Region',
    bio: 'متخصص في التحول الرقمي والابتكار مع خبرة في تطوير الأعمال في منطقة الشرق الأوسط وشمال أفريقيا. يركز على كشف الشركات التقنية المحتالة والمنصات الرقمية المشبوهة.',
    image: 'https://khalijtrust.com/img/Omar El Haddad.jpg',
    socialMedia: {
      twitter: 'https://x.com/OmarElHaddadKSA',
      linkedin: 'https://www.linkedin.com/'
    },
    specialties: [
      'التحول الرقمي',
      'الابتكار التقني',
      'كشف المنصات المحتالة',
      'الأمان الرقمي'
    ],
    articles: [
      'csop-scam',
      'zenstox-scam',
      'investico-scam',
      'ali-alnazmi-scam',
      'linda-ali-scam',
      'alsahli-law-scam',
      'majed-abdullah-mohammed-scam',
      'fake-financial-audit-dubai',
      'crypto-scam-protection',
      'suspicious-trading-platforms',
      'law-fx-profile'
    ]
  }
];

// دالة للحصول على بيانات صحفي بواسطة ID
export function getJournalistById(id) {
  return journalists.find(journalist => journalist.id === id);
}

// دالة للحصول على بيانات صحفي بواسطة slug المقال
export function getJournalistByArticle(articleSlug) {
  return journalists.find(journalist => 
    journalist.articles.includes(articleSlug)
  );
}

// دالة للحصول على جميع مقالات صحفي
export function getJournalistArticles(journalistId) {
  const journalist = getJournalistById(journalistId);
  return journalist ? journalist.articles : [];
}
// قائمة عناوين المقالات للاستخدام في الصفحات
export const articleTitles = {
  'abyan-capital-scam': 'تحذير من شركة أبيان المالية Abyan Capital',
  'tradee-u-global-scam': ' تحذير من شركة التداول TradeEU Global',
  'wrpro-scam': 'تحذير من شركة التداول WRPro',
  'evest-scam': 'تحذير من شركة إيفيست Evest',
  'axia-scam': 'تحذير من شركة اكسيا Axia',
  'csop-scam': 'تحذير من شركة CSOP',
  'zenstox-scam': 'تحذير من شركة زينستوكس Zenstox',
  'investico-scam': 'تحذير من شركة إنفستيكو Investico',
  'ali-alnazmi-scam': 'تحذير من المحامي علي النظمي',
  'linda-ali-scam': 'تحذير من مكتب ليندا علي',
  'alsahli-law-scam': 'تحذير من مكتب السهلي للمحاماة',
  'majed-abdullah-mohammed-scam': 'تحذير من ماجد عبدالله محمد',
  'fake-financial-audit-dubai': 'تحذير من جهة تنتحل اسم جهاز الرقابة المالية',
  'elshikh-law-scam': 'تحذير من مكتب الشيخ للمحاماة',
  'faisal-alabar-scam': 'تحذير من مكتب المحامي فيصل العبار',
  'altamimi-fake-office': 'تحذير من مكتب التميمي الوهمي',
  'khalifa-alkindi-scam': 'تحذير من مكتب المحامي خليفة الكندي',
  'alkhaleej-global-scam': 'تحذير من مكتب الخليج العالمي',
  'elshikh-law-scam': 'تحذير من مكتب الشيخ للمحاماة',
  'verify-company-license': 'كيف تتحقق من رخصة الشركة قبل الاستثمار',
  'bank-refund-process': 'خطوات استرجاع الأموال من البنك',
  'investment-scam-warning-signs': 'علامات التحذير من شركات الاستثمار الوهمية',
  'crypto-scam-protection': 'كيف تحمي نفسك من احتيال العملات الرقمية',
  'suspicious-trading-platforms': 'التعامل مع منصات التداول المشبوهة',
  'trust-law-profile': 'مكتب Trust Law - خبراء استرجاع الأموال',
  'alarabia-law-profile': 'مكتب العربية للمحاماة - خبراء الاحتيال المالي',
  'law-fx-profile': 'مكتب LAW FX - خبراء الفوركس والعملات الرقمية',
  'trust-law-forex-recovery-2-5m': 'استرجاع 2.5 مليون جنيه من منصة فوركس احتيالية',
  'trust-law-investment-recovery-1-8m': 'استرداد 1.8 مليون جنيه من شركة استثمار وهمية'
}