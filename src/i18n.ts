export type Lang = 'ar' | 'en';

export const translations: Record<Lang, Record<string, string>> = {
  ar: {
    // Site
    'site.name': 'جلال امانج',
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.services': 'الخدمات',
    'nav.contact': 'تواصل',
    'nav.brand.subtitle': 'مهندس تطبيقات سطح المكتب',
    'nav.initiate': 'تواصل معي',

    // Hero
    'hero.explore': 'استكشف',
    'hero.contact': 'تواصل',
    'hero.scroll': 'اسحب للاستكشاف',

    // Services Preview
    'services.title': 'الخدمات',
    'services.explore': 'استكشف الخدمات',

    // Services Page
    'services.page.title': 'الخدمات',
    'services.back': 'العودة للرئيسية',
    'services.prompts.desc': 'مكتبة مطالبات الذكاء الاصطناعي للتصميم والإنتاجية.',
    'services.edu.desc': 'الموارد التعليمية ومواد التعلم.',
    'services.apps.desc': 'تطبيقات سطح المكتب والمشاريع البرمجية.',

    // Edu Page
    'edu.title': 'التعليم',
    'edu.back': 'رجوع',
    'edu.desc': 'الموارد التعليمية ومواد التعلم قريباً.',

    // Apps Page
    'apps.title': 'التطبيقات',
    'apps.back': 'رجوع',
    'apps.desc': 'تطبيقات سطح المكتب والمشاريع البرمجية قريباً.',

    // Prompts Page
    'prompts.back': 'رجوع',
    'prompts.title': 'المطالبات',
    'prompts.loading': 'جاري تحميل المطالبات...',
    'prompts.empty.title': 'لا توجد فئات مطالبات بعد',
    'prompts.empty.desc': 'ستظهر فئات المطالبات هنا بعد إضافتها من لوحة التحكم.',
    'prompts.category.empty.title': 'لا توجد مطالبات هنا بعد',
    'prompts.category.empty.desc': 'ستظهر مطالبات هذه الفئة بعد إضافتها من لوحة التحكم.',
    'prompts.close': 'إغلاق ✕',
    'prompts.copy': 'نسخ المطالبة',
    'prompts.copied': '!تم النسخ',
    'prompts.howto': 'كيف تستخدم',
    'prompts.howto.title': 'كيف تستخدم',
    'prompts.howto.close': 'إغلاق',
    'prompts.pick': 'اختر فئة، ثم انسخ المطالبة التي تحتاجها.',
    'prompts.active.pick': '— اختر بطاقة وانسخ مطالبتك.',
    'prompts.prompt': 'مطالبة',
    'prompts.prompts': 'مطالبات',

    // Product Carousel
    'products.featured': 'أحدث التطبيقات',
    'products.empty': 'المشاريع قادمة قريباً.',
    'products.view': 'عرض المشروع',

    // Contact
    'contact.title': 'تواصل معي.',
    'contact.received.title': 'تم استلام الرسالة',
    'contact.received.desc': 'شكراً لتواصلك. سيراجع jalalamanj استفسارك الفني وسيرد خلال 24 ساعة عمل.',
    'contact.received.again': 'إرسال رسالة أخرى',
    'contact.name': 'اسمك',
    'contact.name.placeholder': 'مثال: أحمد محمد',
    'contact.email': 'البريد الإلكتروني',
    'contact.email.placeholder': 'مثال: ahmed@example.com',
    'contact.message': 'رؤية المشروع / الاستفسار',
    'contact.message.placeholder': 'صف متطلبات تطبيق سطح المكتب أو مواصفات التقنية...',
    'contact.sending': 'جاري الإرسال...',
    'contact.send': 'إرسال',
    'contact.or': 'أو استخدم',

    // Service Request Modal
    'service.request.title': 'تم استلام طلب الخدمة',
    'service.request.desc': 'شكراً لطلبك. سيراجع jalalamanj متطلباتك وسيرد عبر البريد الإلكتروني خلال 24 ساعة.',
    'service.request.close': 'إغلاق',
    'service.request.form': 'طلب خدمة',
    'service.request.name': 'الاسم الكامل *',
    'service.request.name.placeholder': 'مثال: أحمد محمد',
    'service.request.email': 'البريد الإلكتروني *',
    'service.request.email.placeholder': 'ahmed@company.com',
    'service.request.details': 'تفاصيل проектك ونطاقه *',
    'service.request.details.placeholder': 'صف أهدافك لـ',
    'service.request.cancel': 'إلغاء',
    'service.request.submit': 'إرسال الطلب',

    // Footer
    'footer.rights': '© 2026 جميع الحقوق محفوظة.',
    'footer.admin': 'الإدارة',
    'footer.top': 'العودة للأعلى',

    // Error
    'error.title': 'حدث خطأ ما',

    // Loading
    'loading': 'جاري التحميل…',
  },
  en: {
    // Site
    'site.name': 'JALAL AMANJ',
    // Navbar
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.brand.subtitle': 'Systems & Desktop Architect',
    'nav.initiate': 'Initiate Contact',

    // Hero
    'hero.explore': 'Explore',
    'hero.contact': 'Contact',
    'hero.scroll': 'Scroll to explore',

    // Services Preview
    'services.title': 'Services',
    'services.explore': 'Explore Services',

    // Services Page
    'services.page.title': 'Services',
    'services.back': 'Back to Home',
    'services.prompts.desc': 'AI prompt library for design and productivity.',
    'services.edu.desc': 'Educational resources and learning materials.',
    'services.apps.desc': 'Desktop applications and software projects.',

    // Edu Page
    'edu.title': 'Edu',
    'edu.back': 'Back',
    'edu.desc': 'Educational resources and learning materials coming soon.',

    // Apps Page
    'apps.title': 'Apps',
    'apps.back': 'Back',
    'apps.desc': 'Desktop applications and software projects coming soon.',

    // Prompts Page
    'prompts.back': 'Back',
    'prompts.title': 'Prompts',
    'prompts.loading': 'Loading Prompts...',
    'prompts.empty.title': 'No Prompt Categories Yet',
    'prompts.empty.desc': 'Prompt categories will appear here once added through the admin dashboard.',
    'prompts.category.empty.title': 'No Prompts Here Yet',
    'prompts.category.empty.desc': 'Prompts for this category will appear once added through the admin dashboard.',
    'prompts.close': 'Close ✕',
    'prompts.copy': 'Copy Prompt',
    'prompts.copied': 'Copied!',
    'prompts.howto': 'How to use',
    'prompts.howto.title': 'How to Use',
    'prompts.howto.close': 'Close how to use',
    'prompts.pick': 'Pick a category, then copy the prompt you need.',
    'prompts.active.pick': '— pick a card and copy its prompt.',
    'prompts.prompt': 'prompt',
    'prompts.prompts': 'prompts',

    // Product Carousel
    'products.featured': 'Latest Apps',
    'products.empty': 'Projects are on the way.',
    'products.view': 'View Project',

    // Contact
    'contact.title': 'Contact Me.',
    'contact.received.title': 'Dialogue Received',
    'contact.received.desc': 'Thank you for reaching out. Jalal Amanj will review your technical inquiry and respond within 24 business hours.',
    'contact.received.again': 'Send Another Inquiry',
    'contact.name': 'Your Name',
    'contact.name.placeholder': 'e.g. Lord Sterling',
    'contact.email': 'Email Address',
    'contact.email.placeholder': 'e.g. sterling@atelier.com',
    'contact.message': 'Project Vision / Inquiry',
    'contact.message.placeholder': 'Describe your desktop app engineering requirements, tech stack specs, or service inquiry...',
    'contact.sending': 'Transmitting...',
    'contact.send': 'Send',
    'contact.or': 'OR USE',

    // Service Request Modal
    'service.request.title': 'Service Request Received',
    'service.request.desc': 'Thank you for requesting {title}. Jalal Amanj will review your requirements and respond via email within 24 hours.',
    'service.request.close': 'Close Window',
    'service.request.form': 'Request Service',
    'service.request.name': 'Your Full Name *',
    'service.request.name.placeholder': 'e.g. Alex Morgan',
    'service.request.email': 'Email Address *',
    'service.request.email.placeholder': 'alex@company.com',
    'service.request.details': 'Project Details & Scope *',
    'service.request.details.placeholder': 'Describe your goals for',
    'service.request.cancel': 'Cancel',
    'service.request.submit': 'Submit Request',

    // Footer
    'footer.rights': '© 2026 All rights reserved.',
    'footer.admin': 'Admin',
    'footer.top': 'Back to top',

    // Error
    'error.title': 'Something went wrong',

    // Loading
    'loading': 'Loading…',
  },
};

export function t(key: string, lang: Lang, replacements?: Record<string, string>): string {
  let text = translations[lang][key] ?? translations.en[key] ?? key;
  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
