export type LegalDocId = 'privacy' | 'terms' | 'eula';

export interface LegalDocSection {
  heading: string;
  body: string;
  bullets?: string[];
  after?: string;
}

export interface LegalDocMetaRow {
  labelAr: string;
  labelEn: string;
  valueAr: string;
  valueEn: string;
}

export interface LegalDocument {
  id: LegalDocId;
  titleAr: string;
  titleEn: string;
  meta: LegalDocMetaRow[];
  ar: LegalDocSection[];
  en: LegalDocSection[];
}

const META: LegalDocMetaRow[] = [
  { labelAr: 'المنتج', labelEn: 'Product', valueAr: 'Murshid / مُرشِد', valueEn: 'Murshid / مُرشِد' },
  { labelAr: 'المالك', labelEn: 'Owner', valueAr: 'جلال أمانج عبد العزيز', valueEn: 'Jalal Amanj Abdulaziz' },
  { labelAr: 'المطور', labelEn: 'Developer', valueAr: 'جلال أمانج', valueEn: 'Jalal Amanj' },
  { labelAr: 'البريد الإلكتروني', labelEn: 'Email', valueAr: 'jalaldev001@yahoo.com', valueEn: 'jalaldev001@yahoo.com' },
  { labelAr: 'الموقع', labelEn: 'Website', valueAr: 'jalalamanj.online', valueEn: 'jalalamanj.online' },
  { labelAr: 'تاريخ الإصدار', labelEn: 'Issue Date', valueAr: '10 أغسطس 2026', valueEn: '10 August 2026' },
];

export const legalDocuments: Record<LegalDocId, LegalDocument> = {
  privacy: {
    id: 'privacy',
    titleAr: 'سياسة الخصوصية',
    titleEn: 'Privacy Policy',
    meta: META,
    ar: [
      {
        heading: '1. مقدمة ونطاق السياسة',
        body: 'توضح هذه السياسة كيفية تعامل Murshid / مُرشِد مع البيانات. تنطبق على التطبيق، وعلى البيانات التي يقدمها العميل مباشرة إلى المالك أو المطور لأغراض البيع والترخيص والدعم. لا تجمع هذه السياسة بيانات لم يذكرها المستخدم أو يوافق على تقديمها مباشرة.',
      },
      {
        heading: '2. البيانات التي يجمعها المطور مباشرة',
        body: 'يجمع المالك أو المطور، خارج التطبيق وبشكل مباشر ضمن عملية البيع أو الترخيص أو الدعم، البيانات الآتية عند تقديمها من العميل:',
        bullets: [
          'الاسم الكامل للعميل.',
          'البريد الإلكتروني ورقم الهاتف.',
          'العنوان ومكان العمل.',
          'معلومات الجهاز اللازمة لإصدار الترخيص أو إدارته.',
        ],
        after: 'لا تُجمع هذه البيانات تلقائيًا بواسطة التطبيق ولا تُرسل من التطبيق إلى خادم ترخيص؛ مفتاح التفعيل يعمل دون اتصال بالإنترنت.',
      },
      {
        heading: '3. بيانات الطلاب والسجلات والملفات',
        body: 'تبقى بيانات الطلاب، وسجلات الإرشاد، والملفات التي ينشئها المستخدم محليًا على جهاز المستخدم. لا يرسل التطبيق هذه البيانات إلى أي خادم تابع لـ Murshid أو المطور، ولا يحتفظ المطور بنسخة منها.',
      },
      {
        heading: '4. النسخ الاحتياطي إلى Google Drive',
        body: 'النسخ الاحتياطي إلى Google Drive اختياري. عند تفعيله، تُحفظ البيانات في حساب Google Drive الشخصي للمستخدم. لا يحتفظ المطور بنسخة من المحتوى الذي يختار المستخدم رفعه.',
      },
      {
        heading: '5. التحديثات وعدم التتبع',
        body: 'تتوفر التحديثات عبر GitHub. لا يرسل التطبيق معلومات الجهاز عند فحص التحديثات. كما لا يستخدم التطبيق تحليلات الاستخدام أو التتبع أو تقارير الأعطال أو أي وظائف للذكاء الاصطناعي.',
      },
      {
        heading: '6. أغراض استخدام بيانات العملاء',
        body: 'تُستخدم بيانات العميل التي يجمعها المطور مباشرة لإتمام البيع، وإصدار أو إدارة الترخيص، وإثبات الملكية، وتقديم الدعم الفني، والاحتفاظ بالسجلات القانونية.',
      },
      {
        heading: '7. الاحتفاظ بالبيانات',
        body: 'يحتفظ المطور ببيانات العملاء طوال فترة استخدام الترخيص، ولمدة معقولة بعد ذلك لأغراض السجلات القانونية والدعم وإثبات ملكية الترخيص.',
      },
      {
        heading: '8. مشاركة البيانات وأمنها',
        body: 'لا يبيع المطور بيانات العملاء. ولا يشاركها إلا بالقدر اللازم لتنفيذ غرض مشروع يتعلق بالبيع أو الترخيص أو الدعم أو امتثال قانوني واجب. يتخذ المطور تدابير معقولة لحماية البيانات التي يحتفظ بها.',
      },
      {
        heading: '9. حقوق العميل والتواصل',
        body: 'يمكن للعميل التواصل لطلب تصحيح بياناته أو الاستفسار عنها أو طلب التعامل مع طلب متعلق بها، بما لا يتعارض مع متطلبات السجلات القانونية أو إثبات الملكية أو الدعم.',
        after: 'البريد الإلكتروني: jalaldev001@yahoo.com | الموقع: jalalamanj.online',
      },
      {
        heading: '10. القانون الحاكم والتغييرات',
        body: 'تخضع هذه السياسة لقوانين جمهورية العراق، وتكون المحاكم المختصة في كركوك مختصة بالنظر في النزاعات ذات الصلة. يجوز تحديث هذه السياسة عند تغير ممارسات Murshid، ويكون تاريخ الإصدار أو التحديث المعلن هو المرجع.',
      },
    ],
    en: [
      {
        heading: '1. Introduction and Scope',
        body: 'This policy explains how Murshid / مُرشِد handles data. It applies to the application and to information a customer provides directly to the Owner or Developer for sales, licensing, and support. It does not describe collection of information that the user has not provided or agreed to provide directly.',
      },
      {
        heading: '2. Customer Information Collected Directly by the Developer',
        body: 'Outside the application, and directly in connection with sales, licensing, or support, the Owner or Developer may collect the following information when supplied by the customer:',
        bullets: [
          'Customer full name.',
          'Email address and telephone number.',
          'Address and workplace.',
          'Device information needed to issue or administer a license.',
        ],
        after: 'This information is not automatically collected by the application and is not sent by the application to a license server; the activation key operates offline.',
      },
      {
        heading: '3. Student Data, Records, and Files',
        body: 'Student data, counseling records, and files created by the user remain locally on the user’s device. The application does not send this content to any Murshid or Developer server, and the Developer does not retain a copy of it.',
      },
      {
        heading: '4. Optional Google Drive Backup',
        body: 'Google Drive backup is optional. If enabled, content is stored in the user’s personal Google Drive account. The Developer does not retain a copy of content that the user chooses to upload.',
      },
      {
        heading: '5. Updates and No Tracking',
        body: 'Updates are available through GitHub. The application does not send device information while checking for updates. The application does not use analytics, tracking, crash reporting, or artificial-intelligence features.',
      },
      {
        heading: '6. Purposes for Customer Information',
        body: 'Customer information collected directly by the Developer is used to complete sales, issue or administer licenses, establish license ownership, provide technical support, and maintain legal records.',
      },
      {
        heading: '7. Retention',
        body: 'The Developer retains customer information throughout the period the license is used and for a reasonable period afterward for legal records, support, and proof of license ownership.',
      },
      {
        heading: '8. Sharing and Security',
        body: 'The Developer does not sell customer information. It is not shared except as reasonably necessary for a legitimate purpose related to sales, licensing, support, or a binding legal obligation. The Developer takes reasonable measures to protect information retained by the Developer.',
      },
      {
        heading: '9. Customer Requests and Contact',
        body: 'A customer may contact the Developer to request correction of customer information, ask about it, or request handling of a related matter, subject to legal-record, ownership-proof, and support requirements.',
        after: 'Email: jalaldev001@yahoo.com | Website: jalalamanj.online',
      },
      {
        heading: '10. Governing Law and Changes',
        body: 'This policy is governed by the laws of the Republic of Iraq. The competent courts in Baghdad have jurisdiction over related disputes. This policy may be updated when Murshid practices change; the stated issue or update date will govern.',
      },
    ],
  },

  terms: {
    id: 'terms',
    titleAr: 'شروط الاستخدام',
    titleEn: 'Terms of Service',
    meta: META,
    ar: [
      {
        heading: '1. قبول الشروط',
        body: 'باستخدام Murshid أو تنزيله أو تثبيته، يوافق المستخدم على هذه الشروط. إذا لم يوافق، فعليه عدم استخدام التطبيق.',
      },
      {
        heading: '2. طبيعة التطبيق والغرض منه',
        body: 'Murshid أداة لإدارة وتنظيم السجلات. لا يقدم تشخيصًا طبيًا أو نفسيًا، ولا يحل محل الحكم المهني أو الاستشارة المختصة أو التقييم السريري.',
      },
      {
        heading: '3. المستخدم ومسؤولياته',
        body: 'المستخدم مسؤول عن دقة البيانات التي يدخلها، وعن الاحتفاظ بنسخ احتياطية مناسبة، وعن استخدام التطبيق والبيانات وفقًا للقوانين واللوائح وسياسات المؤسسة المطبقة عليه.',
      },
      {
        heading: '4. النسخة التجريبية والشراء',
        body: 'تتوفر نسخة تجريبية قبل الشراء. التطبيق مدفوع بشراء لمرة واحدة. بعد الشراء، يمنح الترخيص حق استخدام دائمًا وفقًا لاتفاقية ترخيص المستخدم النهائي.',
      },
      {
        heading: '5. التفعيل والدعم عند تعطل الجهاز',
        body: 'يستخدم Murshid مفتاح تفعيل يعمل دون اتصال بالإنترنت. عند تعطل الجهاز، يمكن للمستخدم طلب ترخيص لجهاز جديد من المطور، ويخضع ذلك للتحقق المعقول من الملكية.',
      },
      {
        heading: '6. المحتوى والملكية',
        body: 'تعود ملكية ملفات PDF وExcel التي ينشئها المستخدم، وبيانات الطلاب والسجلات، إلى المستخدم أو المدرسة بحسب الحال. ويحتفظ المطور بملكية الكود والتصميم والاسم والشعار والقوالب وجميع حقوق الملكية الفكرية الخاصة بالتطبيق.',
      },
      {
        heading: '7. الاستخدام المحظور',
        body: 'لا يجوز للمستخدم نسخ التطبيق أو توزيعه أو بيعه أو تأجيره أو فك هندسته عكسيًا أو التحايل على التفعيل، إلا في الحدود التي يسمح بها القانون صراحةً.',
      },
      {
        heading: '8. عدم الاسترداد',
        body: 'لا يتوفر استرداد للمبالغ بعد الشراء. الترخيص دائم، ولا يتوقف التطبيق بسبب انتهاء مدة.',
      },
      {
        heading: '9. إخلاء المسؤولية وحدودها',
        body: 'يُقدم التطبيق "كما هو" في الحدود التي يسمح بها القانون. لا يضمن المطور أن تكون المخرجات أو البيانات خالية من الأخطاء أو مناسبة لغرض مهني محدد. يظل المستخدم مسؤولًا عن المراجعة المهنية للبيانات والمخرجات وعن آثار استخدامه لها.',
      },
      {
        heading: '10. القانون الحاكم والتواصل',
        body: 'تخضع هذه الشروط لقوانين جمهورية العراق، وتختص المحاكم المختصة في كركوك بالنظر في النزاعات ذات الصلة. للتواصل: jalaldev001@yahoo.com | jalalamanj.online',
      },
    ],
    en: [
      {
        heading: '1. Acceptance of Terms',
        body: 'By using, downloading, or installing Murshid, the user accepts these Terms. If the user does not agree, the user must not use the application.',
      },
      {
        heading: '2. Nature and Purpose of the Application',
        body: 'Murshid is a tool for managing and organizing records. It does not provide medical or psychological diagnosis and does not replace professional judgment, specialized advice, or clinical assessment.',
      },
      {
        heading: '3. User Responsibilities',
        body: 'The user is responsible for the accuracy of data entered, maintaining appropriate backups, and using the application and its data in accordance with applicable laws, regulations, and institutional policies.',
      },
      {
        heading: '4. Trial and Purchase',
        body: 'A trial version is available before purchase. The application is paid through a one-time purchase. After purchase, it grants a perpetual right of use under the End User License Agreement.',
      },
      {
        heading: '5. Activation and Support After Device Failure',
        body: 'Murshid uses an offline activation key. If a device fails, the user may request a license for a new device from the Developer, subject to reasonable verification of ownership.',
      },
      {
        heading: '6. Content and Ownership',
        body: 'PDF and Excel files created by the user, and student data and records, belong to the user or school as applicable. The Developer retains ownership of the code, design, name, logo, templates, and all intellectual-property rights in the application.',
      },
      {
        heading: '7. Prohibited Use',
        body: 'The user may not copy, distribute, sell, rent, reverse engineer, or circumvent activation of the application, except to the extent expressly permitted by law.',
      },
      {
        heading: '8. No Refunds',
        body: 'No refunds are available after purchase. The license is perpetual, and the application does not stop because a period expires.',
      },
      {
        heading: '9. Disclaimer and Limitation',
        body: 'The application is provided "as is" to the extent permitted by law. The Developer does not guarantee that outputs or data are error-free or suitable for a particular professional purpose. The user remains responsible for professional review of data and outputs and for the consequences of their use.',
      },
      {
        heading: '10. Governing Law and Contact',
        body: 'These Terms are governed by the laws of the Republic of Iraq. The competent courts in Baghdad have jurisdiction over related disputes. Contact: jalaldev001@yahoo.com | jalalamanj.online.',
      },
    ],
  },

  eula: {
    id: 'eula',
    titleAr: 'اتفاقية ترخيص المستخدم النهائي',
    titleEn: 'End User License Agreement (EULA)',
    meta: META,
    ar: [
      {
        heading: '1. الأطراف والتعريفات',
        body: 'هذه الاتفاقية بين جلال أمانج عبد العزيز، مالك Murshid / مُرشِد، والمطور جلال أمانج (ويشار إليهما بـ"المرخِّص")، وبين الشخص أو الجهة التي تستخدم التطبيق ("المستخدم" أو "المرخَّص له").',
      },
      {
        heading: '2. منح الترخيص',
        body: 'بعد الشراء والتفعيل، يمنح المرخِّص المستخدم ترخيصًا شخصيًا، غير حصري، غير قابل للنقل، ودائمًا لاستخدام نسخة واحدة من Murshid لمستخدم واحد، وفقًا لهذه الاتفاقية.',
      },
      {
        heading: '3. الدفع والنسخة التجريبية',
        body: 'Murshid منتج مدفوع بشراء لمرة واحدة، وتوجد نسخة تجريبية قبل الشراء. لا توجد رسوم دورية أو تاريخ انتهاء للترخيص الدائم بعد الشراء.',
      },
      {
        heading: '4. التفعيل دون اتصال',
        body: 'يتم التفعيل بمفتاح يعمل دون اتصال بالإنترنت. لا يوجد خادم ترخيص أو تفعيل إلكتروني. إذا تعطل الجهاز، يجوز للمستخدم طلب ترخيص لجهاز جديد، ويجوز للمرخِّص طلب معلومات معقولة للتحقق من الملكية.',
      },
      {
        heading: '5. القيود',
        body: 'لا يجوز للمرخَّص له: (أ) مشاركة المفتاح أو إتاحته لغير المستخدم المرخص له؛ (ب) نسخ أو إعادة توزيع التطبيق؛ (ج) بيعه أو تأجيره أو ترخيصه من الباطن؛ (د) فك هندسته عكسيًا أو تعديل الكود أو تعطيل التفعيل، إلا بالقدر الذي لا يمكن منعُه قانونًا.',
      },
      {
        heading: '6. ملكية الحقوق',
        body: 'لا تنقل هذه الاتفاقية ملكية التطبيق. تظل حقوق الكود والتصميم والاسم والشعار والقوالب وحقوق الملكية الفكرية الأخرى ملكًا حصريًا للمرخِّص. أما بيانات الطلاب والسجلات وملفات التي ينشئها المستخدم فتظل ملكًا للمستخدم أو المدرسة بحسب الحال.',
      },
      {
        heading: '7. البيانات والنسخ الاحتياطي',
        body: 'تظل البيانات محليًا على جهاز المستخدم، أو في Google Drive الشخصي للمستخدم عند تفعيل النسخ الاحتياطي الاختياري. لا يرسل التطبيق بيانات الطلاب أو السجلات إلى خادم، ولا يحتفظ المرخِّص بنسخة منها. المستخدم مسؤول عن النسخ الاحتياطي.',
      },
      {
        heading: '8. التحديثات والدعم',
        body: 'قد تتوفر التحديثات عبر GitHub من دون إرسال معلومات الجهاز عند التحقق منها. الدعم المتاح، إن وجد، لا ينشئ التزامًا بتوفير تحديثات أو ميزات أو توافق مستقبلي محدد.',
      },
      {
        heading: '9. عدم الاسترداد',
        body: 'لا تتوفر استردادات بعد الشراء. ويظل الترخيص دائمًا ولا ينتهي بمرور مدة.',
      },
      {
        heading: '10. الإنهاء',
        body: 'يجوز للمرخِّص إنهاء هذا الترخيص عند إخلال جوهري بهذه الاتفاقية، بما في ذلك الاستخدام غير المصرح به أو مشاركة مفتاح التفعيل، بعد إخطار مناسب متى كان ذلك ممكنًا. لا يحد ذلك من الحقوق التي يفرضها القانون.',
      },
      {
        heading: '11. إخلاء المسؤولية',
        body: 'Murshid أداة تنظيم وإدارة سجلات ولا يقدم تشخيصًا طبيًا أو نفسيًا ولا يحل محل الحكم المهني. إلى الحد المسموح به قانونًا، يقدم التطبيق "كما هو"، ويتحمل المستخدم مسؤولية صحة البيانات ومراجعة المخرجات واستخدامها القانوني.',
      },
      {
        heading: '12. القانون الحاكم والاختصاص',
        body: 'تخضع هذه الاتفاقية لقوانين جمهورية العراق، وتختص المحاكم المختصة في كركوك بالنظر في أي نزاع يتعلق بها.',
      },
    ],
    en: [
      {
        heading: '1. Parties and Definitions',
        body: 'This agreement is between Jalal Amanj Abdulaziz, owner of Murshid / مُرشِد, and Jalal Amanj, the Developer (together, the "Licensor"), and the individual or entity using the application (the "User" or "Licensee").',
      },
      {
        heading: '2. License Grant',
        body: 'Following purchase and activation, the Licensor grants the User a personal, non-exclusive, non-transferable, perpetual license to use one copy of Murshid for one user, subject to this Agreement.',
      },
      {
        heading: '3. Payment and Trial',
        body: 'Murshid is a paid product purchased once, and a trial version is available before purchase. There are no recurring fees and no expiry date for the perpetual license after purchase.',
      },
      {
        heading: '4. Offline Activation',
        body: 'Activation uses an offline key. There is no license server or online activation. If a device fails, the User may request a license for a new device; the Licensor may request reasonable information to verify ownership.',
      },
      {
        heading: '5. Restrictions',
        body: 'The Licensee may not: (a) share the key or make it available to anyone other than the licensed user; (b) copy or redistribute the application; (c) sell, rent, or sublicense it; or (d) reverse engineer, modify the code, or defeat activation, except to the extent such restriction cannot lawfully be imposed.',
      },
      {
        heading: '6. Ownership',
        body: 'This Agreement does not transfer ownership of the application. The code, design, name, logo, templates, and other intellectual-property rights remain exclusively with the Licensor. Student data, records, and PDF and Excel files created by the User remain with the User or school, as applicable.',
      },
      {
        heading: '7. Data and Backup',
        body: 'Data remains locally on the User’s device, or in the User’s personal Google Drive account if optional backup is enabled. The application does not send student data or records to a server, and the Licensor does not retain a copy. The User is responsible for backups.',
      },
      {
        heading: '8. Updates and Support',
        body: 'Updates may be available through GitHub without sending device information during update checks. Support, if available, does not create an obligation to provide updates, features, or a specified future compatibility.',
      },
      {
        heading: '9. No Refunds',
        body: 'No refunds are available after purchase. The license remains perpetual and does not expire with the passage of time.',
      },
      {
        heading: '10. Termination',
        body: 'The Licensor may terminate this license for a material breach of this Agreement, including unauthorized use or sharing of the activation key, after appropriate notice where feasible. This does not limit any rights required by law.',
      },
      {
        heading: '11. Disclaimer',
        body: 'Murshid is a record-management and organization tool. It does not provide medical or psychological diagnosis and does not replace professional judgment. To the extent permitted by law, the application is provided "as is," and the User is responsible for data accuracy, review of outputs, and lawful use.',
      },
      {
        heading: '12. Governing Law and Jurisdiction',
        body: 'This Agreement is governed by the laws of the Republic of Iraq. The competent courts in Baghdad have jurisdiction over any dispute arising from or relating to this Agreement.',
      },
    ],
  },
};
