import { Product, PromptCategory, PromptItem } from './types';

export type Lang = 'ar' | 'en';

export const translations: Record<Lang, Record<string, string>> = {
  ar: {
    // Site
    'site.name': 'جلال امانج',
    'background.alt': 'خلفية معمارية داخلية',

    // Hero
    'hero.statement': 'أصنع حلولاً رقمية عملية وتطبيقات وأدوات مدعومة بالذكاء الاصطناعي — برمجيات أنيقة ومدروسة تُنجز الأهداف.',
    'hero.explore': 'استكشف أعمالي',
    'hero.contact': 'تواصل معي',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.work': 'أعمالي',
    'nav.services': 'الخدمات',
    'nav.contact': 'تواصل',
    'nav.cta': 'راسلنا',

    // My Work
    'work.eyebrow': 'أعمالي',
    'work.title': 'تطبيقات أنشأتها',
    'work.subtitle': 'تطبيقات سطح مكتب وأدوات رقمية صُممت للعمل بشكل عملي وموثوق.',

    // Services Preview
    'services.eyebrow': 'خدماتي',
    'services.sectionTitle': 'خدمات بسيطة، قيمة حقيقية',
    'services.sectionSubtitle': 'أقدم ثلاث خدمات ملموسة تلبي احتياجاتك.',
    'svc.prompts.title': 'أوامر جاهزة للنسخ',
    'svc.prompts.desc': 'أوامر عالية الجودة ومُختبَرة، جاهزة للاستخدام مباشرة.',
    'svc.prompts.cta': 'تصفح الأوامر',
    'svc.generation.title': 'توليد الأوامر',
    'svc.generation.desc': 'أوامر مخصصة تُنشأ خصيصاً لاحتياجاتك وأهدافك وسير عملك.',
    'svc.generation.cta': 'اطلب أمراً',
    'svc.wheel.title': 'عجلة الأسئلة والأسماء',
    'svc.wheel.desc': 'عجلات تفاعلية للأسئلة والأسماء والاختيارات والأنشطة.',
    'svc.wheel.cta': 'تواصل معي',

    // Services Page
    'services.page.title': 'الخدمات',
    'services.back': 'العودة للرئيسية',
    'services.prompts.desc': 'مكتبة أوامر الذكاء الاصطناعي للتصميم والإنتاجية.',
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

    // Murshid / Edara Pages
    'murshid.title': 'مرشد',
    'edara.title': 'إدارة',
    'pages.comingSoon': 'قريباً!',

    // Murshid description
    'murshid.tagline': 'إدارة آمنة للمستندات والبيانات الشخصية',
    'murshid.about.1': 'مرشد هو تطبيق سطح مكتب مصمم لمساعدة المستخدمين على إدارة وتنظيم مستنداتهم ومعلوماتهم الشخصية والحفاظ عليها بشكل آمن.',
    'murshid.about.2': 'صُمم مرشد ليعمل في المقام الأول دون اتصال بالإنترنت. يمكن للمستخدمين استخدام الوظائف الأساسية للتطبيق وإدارة معلوماتهم محلياً على أجهزتهم دون الحاجة إلى اتصال مستمر بالإنترنت.',
    'murshid.onlineBackup': 'النسخ الاحتياطي عبر الإنترنت',
    'murshid.backup.1': 'يوفر مرشد ميزة نسخ احتياطي اختيارية عبر الإنترنت تتيح للمستخدمين إنشاء نسخ احتياطية من بيانات مرشد في حساب Google Drive الخاص بهم.',
    'murshid.backup.2': 'عندما يختار المستخدم تفعيل النسخ الاحتياطي عبر الإنترنت، يمكنه ربط حسابه الشخصي في Google بمرشد من خلال نظام المصادقة الآمن من Google. يصرح المستخدم صراحةً لمرشد باستخدام صلاحية الوصول إلى Google Drive المطلوبة لغرض إنشاء وإدارة ملفات النسخ الاحتياطي الخاصة بمرشد.',
    'murshid.backup.3': 'يُستخدم اتصال Google Drive حصرياً لوظيفة النسخ الاحتياطي في مرشد. لا يصل مرشد إلى الملفات الشخصية غير ذات الصلة المخزنة في Google Drive الخاص بالمستخدم، ولا يقرأها ولا يعدلها ولا يديرها.',
    'murshid.backup.4': 'يبقى المستخدمون مسيطرين على حسابهم في Google وعلى بياناتهم في Google Drive. ربط حساب Google اختياري وغير مطلوب لاستخدام الوظائف الأساسية دون اتصال في مرشد.',
    'murshid.why.title': 'لماذا يطلب مرشد الوصول إلى حساب Google',
    'murshid.why.1': 'يطلب مرشد التحقق من حساب Google لتحديد هوية الحساب المتصل بشكل آمن ولتوفير وظيفة النسخ الاحتياطي الاختيارية عبر الإنترنت.',
    'murshid.why.2': 'تُستخدم صلاحية الوصول إلى Google Drive المطلوبة لتخزين وإدارة ملفات النسخ الاحتياطي التي ينشئها مرشد في حساب Google Drive الخاص بالمستخدم.',
    'murshid.why.3': 'لا يستخدم مرشد الوصول إلى حساب Google للإعلانات أو التنميط أو الوصول إلى بيانات المستخدم غير ذات الصلة.',
    'murshid.privacy.title': 'الخصوصية',
    'murshid.privacy.1': 'يحترم مرشد خصوصية وأمن معلومات المستخدم. تبقى البيانات التي يديرها مرشد تحت سيطرة المستخدم، ويُستخدم اتصال Google Drive فقط للوظائف الموضحة أعلاه.',
    'murshid.privacy.2': 'للحصول على معلومات كاملة حول كيفية تعامل مرشد مع معلومات المستخدم وبيانات حساب Google، يرجى مراجعة:',

    // Murshid legal documents
    'murshid.legal': 'الوثائق القانونية',
    'murshid.legal.desc': 'توثيق قانوني لتطبيق Murshid.',
    'murshid.privacy': 'سياسة الخصوصية',
    'murshid.terms': 'شروط الاستخدام',
    'murshid.eula': 'اتفاقية ترخيص المستخدم النهائي',
    'legal.back': 'رجوع',

    // Edara description
    'edara.tagline': 'نظام الإدارة المدرسية والإدارية',
    'edara.about.1': 'إدارة هو تطبيق سطح مكتب مصمم لمساعدة المدارس والإدارات التعليمية على إدارة سجلاتها الإدارية والتعليمية في بيئة واحدة منظمة.',
    'edara.about.2': 'يتيح إدارة للموظفين المصرح لهم في المدرسة إدارة معلومات المدرسة الأساسية، بما في ذلك سجلات الطلاب والموظفين والمستندات ومراسلات الوزارة والقوالب والتصديرات وغيرها من البيانات الإدارية المطلوبة للعمليات اليومية للمدرسة.',
    'edara.about.3': 'صُمم إدارة بشكل أساسي كتطبيق سطح مكتب محلي. تُخزَّن بيانات المدرسة محلياً على حاسوب المستخدم، مما يتيح للمدارس إدارة معلوماتها دون الحاجة إلى اتصال مستمر بالإنترنت أو تخزين قاعدة بياناتها التشغيلية على خوادم إدارة.',
    'edara.local.title': 'إدارة البيانات المحلية',
    'edara.local.1': 'يحتفظ إدارة بمعلومات المدرسة التشغيلية على الحاسوب المثبت عليه التطبيق. قد تشمل هذه المعلومات سجلات الطلاب ومعلومات الموظفين وبيانات المدرسة والمستندات ومستندات الوزارة والقوالب وغيرها من المعلومات التي تُدخلها المدرسة.',
    'edara.local.2': 'تبقى المدرسة مسؤولة عن المعلومات التي تُدخلها إلى إدارة وتتحكم في البيانات المخزنة محلياً.',
    'edara.cloud.title': 'النسخ الاحتياطي والتخزين السحابي',
    'edara.cloud.1': 'يوفر إدارة وظيفة نسخ احتياطي اختيارية من خلال خدمات سحابية مدعومة، بما في ذلك Google Drive وMicrosoft OneDrive.',
    'edara.cloud.2': 'عندما يختار المستخدم تفعيل النسخ الاحتياطي السحابي، يخزن إدارة النسخة الاحتياطية في حساب Google Drive أو Microsoft OneDrive المتصل الخاص بالمستخدم.',
    'edara.cloud.3': 'النسخ الاحتياطي السحابي اختياري وغير مطلوب للوظائف المحلية الأساسية لإدارة.',
    'edara.cloud.4': 'لا يستخدم إدارة مساحة التخزين السحابية الشخصية للمطور لتخزين بيانات المدرسة، ولا يتلقى المطور نسخاً من قاعدة بيانات المدرسة أو محتويات النسخ الاحتياطي بشكل روتيني ولا يخزنها.',
    'edara.licensing.title': 'الترخيص',
    'edara.licensing.1': 'إدارة تطبيق مدفوع يُقدم وفق نموذج قائم على الترخيص.',
    'edara.licensing.2': 'يمكن شراء التراخيص كشراء لمرة واحدة، وتكون مرتبطة بجهاز مصرح به واحد.',
    'edara.licensing.3': 'يُستخدم نظام الترخيص لتفعيل وإدارة النسخة المصرح بها للمستخدم من إدارة.',
    'edara.privacy.title': 'الخصوصية والأمان',
    'edara.privacy.1': 'صُمم إدارة وفق نهج محلي أولاً لإدارة بيانات المدرسة. لا يستخدم التطبيق بيانات المدرسة للإعلانات أو التنميط السلوكي أو التسويق الموجّه.',
    'edara.privacy.2': 'لمزيد من المعلومات حول كيفية تعامل إدارة مع المعلومات، يرجى مراجعة:',

    // Edara legal documents
    'edara.legal': 'الوثائق القانونية',
    'edara.legal.desc': 'توثيق قانوني لتطبيق إدارة.',
    'edara.privacy': 'سياسة الخصوصية',
    'edara.terms': 'شروط الاستخدام',
    'edara.eula': 'اتفاقية ترخيص المستخدم النهائي',

    // Prompts Page
    'prompts.back': 'رجوع',
    'prompts.title': 'أوامر الذكاء الإصطناعي',
    'prompts.loading': 'جاري تحميل أوامر الذكاء الاصطناعي...',
    'prompts.empty.title': 'لا توجد فئات أوامر بعد',
    'prompts.empty.desc': 'ستظهر فئات الأوامر هنا بعد إضافتها من لوحة التحكم.',
    'prompts.category.empty.title': 'لا توجد أوامر هنا بعد',
    'prompts.category.empty.desc': 'ستظهر أوامر هذه الفئة بعد إضافتها من لوحة التحكم.',
    'prompts.copy': 'نسخ الأمر',
    'prompts.copied': '!تم النسخ',
    'prompts.howto': 'كيف تستخدم',
    'prompts.howto.title': 'كيف تستخدم',
    'prompts.howto.close': 'إغلاق',
    'prompts.pick': 'اختر فئة، ثم انسخ الأمر الذي تحتاجه.',
    'prompts.active.pick': '— اختر بطاقة وانسخ أمرك.',
    'prompts.view.list': 'عرض القائمة',
    'prompts.view.grid': 'عرض الشبكة',
    'prompts.fill.title': 'جهّز أمرك',
    'prompts.fill.desc': 'املأ الحقول أدناه، ثم انسخ الأمر جاهزاً.',
    'prompts.fill.copy': 'نسخ الأمر الآن',
    'prompts.fill.cancel': 'إلغاء',
    'prompts.fill.close': 'إغلاق',
    'prompts.open': 'فتح',
    'prompts.prompt': 'أمر',
    'prompts.prompts': 'أوامر',

    // Product Carousel
    'products.featured': 'أحدث التطبيقات',
    'products.empty': 'المشاريع قادمة قريباً.',
    'products.view': 'عرض المشروع',

    // Project Modal
    'modal.tags': 'العلامات',
    'modal.download': 'تحميل',

    // Product content (Converto)
    'product.omnipulse-daw.title': 'كونفرتو',
    'product.omnipulse-daw.category': 'تطبيق سطح مكتب',
    'product.omnipulse-daw.shortDescription': 'كونفرتو هو تطبيق سطح مكتب خفيف يحول مستندات PDF وDOCX إلى صور PNG وJPEG عالية الجودة. صُمم للسرعة والبساطة والعمل دون اتصال بالإنترنت، ويجعل التحويل من المستند إلى الصورة سهلاً بلا مجهود.',
    'product.omnipulse-daw.fullDescription': 'كونفرتو هو تطبيق سطح مكتب احترافي مصمم لتحويل مستندات PDF وDOCX إلى صور PNG وJPEG عالية الجودة بكل سهولة. سواء كنت تحول ملفاً واحداً أو تعالج مستندات متعددة دفعة واحدة، يقدم كونفرتو نتائج سريعة وموثوقة ودقيقة أثناء العمل دون اتصال بالإنترنت تماماً. كما يدعم التحويل الدفعي.',

    // Product content (fallback showcase)
    'product.novastudio-ide.title': 'نوفاستوديو — بيئة تطوير محلية بالذكاء الاصطناعي',
    'product.novastudio-ide.category': 'أدوات المطورين',
    'product.novastudio-ide.shortDescription': 'محرر أكواد فائق السرعة مع استدلال ذكاء اصطناعي محلي مدمج.',
    'product.novastudio-ide.fullDescription': 'نوفاستوديو هو محرر أكواد سطح مكتب حديث وخفيف صُمم للمطورين الذين يضعون الخصوصية أولاً. يعمل بنماذج استدلال محلية GGUF/Ollama تُشغَّل مباشرة على بطاقة الرسوميات عبر WebGPU/DirectML، ويقدم إكمال أكواد فوري وبحثاً دلالياً في شجرة الصياغة (AST) دون أي اعتماد على السحابة.',
    'product.quantumtrace-security.title': 'كوانتوم تريس — حزمة أمنية للمؤسسات',
    'product.quantumtrace-security.category': 'أمن المؤسسات',
    'product.quantumtrace-security.shortDescription': 'برنامج سطح مكتب لتشخيص حزم الشبكة واكتشاف التهديدات.',
    'product.quantumtrace-security.fullDescription': 'كوانتوم تريس هو تطبيق أمن شبكات للمؤسسات صُمم لمحللي مراكز العمليات الأمنية (SOC) ومسؤولي الأنظمة. يراقب واجهات الشبكة عالية الإنتاجية في الوقت الفعلي، ويصوّر خرائط طوبولوجيا الحزم مباشرة، وينفّذ إجراءات كشف شذوذ استدلالية على أجهزة العميل.',
    'product.hyperflow-cad.title': 'هايبر فلو — محاكي ثلاثي الأبعاد',
    'product.hyperflow-cad.category': 'CAD والهندسة',
    'product.hyperflow-cad.shortDescription': 'برمجيات CAD ثلاثية الأبعاد للفيزياء والهياكل مع تسريع عتادي.',
    'product.hyperflow-cad.fullDescription': 'هايبر فلو هو برنامج CAD مكاني لسطح المكتب صُمم لنمذجة الهياكل والديناميكا المائية. بفضل مسارات الرسم المخصصة Vulkan وتعدد خيوط Rust، يمكن للمهندسين عرض ملايين المضلعات المعلمية مع حسابات اختبار إجهاد في الوقت الفعلي.',

    // Product specs (labels & values)
    'product.spec.label.Tech Stack': 'التقنيات المستخدمة',
    'product.spec.label.Audio Latency': 'زمن الاستجابة الصوتي',
    'product.spec.label.Platform': 'المنصة',
    'product.spec.label.Memory Footprint': 'استهلاك الذاكرة',
    'product.spec.label.Inference Speed': 'سرعة الاستدلال',
    'product.spec.label.Features': 'الميزات',
    'product.spec.label.Throughput': 'الإنتاجية',
    'product.spec.label.Security': 'الأمان',
    'product.spec.label.Render Target': 'هدف العرض',
    'product.spec.label.Use Case': 'حالة الاستخدام',
    'product.spec.value.Rust, C++ Audio Core, WebGPU, React': 'Rust، نواة صوتية C++، WebGPU، React',
    'product.spec.value.< 1.8 ms ASIO / CoreAudio': '< 1.8 ميللي ثانية ASIO / CoreAudio',
    'product.spec.value.macOS, Windows, Linux': 'ماك، ويندوز، لينكس',
    'product.spec.value.< 120 MB idle RAM': 'أقل من 120 ميجابايت في وضع الخمول',
    'product.spec.value.Electron, TypeScript, WebGPU, ONNX': 'Electron، TypeScript، WebGPU، ONNX',
    'product.spec.value.65+ tokens/sec on local GPU': '+65 رمزاً/ثانية على بطاقة رسوميات محلية',
    'product.spec.value.AST Parsing, Local AI, Git Graph': 'تحليل AST، ذكاء اصطناعي محلي، مخطط Git',
    'product.spec.value.Tauri, Rust eBPF, D3.js, Tailwind': 'Tauri، Rust eBPF، D3.js، Tailwind',
    'product.spec.value.10 Gbps packet capture': 'التقاط حزم بسرعة 10 جيجابت/ثانية',
    'product.spec.value.Windows Enterprise, Linux': 'ويندوز للمؤسسات، لينكس',
    'product.spec.value.Encrypted Vault & Hardened IPC': 'خزنة مشفرة واتصال داخلي محصّن',
    'product.spec.value.C++20, Vulkan API, Qt, Rust IPC': 'C++20، Vulkan API، Qt، Rust IPC',
    'product.spec.value.60 FPS @ 4K 10M Polygons': '60 إطاراً/ثانية بدقة 4K مع 10 ملايين مضلع',
    'product.spec.value.macOS Metal, Windows DirectX12': 'ماك Metal، ويندوز DirectX12',
    'product.spec.value.Structural & Thermal Simulation': 'محاكاة هيكلية وحرارية',

    // Product specs (labels & values)
    'product.spec.label.Size': 'الحجم',
    'product.spec.label.Local': 'محلي',
    'product.spec.label.Updates': 'التحديثات',
    'product.spec.label.Price': 'السعر',
    'product.spec.label.Language': 'اللغة',
    'product.spec.value.Offline': 'دون اتصال',
    'product.spec.value.Auto-update system': 'نظام التحديث التلقائي',
    'product.spec.value.FREE': 'مجاني',
    'product.spec.value.Supports (English, Arabic, Kurdish (Sorani) and Turkish)': 'يدعم (الإنجليزية، العربية، الكردية (سورانية) والتركية)',

    // Contact
    'contact.eyebrow': 'تواصل',
    'contact.lead': 'لنتواصل',
    'contact.title': 'تواصل معي.',
    'contact.received.title': 'تم استلام الرسالة',
    'contact.received.desc': 'شكراً لتواصلك. سيراجع jalalamanj استفسارك الفني وسيرد خلال 24 ساعة عمل.',
    'contact.received.again': 'إرسال رسالة أخرى',
    'contact.name': 'اسمك',
    'contact.email': 'البريد الإلكتروني أو رقم الهاتف',
    'contact.message': 'رؤية المشروع / الاستفسار',
    'contact.sending': 'جاري الإرسال...',
    'contact.send': 'إرسال',
    'contact.or': 'أو استخدم',

    // Footer
    'footer.rights': '© 2026 جميع الحقوق محفوظة.',
    'footer.top': 'العودة للأعلى',

    // Error
    'error.title': 'حدث خطأ ما',

    // Loading
    'loading': 'جاري التحميل…',

    // Common
    'common.back': 'رجوع',
    'lang.switch': 'تغيير اللغة',

    // Modal / Carousel / Contact
    'modal.close': 'إغلاق',
    'carousel.prev': 'السابق',
    'carousel.next': 'التالي',
    'carousel.goToSlide': 'الانتقال إلى الشريحة {n}',
    'contact.instagram': 'إنستغرام',

    // Admin — Login
    'admin.access': 'دخول الإدارة',
    'admin.access.desc': 'أدخل كلمة مرور الإدارة لإدارة تطبيقات الموقع.',
    'admin.password': 'كلمة المرور',
    'admin.email': 'البريد الإلكتروني',
    'admin.emailPlaceholder': 'thebossadmin@jalalamanj.online',
    'admin.unlock': 'فتح لوحة التحكم',
    'admin.wrongCredentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مجدداً.',

    // Admin — Shell & Tabs
    'admin.control': 'لوحة التحكم',
    'admin.control.desc': 'إدارة التطبيقات والخدمات المعروضة في الموقع. تُحفظ التغييرات في هذا المتصفح.',
    'admin.saved': 'تم الحفظ',
    'admin.logout': 'تسجيل الخروج',
    'admin.tab.apps': 'التطبيقات',
    'admin.tab.services': 'الخدمات',
    'admin.tab.prompts': 'الأوامر',
    'admin.tab.profile': 'الملف الشخصي',
    'admin.viewSite': 'عرض الموقع',
    'admin.closeForm': 'إغلاق النموذج',
    'admin.cancel': 'إلغاء',

    // Admin — Apps
    'admin.addApp': 'إضافة تطبيق جديد',
    'admin.editApp': 'تعديل التطبيق',
    'admin.addAppShort': 'إضافة تطبيق',
    'admin.updateApp': 'تحديث التطبيق',
    'admin.saveChanges': 'حفظ التغييرات',
    'admin.resetDefaults': 'إعادة تعيين الافتراضي',
    'admin.title': 'العنوان',
    'admin.category': 'الفئة',
    'admin.year': 'السنة',
    'admin.client': 'العميل',
    'admin.noClient': 'لا يوجد عميل',
    'admin.shortDesc': 'الوصف المختصر',
    'admin.fullDesc': 'الوصف الكامل',
    'admin.image': 'الصورة',
    'admin.uploadImage': 'رفع صورة',
    'admin.customUrl': 'رابط مخصص',
    'admin.pasteImage': 'أو الصق صورة (Ctrl+V)',
    'admin.uploadedPreview': 'الصورة المرفوعة (محفوظة في هذا المتصفح)',
    'admin.pasteUrl': 'أو الصق رابط الصورة هنا',
    'admin.label': 'التسمية',
    'admin.value': 'القيمة',
    'admin.addTag': 'إضافة وسم',
    'admin.removeTag': 'إزالة الوسم',
    'admin.downloadUrl': 'رابط التحميل',
    'admin.editX': 'تعديل {name}',
    'admin.deleteX': 'حذف {name}',
    'admin.appsNote': '{count} تطبيقات · انقر "حفظ التغييرات" للحفظ.',

    // Admin — Services
    'admin.addCategory': 'إضافة فئة',
    'admin.editCategory': 'تعديل الفئة',
    'admin.updateCategory': 'تحديث الفئة',
    'admin.saveServices': 'حفظ الخدمات',
    'admin.resetServices': 'إعادة تعيين الخدمات',
    'admin.subtitle': 'العنوان الفرعي',
    'admin.description': 'الوصف',
    'admin.icon': 'الأيقونة',
    'admin.editService': 'تعديل الخدمة',
    'admin.addService': 'إضافة خدمة',
    'admin.updateService': 'تحديث الخدمة',
    'admin.deliverables': 'التسليمات (سطر لكل عنصر)',
    'admin.buttonAction': 'إجراء الزر',
    'admin.actionRequest': 'طلب الخدمة',
    'admin.actionLink': 'فتح الرابط',
    'admin.actionDownload': 'تحميل',
    'admin.linkUrl': 'رابط / ملف',
    'admin.buttonLabel': 'نص الزر (اختياري)',
    'admin.buttonLabelPlaceholder': 'اتركه فارغاً للافتراضي (مثال: طلب الخدمة)',
    'admin.noCategories': 'لا توجد فئات بعد',
    'admin.noCategories.desc': 'انقر "إضافة فئة" لإنشاء أول فئة خدمات، ثم أضف الخدمات داخلها.',
    'admin.servicesCount': '{count} خدمات',
    'admin.servicesNote': '{count} خدمات · انقر "حفظ الخدمات" للحفظ.',

    // Admin — Prompts
    'admin.savePrompts': 'حفظ الأوامر',
    'admin.downloadPromptsJson': 'تنزيل ملف الأوامر JSON',
    'admin.resetPrompts': 'إعادة تعيين الأوامر',
    'admin.editPrompt': 'تعديل الأمر',
    'admin.addPrompt': 'إضافة أمر',
    'admin.updatePrompt': 'تحديث الأمر',
    'admin.preview': 'معاينة',
    'admin.promptText': 'نص الأمر (مخفي عن الزوار — يُنسخ إلى الحافظة فقط)',
    'admin.promptTextPlaceholder': 'الصق نص الأمر هنا...',
    'admin.howToUse': 'طريقة الاستخدام (اختياري)',
    'admin.titleAr': 'العنوان بالعربية (اختياري)',
    'admin.stepTextAr': 'نص الخطوة بالعربية (اختياري)',
    'admin.addStep': 'إضافة خطوة',
    'admin.stepPlaceholder': 'الخطوة {n}...',
    'admin.moveUp': 'تحريك لأعلى',
    'admin.moveDown': 'تحريك لأسفل',
    'admin.deleteStep': 'حذف الخطوة',
    'admin.noPromptCats': 'لا توجد فئات أوامر بعد',
    'admin.noPromptCats.desc': 'انقر "إضافة فئة" لإنشاء أول فئة أوامر، ثم أضف الأوامر داخلها.',
    'admin.promptsCount': '{count} أوامر',
    'admin.promptMeta': '{count} أوامر · انقر لل{action}',
    'admin.collapse': 'طي',
    'admin.expand': 'توسيع',
    'admin.hiddenChars': '{count} حرف · مخفي',
    'admin.promptsNote': '{count} فئات · انقر "حفظ الأوامر" للحفظ.',

    // Admin — Profile
    'admin.experience': 'الخبرات',
    'admin.addExperience': 'إضافة خبرة',
    'admin.editExperience': 'تعديل الخبرة',
    'admin.updateExperience': 'تحديث الخبرة',
    'admin.deleteExperience': 'حذف الخبرة',
    'admin.saveProfile': 'حفظ الملف الشخصي',
    'admin.resetProfile': 'إعادة تعيين الملف الشخصي',
    'admin.role': 'الدور',
    'admin.company': 'الشركة',
    'admin.yearPlaceholder': '2023 — الآن',
    'admin.rolePlaceholder': 'مطور رئيسي',
    'admin.companyPlaceholder': 'اسم الشركة',
    'admin.expDescPlaceholder': 'ماذا فعلت في هذا الدور...',
    'admin.noExperience': 'لا توجد خبرات مضافة بعد.',
    'admin.certifications': 'الشهادات',
    'admin.addCertification': 'إضافة شهادة',
    'admin.editCertification': 'تعديل الشهادة',
    'admin.updateCertification': 'تحديث الشهادة',
    'admin.deleteCertification': 'حذف الشهادة',
    'admin.name': 'الاسم',
    'admin.issuer': 'الجهة المانحة',
    'admin.credentialId': 'معرف الشهادة (اختياري)',
    'admin.certNamePlaceholder': 'اسم الشهادة',
    'admin.issuerPlaceholder': 'المنظمة المانحة',
    'admin.certYearPlaceholder': 'مثال: 2024',
    'admin.credentialIdPlaceholder': 'مثال: CERT-12345',
    'admin.noCerts': 'لا توجد شهادات مضافة بعد.',
    'admin.noCertifications': 'لا توجد شهادات مضافة بعد.',
    'admin.languages': 'اللغات',
    'admin.addLanguage': 'إضافة لغة',
    'admin.editLanguage': 'تعديل اللغة',
    'admin.updateLanguage': 'تحديث اللغة',
    'admin.deleteLanguage': 'حذف اللغة',
    'admin.language': 'اللغة',
    'admin.level': 'المستوى',
    'admin.languageLabel': 'اللغة',
    'admin.levelLabel': 'المستوى',
    'admin.languagePlaceholder': 'مثال: العربية',
    'admin.levelPlaceholder': 'مثال: اللغة الأم',
    'admin.noLanguages': 'لا توجد لغات مضافة بعد.',
    'admin.profileNote': 'الخبرات والشهادات واللغات · انقر "حفظ الملف الشخصي" للحفظ.',

    // GitHub Sync
    'gh.title': 'مزامنة GitHub — النشر لجميع الزوار',
    'gh.token': 'رمز GitHub (PAT دقيق، المحتويات: قراءة+كتابة على هذا المستودع فقط)',
    'gh.tokenLabel': 'رمز GitHub (PAT دقيق، المحتويات: قراءة+كتابة على هذا المستودع فقط)',
    'gh.repo': 'المستودع',
    'gh.repoLabel': 'المستودع',
    'gh.tokenPlaceholder': 'github_pat_…',
    'gh.repoPlaceholder': 'owner/repo',
    'gh.saveConnection': 'حفظ الاتصال',
    'gh.pushing': 'جارٍ النشر…',
    'gh.note': 'يُخزَّن الرمز في متصفحك فقط ويُرسل إلى api.github.com. النشر يستبدل ملف البيانات في المستودع ويُطلق النشر التلقائي — دون حاجة لتنزيل يدوي. الحفظ يدفع تلقائياً عند حفظ الرمز.',
    'gh.tokenFirst': 'أدخل رمز GitHub أولاً.',
    'gh.pushApps': 'جارٍ نشر التطبيقات إلى GitHub…',
    'gh.pushServices': 'جارٍ نشر الخدمات إلى GitHub…',
    'gh.pushPrompts': 'جارٍ النشر إلى GitHub…',
    'gh.pushAbout': 'جارٍ نشر بيانات الملف إلى GitHub…',
    'gh.pushed': 'تم النشر — الموقع يعيد النشر الآن. سيظهر التحديث للزوار خلال ~دقيقتين.',
    'gh.failed': 'فشل النشر.',
    'gh.saveFailedPrompts': 'تعذر حفظ الأوامر في تخزين المتصفح.',
    'gh.connectionSaved': 'تم حفظ اتصال GitHub.',
    'gh.pushAppsLabel': 'نشر التطبيقات إلى GitHub',
    'gh.pushServicesLabel': 'نشر الخدمات إلى GitHub',
    'gh.pushPromptsLabel': 'نشر الأوامر إلى GitHub',
    'gh.pushProfileLabel': 'نشر الملف الشخصي إلى GitHub',
  },
  en: {
    // Site
    'site.name': 'JALAL AMANJ',
    'background.alt': 'Background Architectural Interior',

    // Hero
    'hero.statement': 'I create practical digital solutions, applications, and AI-powered tools — thoughtful software that gets things done.','hero.explore': 'Explore My Work',
    'hero.contact': 'Get in Touch',

    // Navigation
    'nav.home': 'Home',
    'nav.work': 'My Work',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.cta': 'Get in Touch',

    // My Work
    'work.eyebrow': 'My Work',
    'work.title': "Applications I've Built",
    'work.subtitle': 'Desktop applications and digital tools, designed to be practical, reliable, and considered.',

    // Services Preview
    'services.eyebrow': 'My Services',
    'services.sectionTitle': 'Simple Services, Real Value',
    'services.sectionSubtitle': 'Online free and paid services.',
    'svc.prompts.title': 'Ready-to-Copy Prompts',
    'svc.prompts.desc': 'High-quality, tested prompts that are ready to use.',
    'svc.prompts.cta': 'Browse Prompts',
    'svc.generation.title': 'Prompt Generation',
    'svc.generation.desc': 'Custom prompts created for specific needs, goals, and workflows.',
    'svc.generation.cta': 'Request a Prompt',
    'svc.wheel.title': 'Questions and Names Wheel',
    'svc.wheel.desc': 'Interactive wheels for questions, names, selections, and activities.',
    'svc.wheel.cta': 'Contact Me',

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

    // Murshid / Edara Pages
    'murshid.title': 'Murshid',
    'edara.title': 'Edara',
    'pages.comingSoon': 'Coming soon!',

    // Murshid description
    'murshid.tagline': 'Secure Document and Personal Data Management',
    'murshid.about.1': 'Murshid is a desktop application designed to help users securely manage, organize, and maintain their documents and personal information.',
    'murshid.about.2': 'Murshid is designed to operate primarily offline. Users can use the core features of the application and manage their information locally on their own device without requiring a continuous internet connection.',
    'murshid.onlineBackup': 'Online Backup',
    'murshid.backup.1': 'Murshid provides an optional Online Backup feature that allows users to create backups of their Murshid data in their own Google Drive account.',
    'murshid.backup.2': 'When a user chooses to enable Online Backup, they can connect their personal Google account to Murshid through Google’s secure authentication system. The user explicitly authorizes Murshid to use the requested Google Drive access for the purpose of creating and managing Murshid backup files.',
    'murshid.backup.3': 'The Google Drive connection is used exclusively for Murshid’s backup functionality. Murshid does not access, read, modify, or manage unrelated personal files stored in the user’s Google Drive.',
    'murshid.backup.4': 'Users remain in control of their Google account and their Google Drive data. Connecting a Google account is optional and is not required to use Murshid’s core offline functionality.',
    'murshid.why.title': 'Why Murshid Requests Google Account Access',
    'murshid.why.1': 'Murshid requests Google account authentication to securely identify the user’s connected account and to provide the optional Online Backup functionality.',
    'murshid.why.2': 'The requested Google Drive access is used to store and manage backup files created by Murshid in the user’s own Google Drive account.',
    'murshid.why.3': 'Murshid does not use Google account access for advertising, profiling, or accessing unrelated user data.',
    'murshid.privacy.title': 'Privacy',
    'murshid.privacy.1': 'Murshid respects the privacy and security of user information. Data managed by Murshid remains under the user’s control, and the Google Drive connection is used only for the functionality described above.',
    'murshid.privacy.2': 'For complete information about how Murshid handles user information and Google account data, please review our:',

    // Murshid legal documents
    'murshid.legal': 'Legal Documents',
    'murshid.legal.desc': 'Legal documentation for the Murshid application.',
    'murshid.privacy': 'Privacy Policy',
    'murshid.terms': 'Terms of Service',
    'murshid.eula': 'End User License Agreement',
    'legal.back': 'Back',

    // Edara description
    'edara.tagline': 'School Management and Administrative System',
    'edara.about.1': 'Edara is a desktop application designed to help schools and educational administrations manage their administrative and educational records in one organized environment.',
    'edara.about.2': 'Edara allows authorized school personnel to manage essential school information, including student and staff records, documents, ministry correspondence, templates, exports, and other administrative data required for day-to-day school operations.',
    'edara.about.3': 'Edara is designed primarily as a local desktop application. School data is stored locally on the user\'s computer, allowing schools to manage their information without requiring continuous internet access or storing their operational database on Edara\'s servers.',
    'edara.local.title': 'Local Data Management',
    'edara.local.1': 'Edara keeps the school\'s operational information on the computer where the application is installed. This may include student records, staff information, school details, documents, ministry documents, templates, and other information entered by the school.',
    'edara.local.2': 'The school remains responsible for the information it enters into Edara and controls the locally stored data.',
    'edara.cloud.title': 'Backup and Cloud Storage',
    'edara.cloud.1': 'Edara provides optional backup functionality through supported cloud services, including Google Drive and Microsoft OneDrive.',
    'edara.cloud.2': 'When a user chooses to enable cloud backup, Edara stores the backup in the user\'s own connected Google Drive or Microsoft OneDrive account.',
    'edara.cloud.3': 'Cloud backup is optional and is not required for the core local functionality of Edara.',
    'edara.cloud.4': 'Edara does not use the developer\'s personal cloud storage to store school data, and the developer does not routinely receive or store copies of the user\'s school database or backup contents.',
    'edara.licensing.title': 'Licensing',
    'edara.licensing.1': 'Edara is a paid application provided through a license-based model.',
    'edara.licensing.2': 'Licenses can be purchased as a one-time purchase and are associated with a single authorized device.',
    'edara.licensing.3': 'The license system is used to activate and manage the user\'s authorized copy of Edara.',
    'edara.privacy.title': 'Privacy and Security',
    'edara.privacy.1': 'Edara is designed with a local-first approach to school data management. The application does not use school data for advertising, behavioral profiling, or targeted marketing.',
    'edara.privacy.2': 'For more information about how Edara handles information, please review our:',

    // Edara legal documents
    'edara.legal': 'Legal Documents',
    'edara.legal.desc': 'Legal documentation for the Edara application.',
    'edara.privacy': 'Privacy Policy',
    'edara.terms': 'Terms of Service',
    'edara.eula': 'End User License Agreement',

    // Prompts Page
    'prompts.back': 'Back',
    'prompts.title': 'Prompts',
    'prompts.loading': 'Loading Prompts...',
    'prompts.empty.title': 'No Prompt Categories Yet',
    'prompts.empty.desc': 'Prompt categories will appear here once added through the admin dashboard.',
    'prompts.category.empty.title': 'No Prompts Here Yet',
    'prompts.category.empty.desc': 'Prompts for this category will appear once added through the admin dashboard.',
    'prompts.copy': 'Copy Prompt',
    'prompts.copied': 'Copied!',
    'prompts.howto': 'How to use',
    'prompts.howto.title': 'How to Use',
    'prompts.howto.close': 'Close how to use',
    'prompts.pick': 'Pick a category, then copy the prompt you need.',
    'prompts.active.pick': '— pick a card and copy its prompt.',
    'prompts.view.list': 'List view',
    'prompts.view.grid': 'Grid view',
    'prompts.fill.title': 'Prepare Your Prompt',
    'prompts.fill.desc': 'Fill the fields below, then copy your ready prompt.',
    'prompts.fill.copy': 'Copy Prompt',
    'prompts.fill.cancel': 'Cancel',
    'prompts.fill.close': 'Close',
    'prompts.open': 'Open',
    'prompts.prompt': 'prompt',
    'prompts.prompts': 'prompts',

    // Product Carousel
    'products.featured': 'Latest Apps',
    'products.empty': 'Projects are on the way.',
    'products.view': 'View Project',

    // Contact
    'contact.eyebrow': 'Contact',
    'contact.lead': "Let's Connect",
    'contact.title': 'Contact Me.',
    'contact.received.title': 'Dialogue Received',
    'contact.received.desc': 'Thank you for reaching out. Jalal Amanj will review your technical inquiry and respond within 24 business hours.',
    'contact.received.again': 'Send Another Inquiry',
    'contact.name': 'Your Name',
    'contact.email': 'Email or Phone',
    'contact.message': 'Project Vision / Inquiry',
    'contact.sending': 'Transmitting...',
    'contact.send': 'Send',
    'contact.or': 'OR USE',

    // Footer
    'footer.rights': '© 2026 All rights reserved.',
    'footer.top': 'Back to top',

    // Error
    'error.title': 'Something went wrong',

    // Loading
    'loading': 'Loading…',

    // Common
    'common.back': 'Back',
    'lang.switch': 'Switch language',

    // Modal / Carousel / Contact
    'modal.close': 'Close',
    'carousel.prev': 'Previous',
    'carousel.next': 'Next',
    'carousel.goToSlide': 'Go to slide {n}',
    'contact.instagram': 'Instagram',

    // Admin — Login
    'admin.access': 'Admin Access',
    'admin.access.desc': 'Enter the admin password to manage portfolio apps.',
    'admin.password': 'Password',
    'admin.email': 'Email Address',
    'admin.emailPlaceholder': 'thebossadmin@jalalamanj.online',
    'admin.unlock': 'Unlock Dashboard',
    'admin.wrongCredentials': 'Incorrect email or password. Try again.',

    // Admin — Shell & Tabs
    'admin.control': 'Admin Control',
    'admin.control.desc': 'Manage the apps and services shown on the site. Changes persist in this browser.',
    'admin.saved': 'Saved',
    'admin.logout': 'Logout',
    'admin.tab.apps': 'Apps',
    'admin.tab.services': 'Services',
    'admin.tab.prompts': 'Prompts',
    'admin.tab.profile': 'Profile',
    'admin.viewSite': 'View Site',
    'admin.closeForm': 'Close form',
    'admin.cancel': 'Cancel',

    // Admin — Apps
    'admin.addApp': 'Add New App',
    'admin.editApp': 'Edit App',
    'admin.addAppShort': 'Add App',
    'admin.updateApp': 'Update App',
    'admin.saveChanges': 'Save Changes',
    'admin.resetDefaults': 'Reset to Defaults',
    'admin.title': 'Title',
    'admin.category': 'Category',
    'admin.year': 'Year',
    'admin.client': 'Client',
    'admin.noClient': 'No client',
    'admin.shortDesc': 'Short Description',
    'admin.fullDesc': 'Full Description',
    'admin.image': 'Image',
    'admin.uploadImage': 'Upload Image',
    'admin.customUrl': 'Custom URL',
    'admin.pasteImage': 'or paste an image (Ctrl+V)',
    'admin.uploadedPreview': 'Uploaded image (stored in this browser)',
    'admin.pasteUrl': 'or paste an image URL here',
    'admin.label': 'Label',
    'admin.value': 'Value',
    'admin.addTag': 'Add Tag',
    'admin.removeTag': 'Remove tag',
    'admin.downloadUrl': 'Download URL',
    'admin.editX': 'Edit {name}',
    'admin.deleteX': 'Delete {name}',
    'admin.appsNote': '{count} apps · Click "Save Changes" to persist.',

    // Admin — Services
    'admin.addCategory': 'Add Category',
    'admin.editCategory': 'Edit Category',
    'admin.updateCategory': 'Update Category',
    'admin.saveServices': 'Save Services',
    'admin.resetServices': 'Reset Services',
    'admin.subtitle': 'Subtitle',
    'admin.description': 'Description',
    'admin.icon': 'Icon',
    'admin.editService': 'Edit Service',
    'admin.addService': 'Add Service',
    'admin.updateService': 'Update Service',
    'admin.deliverables': 'Deliverables (one per line)',
    'admin.buttonAction': 'Button Action',
    'admin.actionRequest': 'Request Service',
    'admin.actionLink': 'Open Link',
    'admin.actionDownload': 'Download',
    'admin.linkUrl': 'Link / File URL',
    'admin.buttonLabel': 'Button Label (optional)',
    'admin.buttonLabelPlaceholder': 'Leave empty for default (e.g. Request Service)',
    'admin.noCategories': 'No categories yet',
    'admin.noCategories.desc': 'Click "Add Category" to create your first service category, then add services inside it.',
    'admin.servicesCount': '{count} services',
    'admin.servicesNote': '{count} services · Click "Save Services" to persist.',

    // Admin — Prompts
    'admin.savePrompts': 'Save Prompts',
    'admin.downloadPromptsJson': 'Download Prompts JSON',
    'admin.resetPrompts': 'Reset Prompts',
    'admin.editPrompt': 'Edit Prompt',
    'admin.addPrompt': 'Add Prompt',
    'admin.updatePrompt': 'Update Prompt',
    'admin.preview': 'Preview',
    'admin.promptText': 'Prompt Text (hidden from visitors — only copied to clipboard)',
    'admin.promptTextPlaceholder': 'Paste the prompt text here...',
    'admin.howToUse': 'How to Use (optional)',
    'admin.titleAr': 'Arabic Title (optional)',
    'admin.stepTextAr': 'Step text (Arabic, optional)',
    'admin.addStep': 'Add Step',
    'admin.stepPlaceholder': 'Step {n}...',
    'admin.moveUp': 'Move up',
    'admin.moveDown': 'Move down',
    'admin.deleteStep': 'Delete step',
    'admin.noPromptCats': 'No prompt categories yet',
    'admin.noPromptCats.desc': 'Click "Add Category" to create your first prompt category, then add prompts inside it.',
    'admin.promptsCount': '{count} prompts',
    'admin.promptMeta': '{count} prompts · click to {action}',
    'admin.collapse': 'collapse',
    'admin.expand': 'expand',
    'admin.hiddenChars': '{count} chars · hidden',
    'admin.promptsNote': '{count} categories · Click "Save Prompts" to persist.',

    // Admin — Profile
    'admin.experience': 'Experience',
    'admin.addExperience': 'Add Experience',
    'admin.editExperience': 'Edit Experience',
    'admin.updateExperience': 'Update Experience',
    'admin.deleteExperience': 'Delete experience',
    'admin.saveProfile': 'Save Profile',
    'admin.resetProfile': 'Reset Profile',
    'admin.role': 'Role',
    'admin.company': 'Company',
    'admin.yearPlaceholder': '2023 — Present',
    'admin.rolePlaceholder': 'Lead Developer',
    'admin.companyPlaceholder': 'Company name',
    'admin.expDescPlaceholder': 'What you did in this role...',
    'admin.noExperience': 'No experience added yet.',
    'admin.certifications': 'Certifications',
    'admin.addCertification': 'Add Certification',
    'admin.editCertification': 'Edit Certification',
    'admin.updateCertification': 'Update Certification',
    'admin.deleteCertification': 'Delete certification',
    'admin.name': 'Name',
    'admin.issuer': 'Issuer',
    'admin.credentialId': 'Credential ID (optional)',
    'admin.certNamePlaceholder': 'Certification name',
    'admin.issuerPlaceholder': 'Issuing organization',
    'admin.certYearPlaceholder': 'e.g. 2024',
    'admin.credentialIdPlaceholder': 'e.g. CERT-12345',
    'admin.noCerts': 'No certifications added yet.',
    'admin.noCertifications': 'No certifications added yet.',
    'admin.languages': 'Languages',
    'admin.addLanguage': 'Add Language',
    'admin.editLanguage': 'Edit Language',
    'admin.updateLanguage': 'Update Language',
    'admin.deleteLanguage': 'Delete language',
    'admin.language': 'Language',
    'admin.level': 'Level',
    'admin.languageLabel': 'Language',
    'admin.levelLabel': 'Level',
    'admin.languagePlaceholder': 'e.g. English',
    'admin.levelPlaceholder': 'e.g. Native',
    'admin.noLanguages': 'No languages added yet.',
    'admin.profileNote': 'Experience, certifications, and languages · Click "Save Profile" to persist.',

    // GitHub Sync
    'gh.title': 'GitHub Sync — publish to all visitors',
    'gh.token': 'GitHub Token (fine-grained PAT, Contents: read+write on this repo only)',
    'gh.tokenLabel': 'GitHub Token (fine-grained PAT, Contents: read+write on this repo only)',
    'gh.repo': 'Repository',
    'gh.repoLabel': 'Repository',
    'gh.tokenPlaceholder': 'github_pat_…',
    'gh.repoPlaceholder': 'owner/repo',
    'gh.saveConnection': 'Save Connection',
    'gh.pushing': 'Pushing…',
    'gh.note': 'Token is stored only in your browser and sent to api.github.com. Pushing overwrites the data file in the repo and triggers the deploy — no manual download needed. "Save" pushes automatically when a token is saved.',
    'gh.tokenFirst': 'Enter a GitHub token first.',
    'gh.pushApps': 'Pushing apps to GitHub…',
    'gh.pushServices': 'Pushing services to GitHub…',
    'gh.pushPrompts': 'Pushing to GitHub…',
    'gh.pushAbout': 'Pushing about data to GitHub…',
    'gh.pushed': 'Pushed — site is redeploying. Visitors see updates in ~2 min.',
    'gh.failed': 'Push failed.',
    'gh.saveFailedPrompts': 'Could not save prompts to browser storage.',
    'gh.connectionSaved': 'GitHub connection saved.',
    'gh.pushAppsLabel': 'Push Apps to GitHub',
    'gh.pushServicesLabel': 'Push Services to GitHub',
    'gh.pushPromptsLabel': 'Push Prompts to GitHub',
    'gh.pushProfileLabel': 'Push Profile to GitHub',
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

export function localizeProduct(product: Product, lang: Lang): Product {
  if (lang === 'en') return product;

  const title = translations[lang][`product.${product.id}.title`];
  const category = translations[lang][`product.${product.id}.category`];
  const shortDescription = translations[lang][`product.${product.id}.shortDescription`];
  const fullDescription = translations[lang][`product.${product.id}.fullDescription`];

  const specs = product.specs.map((spec) => ({
    label: translations[lang][`product.spec.label.${spec.label}`] ?? spec.label,
    value: translations[lang][`product.spec.value.${spec.value}`] ?? spec.value,
  }));

  return {
    ...product,
    title: title ?? product.title,
    category: category ?? product.category,
    shortDescription: shortDescription ?? product.shortDescription,
    fullDescription: fullDescription ?? product.fullDescription,
    specs,
  };
}

export function localizePromptCategory(category: PromptCategory, lang: Lang): PromptCategory {
  if (lang === 'en') return category;
  return { ...category, title: category.titleAr ?? category.title };
}

export function localizePromptItem(prompt: PromptItem, lang: Lang): PromptItem {
  if (lang === 'en') return prompt;
  return {
    ...prompt,
    title: prompt.titleAr ?? prompt.title,
    howToUse: prompt.howToUse?.map((step) => ({
      ...step,
      text: step.textAr ?? step.text,
    })),
  };
}
