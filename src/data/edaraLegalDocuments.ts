import {
  LegalDocId,
  LegalDocMetaRow,
  LegalDocument,
} from './legalDocuments';

const META: LegalDocMetaRow[] = [
  { labelAr: 'المنتج', labelEn: 'Product', valueAr: 'Edara / إدارة - نظام إدارة المدارس', valueEn: 'Edara / إدارة - نظام إدارة المدارس' },
  { labelAr: 'المطور', labelEn: 'Developer', valueAr: 'جلال أمانج', valueEn: 'Jalal Amanj' },
  { labelAr: 'الموقع', labelEn: 'Location', valueAr: 'كركوك، العراق', valueEn: 'Kirkuk, Iraq' },
  { labelAr: 'البريد الإلكتروني', labelEn: 'Email', valueAr: 'devjalalamanj@gmail.com', valueEn: 'devjalalamanj@gmail.com' },
  { labelAr: 'الموقع الإلكتروني', labelEn: 'Website', valueAr: 'jalalamanj.online', valueEn: 'jalalamanj.online' },
  { labelAr: 'آخر تحديث', labelEn: 'Last Updated', valueAr: '15 أغسطس 2026', valueEn: '15 August 2026' },
];

export const edaraLegalDocuments: Record<LegalDocId, LegalDocument> = {
  privacy: {
    id: 'privacy',
    titleAr: 'سياسة خصوصية إدارة',
    titleEn: 'Edara Privacy Policy',
    meta: META,
    ar: [
      {
        heading: '1. حول إدارة',
        body: 'إدارة هو تطبيق سطح مكتب مصمم لمساعدة المدارس والإدارات التعليمية على إدارة سجلاتها الإدارية والتعليمية. اعتماداً على الميزات المستخدمة، قد يسمح إدارة للمستخدمين المصرح لهم بإدارة المعلومات المتعلقة بالمدارس والطلاب والموظفين والمستندات ومراسلات الوزارة والقوالب والتصديرات والنسخ الاحتياطية وغيرها من السجلات الإدارية. المعلومات التي تُدخل إلى إدارة تُخزَّن في المقام الأول محلياً على الحاسوب الذي يُثبَّت عليه التطبيق.',
      },
      {
        heading: '2. المعلومات التي تقدمها إلى إدارة',
        body: 'أثناء التسجيل والإعداد، قد يطلب إدارة معلومات أساسية مثل:',
        bullets: [
          'الاسم الكامل.',
          'اسم المدرسة.',
          'نوع المدرسة.',
          'البريد الإلكتروني، إذا كان متوفراً.',
          'رقم الهاتف.',
          'العنوان.',
          'اسم مدير المدرسة.',
          'السنة الدراسية.',
        ],
        after: 'تُستخدم هذه المعلومات لتهيئة التطبيق وإنشاء الملف المحلي للمدرسة. وقد تشمل المعلومات المدخلة في التطبيق أيضاً معلومات إدارة مدرسية مثل سجلات الطلاب وسجلات الموظفين والمستندات ومستندات الوزارة والقوالب والتصديرات وغيرها من المعلومات التي تُدخلها المدرسة أو مستخدموها المصرح لهم.',
      },
      {
        heading: '3. البيانات المدرسية والتعليمية',
        body: 'قد يُستخدم إدارة لتخزين معلومات تتعلق بالطلاب والموظفين والمدارس والمستندات والإدارة التعليمية. تُخزَّن هذه المعلومات محلياً على حاسوب المستخدم كجزء من بيانات تطبيق إدارة. لا يتلقى جلال أمانج نسخة مركزية من قاعدة البيانات التشغيلية للمدرسة بشكل روتيني، ولا يحتفظ بها. المستخدمون والمدارس مسؤولون عن ضمان جمع المعلومات المدخلة إلى إدارة واستخدامها وإدارتها بشكل قانوني ومناسب داخل مؤسستهم.',
      },
      {
        heading: '4. التخزين المحلي',
        body: 'يستخدم إدارة قاعدة بيانات SQLite محلية وأدلة تطبيق محلية لتخزين معلومات التطبيق. قد تشمل هذه السجلات معلومات الملف المدرسي وسجلات الطلاب وسجلات الموظفين والمستندات ومستندات الوزارة والقوالب وسجلات التصدير وإعدادات التطبيق والمعلومات المتعلقة بالنسخ الاحتياطي ومعلومات الترخيص والتفعيل. تبقى هذه السجلات على جهاز المستخدم ما لم يقم المستخدم عمداً بالتصدير أو النسخ الاحتياطي أو أي نقل آخر لها.',
      },
      {
        heading: '5. النسخ الاحتياطي السحابي',
        body: 'يوفر إدارة وظيفة نسخ احتياطي سحابي اختيارية من خلال خدمات تخزين سحابية مدعومة من جهات خارجية، بما في ذلك Google Drive وMicrosoft OneDrive. عندما يختار المستخدم استخدام النسخ الاحتياطي السحابي، تُخزَّن النسخة الاحتياطية في حساب Google Drive أو Microsoft OneDrive الشخصي للمستخدم. لا يستخدم إدارة حساب التخزين السحابي الشخصي للمطور لتخزين بيانات المدرسة الخاصة بالمستخدم. لا يتلقى المطور نسخة من محتوى النسخ الاحتياطي بشكل روتيني. النسخ الاحتياطي السحابي ميزة اختيارية؛ يمكن للمستخدمين اختيار ربط حساب سحابي مدعوم واستخدام وظيفة النسخ الاحتياطي أو عدم ذلك. تخضع خصوصية وأمن النسخ الاحتياطية المخزنة سحابياً أيضاً لسياسات وممارسات الأمن الخاصة بمزود الخدمة السحابية المعني.',
      },
      {
        heading: '6. Google Drive وMicrosoft OneDrive',
        body: 'إذا اخترت ربط Google Drive أو Microsoft OneDrive بـ إدارة، فقد يطلب التطبيق الأذونات اللازمة لإنشاء بيانات النسخ الاحتياطي الخاصة بـ إدارة أو إدارتها أو استعادتها ضمن حسابك السحابي المتصل. تُستخدم هذه الخدمات لوظيفة النسخ الاحتياطي وليست مخصصة لمنح المطور حق الوصول إلى ملفاتك الشخصية غير ذات الصلة في السحابة. لا يستخدم إدارة حسابك السحابي المتصل للإعلانات أو التنميط أو جمع بيانات غير ذات صلة. يمكنك فصل الحساب السحابي المعني من خلال الوظيفة التي يوفرها إدارة أو مزود الخدمة السحابية المعني.',
      },
      {
        heading: '7. المعلومات المجمعة للترخيص والمبيعات',
        body: 'إدارة تطبيق مدفوع يُوزَّع وفق نموذج قائم على الترخيص. لأغراض الترخيص والمبيعات ودعم العملاء والمعاملات، قد يحتفظ المطور بمعلومات أساسية محدودة عن العملاء، والتي قد تشمل:',
        bullets: [
          'الاسم الكامل.',
          'رقم الهاتف.',
          'العنوان.',
          'معلومات مكان العمل أو المدرسة.',
          'البريد الإلكتروني، إذا كان متوفراً.',
          'المعلومات اللازمة لتحديد الترخيص المشترى أو إدارته.',
        ],
        after: 'هذه المعلومات منفصلة عن قاعدة البيانات التشغيلية للمدرسة المخزنة محلياً في إدارة. لا يحتاج المطور إلى تلقي أو تخزين قاعدة بيانات إدارة الكاملة للمدرسة كجزء من عملية الترخيص.',
      },
      {
        heading: '8. تفعيل الترخيص',
        body: 'يستخدم إدارة مفاتيح ترخيص لتفعيل التطبيق. قد ترتبط التراخيص بجهاز محدد؛ الترخيص مخصص للاستخدام على الجهاز الذي تم تفعيله عليه، وفقاً لشروط الترخيص المعمول بها. قد يعالج إدارة المعلومات التقنية اللازمة للتحقق من صحة الترخيص وربطه بجهاز مصرح به. تُستخدم هذه المعلومات لأغراض الترخيص ومنع إساءة الاستخدام وليس للإعلانات أو التنميط السلوكي.',
      },
      {
        heading: '9. المعلومات التي لا نجمعها للإعلانات أو التتبع',
        body: 'لا يستخدم إدارة شبكات إعلانية أو إعلانات سلوكية. بناءً على التنفيذ الحالي، لا يستخدم إدارة عمداً أدوات تتبع إعلانية أو تنميطاً سلوكياً أو بصمات أجهزة أو منصات تحليلات أو بكسلات تتبع أو ملفات تعريف ارتباط تسويقية أو أنظمة قياس عن بعد أو حزم تطوير برمجيات إعلانية تابعة لجهات خارجية. صُمم إدارة لتقديم وظائفه الأساسية دون تتبع سلوك المستخدمين لأغراض إعلانية.',
      },
      {
        heading: '10. تحديثات التطبيق',
        body: 'قد يتحقق إدارة من توفر تحديثات للتطبيق من خلال مصدر التحديث المحدد له، بما في ذلك إصدارات GitHub. تُستخدم آلية فحص التحديثات لتحديد ما إذا كانت هناك نسخة أحدث من إدارة متاحة. لا يرسل التنفيذ الحالي قاعدة بيانات المدرسة أو المستندات أو بيانات التطبيق التشغيلية الأخرى إلى المطور عمداً كجزء من فحص التحديثات.',
      },
      {
        heading: '11. كيف نستخدم المعلومات',
        body: 'قد تُستخدم المعلومات التي يتعامل معها إدارة من أجل:',
        bullets: [
          'توفير وظائف إدارة المدرسة في التطبيق.',
          'الحفاظ على الملف المدرسي المحلي.',
          'إدارة المستندات والسجلات.',
          'إنشاء واستعادة النسخ الاحتياطية عند الطلب.',
          'إدارة تراخيص البرامج وتفعيلها.',
          'معالجة عمليات الشراء وطلبات دعم العملاء.',
          'تقديم الدعم الفني.',
          'توصيل تحديثات التطبيق.',
          'الحفاظ على أمن التطبيق وتشغيله السليم.',
        ],
        after: 'لا نستخدم بيانات إدارة المدرسية المخزنة محلياً في إدارة للإعلانات أو التنميط السلوكي.',
      },
      {
        heading: '12. مشاركة البيانات',
        body: 'لا نبيع بيانات إدارة المدرسية للمستخدمين. لا نشارك محتويات قاعدة بيانات إدارة المحلية مع أطراف ثالثة بشكل روتيني. عندما يستخدم المستخدمون طوعاً خدمات تابعة لجهات خارجية مثل Google Drive أو Microsoft OneDrive للنسخ الاحتياطي، تُنقل المعلومات اللازمة لتوفير تلك الوظيفة إلى الخدمة المختارة وتُخزَّن وفق سياسات ذلك المزود. قد تتم معالجة المعلومات المقدمة إلينا لأغراض الترخيص أو المبيعات أو دعم العملاء عند الحاجة لإتمام تلك الأنشطة.',
      },
      {
        heading: '13. أمن البيانات',
        body: 'يستخدم إدارة تخزيناً محلياً وآليات أمنية للتطبيق تهدف إلى حماية معلومات التطبيق. يستخدم تطبيق Electron اتصالات IPC خاضعة للرقابة وقيوداً أمنية للاتصال بين واجهة التطبيق ووظائف النظام الأساسية له. ومع ذلك، لا يمكن ضمان أمن أي برنامج أو نظام تخزين بشكل كامل. المستخدمون مسؤولون عن الحفاظ على أمن مناسب للحاسوب المثبت عليه إدارة، بما في ذلك أمن نظام التشغيل وحماية حسابات المستخدمين والوصول المادي إلى الجهاز. ولأن إدارة يخزن البيانات التشغيلية محلياً، فإن الوصول غير المصرح به إلى حاسوب المستخدم قد يوفر إمكانية الوصول إلى معلومات إدارة المخزنة محلياً.',
      },
      {
        heading: '14. الاحتفاظ بالبيانات',
        body: 'تبقى معلومات إدارة المدرسية المخزنة محلياً بشكل عام على جهاز المستخدم حتى يحذفها المستخدم أو مسؤول المدرسة أو يزيل بيانات التطبيق أو يدير المعلومات المخزنة بطريقة أخرى. لا يحتفظ المطور بشكل روتيني بنسخة مركزية من هذه البيانات التشغيلية. قد تُحتفظ المعلومات التي يحتفظ بها المطور لأغراض الترخيص أو المبيعات أو دعم العملاء طالما كان ذلك ضرورياً بشكل معقول لتلك الأغراض ولمتطلبات قانونية أو محاسبية أو تجارية معمول بها.',
      },
      {
        heading: '15. حذف البيانات',
        body: 'نظراً لأن قاعدة بيانات إدارة الأساسية تُخزَّن محلياً، فإن المستخدمين والمدارس يتحكمون بشكل عام في حذف بياناتهم التشغيلية في التطبيق. قد يحذف المستخدمون بيانات إدارة المحلية أو يزيلونها من خلال الوظائف المتاحة في التطبيق أو من خلال إدارة البيانات المحلية للتطبيق، وفقاً للسلوك التقني للتطبيق وأي نسخ احتياطية قابلة للتطبيق. إذا كنت قد قدمت معلومات شخصية إلى المطور لأغراض الترخيص أو الشراء أو الدعم ورغبت في طلب حذفها، فيمكنك التواصل عبر:',
        after: 'البريد الإلكتروني: devjalalamanj@gmail.com. قد تكون هناك حاجة للاحتفاظ ببعض المعلومات حيثما يقتضي ذلك لأغراض قانونية أو محاسبية أو معاملات أو ترخيص أو أغراض تجارية مشروعة.',
      },
      {
        heading: '16. مسؤولية المستخدم',
        body: 'صُمم إدارة للاستخدام من قبل المدارس والإدارات التعليمية. المنظمات التي تستخدم إدارة مسؤولة عن:',
        bullets: [
          'تحديد المعلومات التي تدخلها إلى التطبيق.',
          'ضمان امتلاكها للصلاحية المناسبة لمعالجة معلومات الطلاب والموظفين والمدرسة.',
          'حماية الوصول إلى أجهزة الحاسوب المثبت عليها إدارة.',
          'إدارة وصول المستخدمين داخل مؤسستها.',
          'الحفاظ على نسخ احتياطية مناسبة.',
          'الامتثال للقوانين واللوائح المعمول بها التي تحكم المعلومات التعليمية والشخصية.',
        ],
        after: 'يوفر إدارة وظائف برمجية لكنه لا يحدد الأساس القانوني لجمع المدرسة أو معالجتها للمعلومات عن طلابها أو موظفيها أو غيرهم من الأفراد.',
      },
      {
        heading: '17. معلومات الأطفال',
        body: 'إدارة مخصص للمدارس والإدارات التعليمية وليس للأطفال كمستهلكين مباشرين. لا يفرض التطبيق حداً تقنياً معيناً للحد الأدنى من العمر للاستخدام. قد تدخل المدارس والإدارات التعليمية معلومات تتعلق بالطلاب، بمن فيهم القُصّر، إلى التطبيق كجزء من الأنشطة التعليمية والإدارية المشروعة. المدرسة أو المنظمة التي تستخدم إدارة مسؤولة عن ضمان امتلاكها للصلاحية والأساس القانوني المناسبين لجمع هذه المعلومات ومعالجتها.',
      },
      {
        heading: '18. خدمات الجهات الخارجية',
        body: 'قد يتفاعل إدارة مع خدمات جهات خارجية عندما يستخدم المستخدمون وظائف ذات صلة طوعاً، بما في ذلك:',
        bullets: [
          'Google Drive — نسخ احتياطي سحابي اختياري.',
          'Microsoft OneDrive — نسخ احتياطي سحابي اختياري.',
          'إصدارات GitHub — توزيع/فحص تحديثات التطبيق.',
        ],
        after: 'تعمل خدمات الجهات الخارجية وفق سياسات الخصوصية والشروط الخاصة بها. لا يتحكم إدارة في كيفية معالجة هؤلاء المزودين المستقلين للمعلومات بمجرد نقلها إلى خدماتهم.',
      },
      {
        heading: '19. عمليات نقل البيانات الدولية',
        body: 'نظراً لأن إدارة تطبيق محلي في المقام الأول، فإن المطور لا ينقل قاعدة البيانات التشغيلية للمدرسة إلى خادم مركزي بشكل روتيني. ومع ذلك، إذا اختار المستخدم استخدام خدمات النسخ الاحتياطي السحابية التابعة لجهات خارجية، فقد تُنقل المعلومات وتُخزَّن بواسطة تلك الخدمات في مواقع يحددها المزود المعني. يجب على المستخدمين مراجعة ممارسات الخصوصية لمزود الخدمة السحابية المختار للحصول على معلومات حول عمليات النقل الدولي وتخزين البيانات.',
      },
      {
        heading: '20. التغييرات على سياسة الخصوصية هذه',
        body: 'قد نُحدِّث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات على إدارة أو وظائفه أو المتطلبات القانونية أو ممارسات البيانات لدينا. عند إجراء تغييرات جوهرية، سيُنشر السياسة المحدثة من خلال موارد موقع إدارة أو التطبيق المناسبة. يشير تاريخ آخر تحديث في بداية هذه السياسة إلى آخر مراجعة لها.',
      },
      {
        heading: '21. التواصل معنا',
        body: 'إذا كانت لديك أسئلة أو مخاوف أو طلبات بشأن سياسة الخصوصية هذه أو التعامل مع المعلومات المرتبطة بـ إدارة، فيرجى التواصل عبر:',
        after: 'جلال أمانج — كركوك، العراق — البريد الإلكتروني: devjalalamanj@gmail.com',
      },
    ],
    en: [
      {
        heading: '1. About Edara',
        body: 'Edara is a desktop application designed to assist schools and educational administrations with managing their administrative and educational records. Depending on the features used, Edara may allow authorized users to manage information relating to schools, students, staff, documents, ministry correspondence, templates, exports, backups, and other administrative records. The information entered into Edara is primarily stored locally on the computer where the application is installed.',
      },
      {
        heading: '2. Information You Provide to Edara',
        body: 'During registration and setup, Edara may request basic information such as:',
        bullets: [
          'Full name',
          'School name',
          'School type',
          'Email address, if provided',
          'Phone number',
          'Address',
          'Principal\'s name',
          'Academic year',
        ],
        after: 'This information is used to configure the application and establish the school\'s local profile. Information entered into the application may also include school-management information such as student records, staff records, documents, ministry documents, templates, exports, and other information entered by the school or its authorized users.',
      },
      {
        heading: '3. School and Educational Data',
        body: 'Edara may be used to store information relating to students, staff, schools, documents, and educational administration. This information is stored locally on the user\'s computer as part of the Edara application data. Jalal Amanj does not routinely receive or maintain a central copy of the school\'s operational database. Users and schools are responsible for ensuring that information entered into Edara is collected, used, and managed lawfully and appropriately within their own organization.',
      },
      {
        heading: '4. Local Storage',
        body: 'Edara uses a local SQLite database and local application directories to store application information. These records may include school profile information, student records, staff records, documents, ministry documents, templates, export records, application settings, backup-related information, and license and activation information. These records remain on the user\'s device unless the user deliberately exports, backs up, or otherwise transfers them.',
      },
      {
        heading: '5. Cloud Backups',
        body: 'Edara provides optional cloud-backup functionality through supported third-party cloud storage services, including Google Drive and Microsoft OneDrive. When a user chooses to use cloud backup, the backup is stored in the user\'s own personal Google Drive or Microsoft OneDrive account. Edara does not use the developer\'s personal cloud-storage account to store the user\'s school data. The developer does not routinely receive a copy of the user\'s backup content. Cloud backup is an optional feature. Users can choose whether to connect a supported cloud account and use the backup functionality. The privacy and security of cloud-stored backups are also subject to the policies and security practices of the applicable cloud provider.',
      },
      {
        heading: '6. Google Drive and Microsoft OneDrive',
        body: 'If you choose to connect Google Drive or Microsoft OneDrive to Edara, the application may request the permissions necessary to create, manage, or restore Edara backup data within your connected cloud account. These services are used for backup functionality and are not intended to provide the developer with access to your unrelated personal cloud files. Edara does not use your connected cloud account for advertising, profiling, or unrelated data collection. You may disconnect the relevant cloud account through the functionality provided by Edara or the applicable cloud provider.',
      },
      {
        heading: '7. Information Collected for Licensing and Sales',
        body: 'Edara is a paid application distributed through a license-based model. For licensing, sales, customer support, and transaction-related purposes, the developer may retain limited basic customer information, which may include:',
        bullets: [
          'Full name',
          'Phone number',
          'Address',
          'Workplace or school information',
          'Email address, if provided',
          'Information necessary to identify or manage the purchased license',
        ],
        after: 'This information is separate from the school\'s operational database stored locally in Edara. The developer does not need to receive or store the school\'s complete Edara database as part of the licensing process.',
      },
      {
        heading: '8. License Activation',
        body: 'Edara uses license keys to activate the application. Licenses may be associated with a specific device. A license is intended for use on the device for which it was activated, subject to the applicable license terms. Edara may process technical information necessary to validate and associate a license with an authorized device. This information is used for licensing and anti-abuse purposes and is not used for advertising or behavioral profiling.',
      },
      {
        heading: '9. Information We Do Not Collect for Advertising or Tracking',
        body: 'Edara does not use advertising networks or behavioral advertising. Based on the current implementation, Edara does not intentionally use advertising trackers, behavioral profiling, fingerprinting, analytics platforms, tracking pixels, marketing cookies, telemetry systems, or third-party advertising SDKs. Edara is designed to provide its core functionality without tracking users\' behavior for advertising purposes.',
      },
      {
        heading: '10. Application Updates',
        body: 'Edara may check for available application updates through its designated update source, including GitHub Releases. The update-check mechanism is used to determine whether a newer version of Edara is available. The current implementation does not intentionally send the developer the user\'s school database, documents, or other operational application data as part of an update check.',
      },
      {
        heading: '11. How We Use Information',
        body: 'Information handled by Edara may be used for:',
        bullets: [
          'Providing the application\'s school-management functionality',
          'Maintaining the local school profile',
          'Managing documents and records',
          'Creating and restoring backups when requested',
          'Managing software licenses and activation',
          'Processing purchases and customer support requests',
          'Providing technical support',
          'Delivering application updates',
          'Maintaining the security and proper operation of the application',
        ],
        after: 'We do not use school-management data stored locally in Edara for advertising or behavioral profiling.',
      },
      {
        heading: '12. Data Sharing',
        body: 'We do not sell users\' school-management data. We do not routinely share the contents of the local Edara database with third parties. When users voluntarily use third-party services such as Google Drive or Microsoft OneDrive for backups, information necessary to provide that functionality is transferred to the selected service and stored according to that provider\'s policies. Information provided to us for licensing, sales, or customer support may be processed when necessary to complete those activities.',
      },
      {
        heading: '13. Data Security',
        body: 'Edara uses local storage and application security mechanisms intended to protect application information. The Electron application uses controlled IPC communication and security restrictions for communication between the application interface and its underlying system functionality. However, no software or storage system can be guaranteed to be completely secure. Users are responsible for maintaining appropriate security for the computer on which Edara is installed, including operating-system security, user-account protection, and access to the physical device. Because Edara stores operational data locally, unauthorized access to the user\'s computer could potentially provide access to locally stored Edara information.',
      },
      {
        heading: '14. Data Retention',
        body: 'School-management information stored locally by Edara generally remains on the user\'s device until the user or school administrator deletes it, removes the application data, or otherwise manages the stored information. The developer does not routinely retain a central copy of this operational data. Information retained by the developer for licensing, sales, or customer-support purposes may be retained for as long as reasonably necessary for those purposes and for applicable legal, accounting, or business requirements.',
      },
      {
        heading: '15. Data Deletion',
        body: 'Because the primary Edara database is stored locally, users and schools generally control the deletion of their operational application data. Users may delete or remove local Edara data through the application\'s available functionality or by managing the application\'s local data, subject to the application\'s technical behavior and any applicable backup copies. If you have provided personal information to the developer for licensing, purchasing, or support purposes and wish to request its deletion, you may contact:',
        after: 'Email: devjalalamanj@gmail.com. Certain information may need to be retained where required for legal, accounting, transaction, licensing, or legitimate business purposes.',
      },
      {
        heading: '16. User Responsibility',
        body: 'Edara is designed for use by schools and educational administrations. Organizations using Edara are responsible for:',
        bullets: [
          'Determining what information they enter into the application',
          'Ensuring they have appropriate authority to process student, staff, and school information',
          'Protecting access to the computers on which Edara is installed',
          'Managing user access within their organization',
          'Maintaining appropriate backups',
          'Complying with applicable laws and regulations governing educational and personal information',
        ],
        after: 'Edara provides software functionality but does not determine the lawful basis for a school\'s collection or processing of information about its students, employees, or other individuals.',
      },
      {
        heading: '17. Children\'s Information',
        body: 'Edara is intended for schools and educational administrations rather than for children as direct consumer users. The application does not impose a specific technical minimum age for use. Schools and educational administrations may enter information relating to students, including minors, into the application as part of legitimate educational and administrative activities. The school or organization using Edara is responsible for ensuring that it has the appropriate authority and legal basis to collect and process such information.',
      },
      {
        heading: '18. Third-Party Services',
        body: 'Edara may interact with third-party services when users voluntarily use related functionality, including:',
        bullets: [
          'Google Drive — optional cloud backup',
          'Microsoft OneDrive — optional cloud backup',
          'GitHub Releases — application update distribution/checking',
        ],
        after: 'Third-party services operate under their own privacy policies and terms. Edara does not control how those independent providers process information once information is transferred to their services.',
      },
      {
        heading: '19. International Data Transfers',
        body: 'Because Edara is primarily a local application, the developer does not routinely transfer the school\'s operational database to a central server. However, if a user chooses to use third-party cloud backup services, information may be transferred to and stored by those services in locations determined by the applicable provider. Users should review the privacy practices of their selected cloud provider for information regarding international transfers and data storage.',
      },
      {
        heading: '20. Changes to This Privacy Policy',
        body: 'We may update this Privacy Policy from time to time to reflect changes to Edara, its functionality, legal requirements, or our data practices. When material changes are made, the updated policy will be published through the appropriate Edara website or application resources. The Last Updated date at the beginning of this policy indicates when the policy was most recently revised.',
      },
      {
        heading: '21. Contact Us',
        body: 'If you have questions, concerns, or requests regarding this Privacy Policy or the handling of information associated with Edara, please contact:',
        after: 'Jalal Amanj — Kirkuk, Iraq — Email: devjalalamanj@gmail.com',
      },
    ],
  },

  terms: {
    id: 'terms',
    titleAr: 'شروط استخدام إدارة',
    titleEn: 'Edara Terms of Service',
    meta: META,
    ar: [
      {
        heading: '1. قبول هذه الشروط',
        body: 'تحكم شروط الاستخدام هذه («الشروط») وصولك إلى Edara | إدارة - نظام إدارة المدارس («إدارة» أو «التطبيق» أو «نحن» أو «نا» أو «خاصتنا») واستخدامك له، وهو من تطوير جلال أمانج. بشرائك إدارة أو تثبيته أو تفعيله أو استخدامه، فإنك تقر بأنك قرأت هذه الشروط وفهمتها ووافقت عليها. إذا كنت لا توافق على هذه الشروط، فيجب ألا تستخدم إدارة.',
      },
      {
        heading: '2. الغرض من إدارة',
        body: 'إدارة تطبيق سطح مكتب لإدارة المدارس مخصص للمدارس والإدارات التعليمية. يوفر التطبيق أدوات لإدارة معلومات المدرسة والإدارة والمستندات والسجلات والتصديرات والنسخ الاحتياطية والقوالب والوظائف ذات الصلة التي تدعمها النسخة المثبتة من التطبيق. إدارة أداة برمجية؛ لا يحل محل المسؤوليات المهنية أو الإدارية أو القانونية أو التعليمية للمدرسة أو المنظمة التي تستخدمه.',
      },
      {
        heading: '3. الأهلية والاستخدام المصرح به',
        body: 'إدارة مخصص للاستخدام من قبل المدارس والمؤسسات التعليمية والموظفين التعليميين أو الإداريين المصرح لهم. لا يوجد حد أدنى تقني محدد للعمر مدمج في التطبيق. ومع ذلك، فإن المنظمة التي تستخدم إدارة مسؤولة عن تحديد من يُصرح له باستخدام التطبيق وعن ضمان أن استخدامه يتوافق مع القوانين واللوائح والسياسات المؤسسية المعمول بها. لا يجوز لك استخدام إدارة إلا لأغراض مشروعة وبطريقة متسقة مع هذه الشروط.',
      },
      {
        heading: '4. الترخيص والشراء',
        body: 'إدارة منتج برمجي مدفوع يُوزَّع وفق نموذج قائم على الترخيص. قد يُشترى الترخيص كشراء لمرة واحدة، وفقاً لنوع الترخيص والشروط السارية وقت الشراء. الترخيص المشترى لا ينقل ملكية برمجيات إدارة إلى المشتري؛ إنه يمنح المشتري الحق في استخدام البرنامج وفقاً لشروط الترخيص المعمول بها.',
      },
      {
        heading: '5. الترخيص المرتبط بالجهاز',
        body: 'تُصمم تراخيص إدارة لترتبط بجهاز واحد. ما لم يُصرح بذلك صراحةً من قبل المطور، لا يجوز استخدام الترخيص في وقت واحد على أجهزة متعددة. قد يستخدم تفعيل الترخيص معلومات تقنية ضرورية لربط الترخيص بالجهاز المصرح به. محاولات تجاوز آليات تفعيل الترخيص أو تكرارها أو التلاعب بها أو نقلها بشكل غير قانوني محظورة.',
      },
      {
        heading: '6. الاستخدام المسموح به',
        body: 'مع مراعاة هذه الشروط والترخيص المعمول به، يجوز لك:',
        bullets: [
          'تثبيت إدارة واستخدامه على الجهاز المصرح به.',
          'استخدام التطبيق لأغراض إدارة المدرسة والتعليم المشروعة.',
          'إدخال وإدارة المعلومات التي تملك الصلاحية المناسبة لها.',
          'إنشاء تصديرات ونسخ احتياطية محلية باستخدام الوظيفة التي يوفرها التطبيق.',
          'استخدام ميزات النسخ الاحتياطي السحابي المدعومة لحسابك الخاص عند توفرها.',
        ],
      },
      {
        heading: '7. الاستخدام المحظور',
        body: 'يجب ألا:',
        bullets: [
          'تنسخ أو تعيد توزيع أو تبيع أو تؤجر أو تستأجر أو تمنح تراخيص فرعية لـ إدارة إلا بإذن صريح.',
          'تتجاوز أو تعطل تفعيل الترخيص أو أي حماية تقنية أخرى.',
          'تقوم بالهندسة العكسية أو التفكيك أو فك الضغط أو محاولة استخلاص الكود المصدري لـ إدارة إلا بالقدر الذي تحظره القوانين المعمول بها.',
          'تعدل أو تنشئ نسخاً مشتقة من إدارة دون إذن.',
          'تستخدم إدارة لأغراض غير قانونية.',
          'تستخدم التطبيق للوصول إلى معلومات أو جمعها أو معالجتها دون إذن مناسب.',
          'تتداخل مع أمن التطبيق أو تشغيله أو سلامته.',
          'تحاول الوصول دون إذن إلى الأنظمة أو الخدمات أو البيانات المتصلة بـ إدارة.',
        ],
      },
      {
        heading: '8. مسؤوليات المستخدم والمدرسة',
        body: 'المدرسة أو المنظمة التي تستخدم إدارة مسؤولة عن المعلومات المدخلة في التطبيق. أنت مسؤول عن:',
        bullets: [
          'ضمان امتلاكك للصلاحية اللازمة لإدخال المعلومات ومعالجتها.',
          'حماية الوصول إلى الحاسوب وحسابات المستخدمين المثبت عليها إدارة.',
          'الحفاظ على نسخ احتياطية مناسبة.',
          'مراجعة المعلومات للتأكد من دقتها.',
          'الامتثال للقوانين واللوائح المعمول بها المتعلقة بمعلومات الطلاب والموظفين والتعليمية والشخصية.',
          'ضمان أن الموظفين المصرح لهم فقط هم من يستخدمون التطبيق.',
        ],
      },
      {
        heading: '9. بيانات المستخدم',
        body: 'صُمم إدارة بشكل أساسي لتخزين معلومات إدارة المدرسة محلياً على جهاز المستخدم. تبقى مسؤولية المعلومات التي تدخلها إلى التطبيق عليك. لا يدعي جلال أمانج ملكية السجلات التشغيلية للمدرسة لمجرد تخزينها باستخدام إدارة. يُوصف التعامل مع المعلومات الشخصية بمزيد من التفصيل في سياسة خصوصية إدارة.',
      },
      {
        heading: '10. خدمات النسخ الاحتياطي السحابي',
        body: 'قد يوفر إدارة وظيفة نسخ احتياطي اختيارية من خلال خدمات جهات خارجية مدعومة مثل Google Drive وMicrosoft OneDrive. عندما تستخدم هذه الميزات، تُخزَّن النسخ الاحتياطية في الحساب السحابي الذي تربطه بـ إدارة. يخضع استخدامك لتلك الخدمات التابعة لجهات خارجية أيضاً لشروط وسياسات المزود المعني. أنت مسؤول عن ضمان امتلاكك للحقوق والأذونات اللازمة لتخزين معلوماتك باستخدام الخدمة السحابية المختارة.',
      },
      {
        heading: '11. تحديثات البرنامج',
        body: 'قد يوفر إدارة تحديثات أو تحسينات أو إصلاحات للأخطاء أو تحديثات أمنية أو إصدارات جديدة. قد تُوزَّع التحديثات من خلال الآليات التي يستخدمها إدارة، بما في ذلك البنية التحتية المخصصة للإصدار/التحديث. قد يعدل المطور أو يحسن أو يوقف ميزات معينة بمرور الوقت. قد يكون التحديث ضرورياً للحفاظ على التوافق أو الأمن أو الوظيفة.',
      },
      {
        heading: '12. التوفر والتغييرات',
        body: 'نهدف إلى إبقاء إدارة عاملاً وموثوقاً، لكننا لا نضمن أن كل ميزة ستكون متاحة دائماً أو دون انقطاع أو خالية من الأخطاء. قد تتغير الميزات أو تُحسن أو تُستبدل أو تُعلق أو يُتوقف عنها. قد تصبح خدمات الجهات الخارجية المستخدمة في ميزات إدارة الاختيارية غير متاحة أو قد تتغير بشكل مستقل عن المطور.',
      },
      {
        heading: '13. النسخ الاحتياطية وفقدان البيانات',
        body: 'على الرغم من أن إدارة يوفر وظيفة النسخ الاحتياطي، يبقى المستخدمون والمنظمات مسؤولين عن الحفاظ على نسخ احتياطية مناسبة من المعلومات المهمة. المطور غير مسؤول عن فقدان البيانات الناتج عن أعطال الأجهزة أو أعطال نظام التشغيل أو الحذف العرضي أو البرامج الضارة أو الوصول غير المصرح به أو خطأ المستخدم أو فشل خدمات الجهات الخارجية أو أي ظروف أخرى خارجة عن السيطرة المعقولة للمطور. يجب على المستخدمين التحقق بشكل دوري من إمكانية استعادة النسخ الاحتياطية المهمة بنجاح.',
      },
      {
        heading: '14. دقة المعلومات',
        body: 'يوفر إدارة أدوات لإدارة المعلومات لكنه لا يتحقق بشكل مستقل من دقة المعلومات التي يدخلها المستخدمون أو اكتمالها أو قانونيتها أو ملاءمتها. تبقى المدرسة أو المنظمة مسؤولة عن مراجعة سجلاتها والحفاظ على دقتها.',
      },
      {
        heading: '15. الملكية الفكرية',
        body: 'إدارة، بما في ذلك برمجياته وواجهته وتصميمه وعلامته التجارية وكوده الأصلي وتوثيقه والمواد ذات الصلة، مملوك لجلال أمانج أو مرخص له ومحمي بموجب قوانين الملكية الفكرية المعمول بها. باستثناء الحقوق المحدودة الممنوحة صراحةً بموجب هذه الشروط أو ترخيص معمول به، لا تُنقل إليك أي حقوق ملكية. لا يجوز استخدام اسم إدارة وعلامته التجارية ومواده المرتبطة بطريقة توحي برعاية أو ملكية أو تأييد غير مصرح به.',
      },
      {
        heading: '16. برمجيات وخدمات الجهات الخارجية',
        body: 'قد يتضمن إدارة أو يتفاعل مع برمجيات أو مكتبات أو خدمات سحابية أو تقنيات أخرى تابعة لجهات خارجية. قد تخضع تلك المكونات لتراخيصها وشروطها الخاصة. لا تمنح أي بند في هذه الشروط حقوقاً في خدمات الجهات الخارجية تتجاوز الحقوق التي يوفرها مزودوها المعنيون.',
      },
      {
        heading: '17. الدعم',
        body: 'قد يُقدم الدعم الفني من خلال قنوات التواصل التي يحددها المطور. قد يختلف توفر الدعم وأوقات الاستجابة ونطاقه. تقديم الدعم لا يضمن تنفيذ كل ميزة أو مشكلة أو تخصيص مطلوب.',
      },
      {
        heading: '18. الخصوصية',
        body: 'يخضع استخدامك لـ إدارة أيضاً لسياسة خصوصية إدارة، التي توضح كيفية التعامل مع المعلومات. تشكل سياسة الخصوصية جزءاً مهماً من هذه الشروط ويجب قراءتها معها.',
      },
      {
        heading: '19. الإنهاء وإلغاء الترخيص',
        body: 'قد يُنهى حقك في استخدام إدارة إذا انتهكت هذه الشروط أو شروط الترخيص المعمول بها بشكل جوهري. عند الاقتضاء، قد يقوم المطور بإلغاء تنشيط أو إلغاء الترخيص الذي تم الحصول عليه بطريقة احتيالية أو غير قانونية أو عبر نسخ غير مصرح به أو تجاوز متعمد لنظام الترخيص. لا يؤثر الإنهاء على الحقوق أو الالتزامات التي يجب بطبيعتها أن تستمر بعد الإنهاء.',
      },
      {
        heading: '20. إخلاء المسؤولية عن الضمانات',
        body: 'إلى أقصى حد يسمح به القانون المعمول به، يُقدم إدارة «كما هو» و«كما يتوفر». لا نضمن أن التطبيق سيكون خالياً تماماً من الأخطاء أو دون انقطاع أو متوافقاً مع كل تكوينات أجهزة الحاسوب أو مناسباً لكل غرض معين. أنت مسؤول عن تحديد ما إذا كان إدارة مناسباً لمتطلبات مدرستك أو مؤسستك.',
      },
      {
        heading: '21. حدود المسؤولية',
        body: 'إلى أقصى حد يسمح به القانون المعمول به، لن يكون جلال أمانج مسؤولاً عن الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية أو الجزائية، أو عن فقدان البيانات أو الإيرادات أو الأرباح أو فرص الأعمال أو غيرها من الخسائر الناشئة عن استخدام إدارة أو عدم القدرة على استخدامه أو المتعلقة بذلك. لا يستبعد أي بند في هذه الشروط أو يحد من مسؤولية لا يجوز قانوناً استبعادها أو الحد منها بموجب القانون المعمول به.',
      },
      {
        heading: '22. التعويض',
        body: 'إلى الحد الذي يسمح به القانون المعمول به، توافق على تحمل المسؤولية عن المطالبات أو الخسائر الناشئة عن استخدامك غير القانوني لـ إدارة أو انتهاكك لهذه الشروط أو معالجتك للمعلومات دون التفويض اللازم.',
      },
      {
        heading: '23. التغييرات على هذه الشروط',
        body: 'قد نُحدِّث هذه الشروط من وقت لآخر لتعكس التغييرات على إدارة أو نموذج ترخيصه أو وظائفه أو المتطلبات القانونية المعمول بها. سيُنشر الشروط المحدثة من خلال موارد موقع إدارة أو التطبيق المناسبة. يشير تاريخ «آخر تحديث» إلى أحدث مراجعة.',
      },
      {
        heading: '24. القانون الحاكم والاختصاص القضائي',
        body: 'من المقصود أن تحكم هذه الشروط القوانين المعمول بها في جمهورية العراق، مع مراعاة أي حمايات أو متطلبات قانونية ملزمة قد تنطبق على المستخدم أو المعاملة. أي نزاع ينشأ عن هذه الشروط أو استخدام إدارة يخضع لاختصاص المحاكم المختصة في العراق، ما لم يقتض القانون المعمول به خلاف ذلك.',
      },
      {
        heading: '25. التواصل',
        body: 'للاستفسارات حول هذه الشروط أو الترخيص أو المشتريات أو استخدام إدارة، تواصل مع:',
        after: 'جلال أمانج — كركوك، العراق — البريد الإلكتروني: devjalalamanj@gmail.com',
      },
    ],
    en: [
      {
        heading: '1. Acceptance of These Terms',
        body: 'These Terms of Use ("Terms") govern your access to and use of Edara | إدارة - نظام إدارة المدارس ("Edara," "the Application," "we," "us," or "our"), developed by Jalal Amanj. By purchasing, installing, activating, or using Edara, you acknowledge that you have read, understood, and agreed to these Terms. If you do not agree with these Terms, you should not use Edara.',
      },
      {
        heading: '2. Purpose of Edara',
        body: 'Edara is a desktop school-management application intended for schools and educational administrations. The Application provides tools for managing school and administrative information, documents, records, exports, backups, templates, and related functions supported by the installed version of the Application. Edara is a software tool. It does not replace the professional, administrative, legal, or educational responsibilities of the school or organization using it.',
      },
      {
        heading: '3. Eligibility and Authorized Use',
        body: 'Edara is intended for use by schools, educational institutions, and authorized educational or administrative personnel. There is no specific technical minimum age built into the Application. However, the organization using Edara is responsible for determining who is authorized to use the Application and for ensuring that its use complies with applicable laws, regulations, and institutional policies. You may use Edara only for lawful purposes and only in a manner consistent with these Terms.',
      },
      {
        heading: '4. License and Purchase',
        body: 'Edara is a paid software product distributed through a license-based model. A license may be purchased as a one-time purchase, subject to the license type and terms applicable at the time of purchase. A purchased license does not transfer ownership of the Edara software to the purchaser. It grants the purchaser the right to use the software according to the applicable license terms.',
      },
      {
        heading: '5. Device-Bound License',
        body: 'Edara licenses are intended to be associated with a single device. Unless otherwise expressly authorized by the developer, a license may not be simultaneously used on multiple devices. License activation may use technical information necessary to associate the license with the authorized device. Attempts to bypass, duplicate, manipulate, or unlawfully transfer license activation mechanisms are prohibited.',
      },
      {
        heading: '6. Permitted Use',
        body: 'Subject to these Terms and the applicable license, you may:',
        bullets: [
          'Install and use Edara on the authorized device.',
          'Use the Application for legitimate school and educational administration purposes.',
          'Enter and manage information for which you have appropriate authority.',
          'Create local exports and backups using the functionality provided by the Application.',
          'Use supported cloud backup features for your own account where available.',
        ],
      },
      {
        heading: '7. Prohibited Use',
        body: 'You must not:',
        bullets: [
          'Copy, redistribute, resell, lease, rent, or sublicense Edara except where expressly authorized.',
          'Circumvent or disable license activation or other technical protections.',
          'Reverse engineer, decompile, disassemble, or attempt to derive the source code of Edara except to the extent such restriction is prohibited by applicable law.',
          'Modify or create derivative versions of Edara without authorization.',
          'Use Edara for unlawful purposes.',
          'Use the Application to access, collect, or process information without appropriate authorization.',
          'Interfere with the security, operation, or integrity of the Application.',
          'Attempt to gain unauthorized access to systems, services, or data connected to Edara.',
        ],
      },
      {
        heading: '8. User and School Responsibilities',
        body: 'The school or organization using Edara is responsible for the information entered into the Application. You are responsible for:',
        bullets: [
          'Ensuring that you have the necessary authority to enter and process information.',
          'Protecting access to the computer and user accounts where Edara is installed.',
          'Maintaining appropriate backups.',
          'Reviewing information for accuracy.',
          'Complying with applicable laws and regulations concerning student, staff, educational, and personal information.',
          'Ensuring that only authorized personnel use the Application.',
        ],
      },
      {
        heading: '9. User Data',
        body: 'Edara is primarily designed to store school-management information locally on the user\'s device. You retain responsibility for the information you enter into the Application. Jalal Amanj does not claim ownership of the school\'s operational records merely because they are stored using Edara. The handling of personal information is further described in the Edara Privacy Policy.',
      },
      {
        heading: '10. Cloud Backup Services',
        body: 'Edara may provide optional backup functionality through supported third-party services such as Google Drive and Microsoft OneDrive. When you use these features, backups are stored in the cloud account you connect to Edara. Your use of those third-party services is also subject to the applicable provider\'s terms and policies. You are responsible for ensuring that you have the necessary rights and permissions to store your information using the selected cloud service.',
      },
      {
        heading: '11. Software Updates',
        body: 'Edara may provide updates, improvements, bug fixes, security updates, or new versions. Updates may be distributed through the mechanisms used by Edara, including its designated release/update infrastructure. The developer may modify, improve, or discontinue particular features over time. An update may be necessary to maintain compatibility, security, or functionality.',
      },
      {
        heading: '12. Availability and Changes',
        body: 'We aim to keep Edara functional and reliable, but we do not guarantee that every feature will always be available, uninterrupted, or error-free. Features may change, be improved, replaced, suspended, or discontinued. Third-party services used by optional Edara features may also become unavailable or change independently of the developer.',
      },
      {
        heading: '13. Backups and Data Loss',
        body: 'Although Edara provides backup functionality, users and organizations remain responsible for maintaining appropriate backups of important information. The developer is not responsible for data loss resulting from hardware failure, operating-system failure, accidental deletion, malware, unauthorized access, user error, failed third-party services, or other circumstances outside the developer\'s reasonable control. Users should periodically verify that important backups can be successfully restored.',
      },
      {
        heading: '14. Accuracy of Information',
        body: 'Edara provides tools for managing information but does not independently verify the accuracy, completeness, legality, or appropriateness of information entered by users. The school or organization remains responsible for reviewing and maintaining the accuracy of its records.',
      },
      {
        heading: '15. Intellectual Property',
        body: 'Edara, including its software, interface, design, branding, original code, documentation, and related materials, is owned by or licensed to Jalal Amanj and is protected by applicable intellectual-property laws. Except for the limited rights expressly granted under these Terms or an applicable license, no ownership rights are transferred to you. The Edara name, branding, and associated materials may not be used in a way that implies unauthorized sponsorship, ownership, or endorsement.',
      },
      {
        heading: '16. Third-Party Software and Services',
        body: 'Edara may include or interact with third-party software, libraries, cloud services, and other technologies. Those components may be subject to their own licenses and terms. Nothing in these Terms grants rights to third-party services beyond the rights provided by their respective providers.',
      },
      {
        heading: '17. Support',
        body: 'Technical support may be provided through the contact channels designated by the developer. Support availability, response times, and scope may vary. Providing support does not guarantee that every requested feature, issue, or customization will be implemented.',
      },
      {
        heading: '18. Privacy',
        body: 'Your use of Edara is also governed by the Edara Privacy Policy, which explains how information is handled. The Privacy Policy forms an important part of these Terms and should be read together with them.',
      },
      {
        heading: '19. Termination and License Revocation',
        body: 'Your right to use Edara may terminate if you materially violate these Terms or the applicable license conditions. Where appropriate, the developer may deactivate or revoke a license that was obtained fraudulently, unlawfully, through unauthorized duplication, or through deliberate circumvention of the licensing system. Termination does not affect rights or obligations that by their nature should continue after termination.',
      },
      {
        heading: '20. Disclaimer of Warranties',
        body: 'To the maximum extent permitted by applicable law, Edara is provided on an "as is" and "as available" basis. We do not guarantee that the Application will be completely error-free, uninterrupted, compatible with every computer configuration, or suitable for every particular purpose. You are responsible for determining whether Edara is appropriate for your school\'s or organization\'s requirements.',
      },
      {
        heading: '21. Limitation of Liability',
        body: 'To the maximum extent permitted by applicable law, Jalal Amanj shall not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, revenue, profits, business opportunities, or other losses arising from or related to the use or inability to use Edara. Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under applicable law.',
      },
      {
        heading: '22. Indemnification',
        body: 'To the extent permitted by applicable law, you agree to be responsible for claims or losses arising from your unlawful use of Edara, your violation of these Terms, or your processing of information without the necessary authorization.',
      },
      {
        heading: '23. Changes to These Terms',
        body: 'We may update these Terms from time to time to reflect changes to Edara, its licensing model, functionality, or applicable legal requirements. The updated Terms will be published through the appropriate Edara website or application resources. The "Last Updated" date indicates the most recent revision.',
      },
      {
        heading: '24. Governing Law and Jurisdiction',
        body: 'These Terms are intended to be governed by the applicable laws of the Republic of Iraq, subject to any mandatory legal protections or requirements that may apply to the user or transaction. Any dispute arising from these Terms or the use of Edara shall be subject to the jurisdiction of the competent courts in Iraq, unless applicable law requires otherwise.',
      },
      {
        heading: '25. Contact',
        body: 'For questions regarding these Terms, licensing, purchases, or use of Edara, contact:',
        after: 'Jalal Amanj — Kirkuk, Iraq — Email: devjalalamanj@gmail.com',
      },
    ],
  },

  eula: {
    id: 'eula',
    titleAr: 'اتفاقية ترخيص المستخدم النهائي لإدارة',
    titleEn: 'Edara End User License Agreement (EULA)',
    meta: META,
    ar: [
      {
        heading: '1. الاتفاقية والقبول',
        body: 'اتفاقية ترخيص المستخدم النهائي هذه («EULA») هي اتفاقية قانونية بينك («أنت» أو «المرخص له») وبين جلال أمانج («المرخِّص») تحكم استخدامك لـ Edara | إدارة - نظام إدارة المدارس («إدارة» أو «البرنامج» أو «التطبيق»). بشرائك إدارة أو تثبيته أو تفعيله أو استخدامه، فإنك توافق على الالتزام بهذه الاتفاقية. إذا كنت لا توافق على هذه الشروط، فلا تثبت البرنامج أو تفعله أو تستخدمه.',
      },
      {
        heading: '2. ترخيص البرنامج',
        body: 'مع مراعاة هذه الاتفاقية وشروط الشراء المعمول بها، يمنحك جلال أمانج ترخيصاً محدوداً وغير حصري وغير قابل للنقل لتثبيت إدارة واستخدامه على جهاز مصرح به واحد. يمنح هذا الترخيص حق استخدام البرنامج؛ ولا ينقل ملكية البرنامج أو أي حقوق ملكية فكرية إليك.',
      },
      {
        heading: '3. الترخيص أحادي الجهاز',
        body: 'تُصمم تراخيص إدارة لترتبط بجهاز واحد. ما لم يُصرح بذلك صراحةً من قبل المرخِّص، لا يجوز استخدام الترخيص نفسه في وقت واحد على أجهزة متعددة. قد يستخدم البرنامج معلومات تقنية ضرورية لربط الترخيص بالجهاز المصرح به والتحقق من صحة الترخيص.',
      },
      {
        heading: '4. مدة الترخيص والشراء',
        body: 'يُوزَّع إدارة كبرنامج مدفوع وفق نموذج قائم على الترخيص. قد تُشترى التراخيص من خلال شراء لمرة واحدة، وفقاً لشروط الترخيص السارية وقت الشراء. حين يُوصف الترخيص بأنه ترخيص مدى الحياة، فهذا يعني الحق المشترى في استخدام الإصدار أو المنتج المعمول به مع مراعاة هذه الاتفاقية وشروط الشراء، ولا يضمن بالضرورة إصدارات أو ميزات أو خدمات أو تكاملات مستقبلية غير محدودة مع جهات خارجية.',
      },
      {
        heading: '5. الاستخدام المسموح به',
        body: 'يجوز لك:',
        bullets: [
          'تثبيت إدارة واستخدامه على الجهاز المصرح به.',
          'استخدام إدارة لأغراض إدارة المدرسة والتعليم المشروعة.',
          'تخزين وإدارة معلومات مؤسستك باستخدام البرنامج.',
          'إنشاء واستعادة النسخ الاحتياطية باستخدام الوظائف المدعومة.',
          'استخدام خدمات النسخ الاحتياطي السحابية الاختيارية المدعومة من خلال حسابات مخول باستخدامها.',
        ],
      },
      {
        heading: '6. القيود',
        body: 'إلا بالقدر الذي يسمح به القانون المعمول به صراحةً، لا يجوز لك:',
        bullets: [
          'نسخ البرنامج أو إعادة إنتاجه أو إعادة توزيعه أو بيعه أو تأجيره أو استئجاره أو منح تراخيص فرعية له أو نقله إلا بإذن صريح من المرخِّص.',
          'تقديم مفتاح الترخيص الخاص بك لشخص آخر لاستخدام غير مصرح به.',
          'تجاوز أو تعطيل أو تعديل أو التحايل على تفعيل الترخيص أو آليات الحماية التقنية.',
          'القيام بالهندسة العكسية أو التفكيك أو فك الضغط أو محاولة استخلاص الكود المصدري للبرنامج، إلا بالقدر الذي تحظره القوانين المعمول بها.',
          'تعديل أو إنشاء أعمال مشتقة مبنية على البرنامج دون إذن.',
          'إزالة إشعارات حقوق النشر أو العلامات التجارية أو الترخيص أو الإشعارات الملكية.',
          'استخدام البرنامج لتسهيل أنشطة غير قانونية.',
          'محاولة الوصول دون إذن إلى أنظمة إدارة أو أي خدمة تابعة لجهة خارجية متصلة.',
        ],
      },
      {
        heading: '7. الملكية والملكية الفكرية',
        body: 'البرنامج، بما في ذلك كوده المصدري وكوده المُجمَّع وواجهته وتصميمه ورسوماته وعلامته التجارية وتوثيقه والمواد الأصلية الأخرى، مملوك لجلال أمانج أو مرخص له ومحمي بموجب قوانين الملكية الفكرية المعمول بها. لا تنقل هذه الاتفاقية ملكية إدارة أو ملكيته الفكرية إلى المرخص له. جميع الحقوق غير الممنوحة صراحةً بموجب هذه الاتفاقية محفوظة للمرخِّص.',
      },
      {
        heading: '8. بياناتك',
        body: 'تبقى مسؤولية البيانات والمحتوى الذي تدخله إلى إدارة عليك. صُمم إدارة بشكل أساسي لتخزين معلومات إدارة المدرسة محلياً على جهاز المرخص له. لا يكتسب المرخِّص ملكية سجلات مدرستك أو معلومات الطلاب أو سجلات الموظفين أو المستندات أو غيرها من المحتويات التشغيلية لمجرد استخدامك إدارة. يجب أن يتوافق تعاملك مع هذه المعلومات مع القوانين المعمول بها وسياسات مؤسستك.',
      },
      {
        heading: '9. خدمات النسخ الاحتياطي السحابي',
        body: 'قد يوفر إدارة تكاملاً اختيارياً مع Google Drive وMicrosoft OneDrive لأغراض النسخ الاحتياطي. إذا قمت بتمكين هذه الوظيفة، تُخزَّن النسخة الاحتياطية المعمول بها في الحساب السحابي الذي تربطه بالبرنامج. يخضع استخدامك لـ Google Drive أو Microsoft OneDrive أو أي خدمة أخرى تابعة لجهة خارجية لشروط وسياسات ذلك المزود. المرخِّص غير مسؤول عن التشغيل المستقل لخدمات الجهات الخارجية أو توفرها أو أمنها أو سياساتها.',
      },
      {
        heading: '10. التحديثات والإصدارات الجديدة',
        body: 'قد يصدر المرخِّص تحديثات أو تصحيحات أو إصلاحات للأخطاء أو تحسينات أمنية أو إصدارات جديدة من إدارة. قد تعدل التحديثات الوظيفة أو تضيفها أو تستبدلها أو تزيلها. ما لم يُنص صراحةً على خلاف ذلك، تنطبق هذه الاتفاقية على التحديثات والنسخ المعدلة من البرنامج المقدمة بموجب علاقة الترخيص نفسها، مع مراعاة أي شروط إضافية مرفقة بإصدار معين.',
      },
      {
        heading: '11. مكونات الجهات الخارجية',
        body: 'قد يحتوي إدارة أو يعتمد على مكونات وخدمات برمجية تابعة لجهات خارجية. قد تُوزَّع تلك المكونات بموجب تراخيص مفتوحة المصدر أو تراخيص جهات خارجية منفصلة؛ وحيثما ينطبق ذلك، تحكم تلك التراخيص المكون المعني بالإضافة إلى هذه الاتفاقية. لا تحد هذه الاتفاقية من الحقوق الممنوحة لك بموجب تراخيص المصدر المفتوح المعمول بها.',
      },
      {
        heading: '12. الخصوصية',
        body: 'يُوصف تعامل البرنامج مع المعلومات في سياسة خصوصية إدارة. توضح سياسة الخصوصية الفرق بين المعلومات المخزنة محلياً بواسطة البرنامج، والنسخ الاحتياطية السحابية الاختيارية المخزنة في الحساب السحابي للمستخدم، والمعلومات المحدودة التي قد يحتفظ بها المرخِّص لأغراض الترخيص والمبيعات والدعم.',
      },
      {
        heading: '13. تفعيل الترخيص والتحقق منه',
        body: 'قد يتطلب إدارة تفعيل الترخيص أو التحقق منه قبل الاستخدام أو أثناءه. قد يستخدم البرنامج معلومات تقنية ضرورية للتحقق من صحة الترخيص وربطه بالجهاز المصرح به. يجب ألا تحاول تجاوز آلية التفعيل أو التلاعب بها. الترخيص الذي تم الحصول عليه من خلال الاحتيال أو النسخ غير المصرح به أو التجاوز المتعمد قد يُلغى أو يُسحب.',
      },
      {
        heading: '14. الدعم',
        body: 'قد يقدم المرخِّص دعماً فنياً لإدارة من خلال قنوات التواصل المحددة. لا يُضمن توفر الدعم وأوقات الاستجابة ما لم يُنص صراحةً على ذلك في اتفاقية شراء أو دعم منفصلة. قد يطلب المرخِّص معلومات ضرورية بشكل معقول لتشخيص المشكلات التقنية. يجب على المستخدمين تجنب إرسال سجلات مدرسية حساسة ما لم يُطلب ذلك تحديداً وكان مناسباً للدعم.',
      },
      {
        heading: '15. النسخ الاحتياطي للبيانات واستعادتها',
        body: 'المرخص له مسؤول عن الحفاظ على نسخ احتياطية مناسبة من المعلومات المهمة. على الرغم من أن إدارة قد يوفر وظيفة نسخ احتياطي محلية واختيارية سحابية، فإن المرخِّص لا يضمن نجاح كل نسخة احتياطية أو إمكانية استعادتها في كل ظرف. يجب على المرخص له التحقق بشكل دوري من النسخ الاحتياطية المهمة والحفاظ على نسخ مناسبة من السجلات الحرجة.',
      },
      {
        heading: '16. إخلاء المسؤولية عن الضمانات',
        body: 'إلى أقصى حد يسمح به القانون المعمول به، يُقدم إدارة «كما هو» و«كما يتوفر»، دون ضمانات تتجاوز تلك التي لا يمكن استبعادها قانوناً. لا يضمن المرخِّص أن البرنامج سيكون دون انقطاع تماماً أو خالياً من الأخطاء أو متوافقاً مع كل تكوينات الأجهزة أو البرامج أو مناسباً لكل غرض معين. لا يستبعد أي بند في هذه الاتفاقية أي ضمان أو حق من حقوق حماية المستهلك لا يمكن استبعاده قانوناً.',
      },
      {
        heading: '17. حدود المسؤولية',
        body: 'إلى أقصى حد يسمح به القانون المعمول به، لن يكون جلال أمانج مسؤولاً عن الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية أو النموذجية أو الجزائية الناشئة عن استخدام إدارة أو المتعلقة به، بما في ذلك فقدان البيانات أو الإيرادات أو الأرباح أو فرص الأعمال أو غيرها من الخسائر الاقتصادية. يبقى المرخص له مسؤولاً عن الحفاظ على نسخ احتياطية مناسبة وحماية الجهاز المثبت عليه إدارة. لا يستبعد أي بند في هذه الاتفاقية أو يحد من مسؤولية لا يمكن استبعادها أو الحد منها قانوناً.',
      },
      {
        heading: '18. الإنهاء',
        body: 'قد تنتهي هذه الاتفاقية والترخيص الممنوح بموجبها إذا أخللت بهذه الاتفاقية أو بشروط الترخيص المعمول بها بشكل جوهري. عند الإنهاء، يجب عليك التوقف عن استخدام البرنامج، وعند الاقتضاء، إزالته من الأجهزة غير المصرح بها. لا يؤثر الإنهاء على الأحكام التي يُقصد بطبيعتها أن تستمر بعد الإنهاء، بما في ذلك الأحكام المتعلقة بالملكية الفكرية وإخلاء المسؤولية وحدود المسؤولية والحقوق القانونية المعمول بها.',
      },
      {
        heading: '19. التنازل والنقل',
        body: 'الترخيص مخصص للمشتري والجهاز المصرح به ولا يجوز نقله أو إعادة بيعه أو منح تراخيص فرعية له أو التنازل عنه لشخص أو جهاز آخر دون إذن المرخِّص، إلا حيثما ينص القانون المعمول به على خلاف ذلك.',
      },
      {
        heading: '20. القانون الحاكم',
        body: 'من المقصود أن تحكم هذه الاتفاقية القوانين المعمول بها في جمهورية العراق، مع مراعاة أي حمايات أو متطلبات قانونية ملزمة تنطبق على المرخص له. تخضع النزاعات الناشئة عن هذه الاتفاقية أو استخدام إدارة لاختصاص المحاكم المختصة في العراق، ما لم يقتض القانون المعمول به خلاف ذلك.',
      },
      {
        heading: '21. الاتفاقية الكاملة',
        body: 'تشكل هذه الاتفاقية، إلى جانب شروط الشراء المعمول بها وسياسة خصوصية إدارة، الاتفاقية الرئيسية التي تحكم الاستخدام المرخص لـ إدارة. إذا تعارضت اتفاقية مكتوبة محددة موقعة صراحةً من قبل المرخِّص مع هذه الاتفاقية، فستسود الاتفاقية المكتوبة المحددة في حدود التعارض.',
      },
      {
        heading: '22. التغييرات على هذه الاتفاقية',
        body: 'قد يحدث المرخِّص هذه الاتفاقية عند الحاجة المعقولة لتعكس التغييرات على البرنامج أو نموذج الترخيص أو المتطلبات القانونية أو الممارسات التجارية. سيتوفر أحدث إصدار من خلال موارد موقع إدارة أو التطبيق المناسبة. يشير تاريخ «آخر تحديث» إلى أحدث مراجعة.',
      },
      {
        heading: '23. معلومات التواصل',
        body: 'للاستفسارات المتعلقة بالترخيص أو هذه الاتفاقية أو الشراء أو الدعم، تواصل مع:',
        after: 'جلال أمانج — كركوك، العراق — البريد الإلكتروني: devjalalamanj@gmail.com',
      },
    ],
    en: [
      {
        heading: '1. Agreement and Acceptance',
        body: 'This End User License Agreement ("EULA") is a legal agreement between you ("you," "your," or "Licensee") and Jalal Amanj ("Licensor") governing your use of Edara | إدارة - نظام إدارة المدارس ("Edara," "the Software," or "the Application"). By purchasing, installing, activating, or using Edara, you agree to be bound by this EULA. If you do not agree to these terms, do not install, activate, or use the Software.',
      },
      {
        heading: '2. Software License',
        body: 'Subject to this EULA and the applicable purchase terms, Jalal Amanj grants you a limited, non-exclusive, non-transferable license to install and use Edara on one authorized device. This license grants a right to use the Software; it does not transfer ownership of the Software or any intellectual-property rights to you.',
      },
      {
        heading: '3. Single-Device License',
        body: 'Edara licenses are designed to be associated with a single device. Unless expressly authorized by the Licensor, the same license may not be used simultaneously on multiple devices. The Software may use technical information necessary to associate a license with the authorized device and to verify the validity of the license.',
      },
      {
        heading: '4. License Term and Purchase',
        body: 'Edara is distributed as paid software under a license-based model. Licenses may be purchased through a one-time purchase, according to the license terms applicable at the time of purchase. Where a license is described as a lifetime license, this means the purchased right to use the applicable version or product subject to this EULA and the terms of the purchase, and does not necessarily guarantee unlimited future versions, features, services, or third-party integrations.',
      },
      {
        heading: '5. Permitted Use',
        body: 'You may:',
        bullets: [
          'Install and use Edara on the authorized device.',
          'Use Edara for legitimate school and educational administration purposes.',
          'Store and manage your organization\'s information using the Software.',
          'Create and restore backups using supported functionality.',
          'Use optional supported cloud-backup services through accounts you are authorized to use.',
        ],
      },
      {
        heading: '6. Restrictions',
        body: 'Except where applicable law expressly permits otherwise, you may not:',
        bullets: [
          'Copy, reproduce, redistribute, sell, rent, lease, sublicense, or transfer the Software except as expressly permitted by the Licensor.',
          'Provide your license key to another person for unauthorized use.',
          'Circumvent, disable, modify, or bypass license activation or technical protection mechanisms.',
          'Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Software, except to the extent such restriction is prohibited by applicable law.',
          'Modify or create derivative works based on the Software without authorization.',
          'Remove copyright, trademark, licensing, or proprietary notices.',
          'Use the Software to facilitate unlawful activity.',
          'Attempt to gain unauthorized access to Edara\'s systems or any connected third-party service.',
        ],
      },
      {
        heading: '7. Ownership and Intellectual Property',
        body: 'The Software, including its source code, compiled code, interface, design, graphics, branding, documentation, and other original materials, is owned by or licensed to Jalal Amanj and is protected by applicable intellectual-property laws. This EULA does not transfer ownership of Edara or its intellectual property to the Licensee. All rights not expressly granted under this EULA are reserved by the Licensor.',
      },
      {
        heading: '8. Your Data',
        body: 'You retain responsibility for the data and content that you enter into Edara. Edara is primarily designed to store school-management information locally on the Licensee\'s device. The Licensor does not acquire ownership of your school records, student information, staff records, documents, or other operational content merely because you use Edara. Your handling of such information must comply with applicable laws and your organization\'s policies.',
      },
      {
        heading: '9. Cloud Backup Services',
        body: 'Edara may provide optional integration with Google Drive and Microsoft OneDrive for backup purposes. If you enable such functionality, the applicable backup is stored in the cloud account you connect to the Software. Your use of Google Drive, Microsoft OneDrive, or any other third-party service is subject to that provider\'s own terms and policies. The Licensor is not responsible for the independent operation, availability, security, or policies of third-party services.',
      },
      {
        heading: '10. Updates and New Versions',
        body: 'The Licensor may release updates, patches, bug fixes, security improvements, or new versions of Edara. Updates may modify, add, replace, or remove functionality. Unless expressly stated otherwise, this EULA applies to updates and modified versions of the Software that are provided under the same license relationship, subject to any additional terms supplied with a particular release.',
      },
      {
        heading: '11. Third-Party Components',
        body: 'Edara may contain or depend upon third-party software components and services. Those components may be distributed under separate open-source or third-party licenses. Where applicable, those licenses govern the relevant component in addition to this EULA. This EULA does not limit rights granted to you under applicable open-source licenses.',
      },
      {
        heading: '12. Privacy',
        body: 'The Software\'s handling of information is described in the Edara Privacy Policy. The Privacy Policy explains the distinction between information stored locally by the Software, optional cloud backups stored in the user\'s own cloud account, and limited information that may be retained by the Licensor for licensing, sales, and support purposes.',
      },
      {
        heading: '13. License Activation and Verification',
        body: 'Edara may require license activation or verification before or during use. The Software may use technical information necessary to validate a license and associate it with the authorized device. You must not attempt to bypass or manipulate the activation mechanism. A license obtained through fraud, unauthorized duplication, or deliberate circumvention may be invalidated or revoked.',
      },
      {
        heading: '14. Support',
        body: 'The Licensor may provide technical support for Edara through designated contact channels. Support availability and response times are not guaranteed unless expressly stated in a separate purchase or support agreement. The Licensor may request information reasonably necessary to diagnose technical issues. Users should avoid sending sensitive school records unless specifically required and appropriate for support.',
      },
      {
        heading: '15. Data Backup and Recovery',
        body: 'The Licensee is responsible for maintaining appropriate backups of important information. Although Edara may provide local and optional cloud backup functionality, the Licensor does not guarantee that every backup will succeed or that every backup can be restored in every circumstance. The Licensee should periodically verify important backups and maintain appropriate copies of critical records.',
      },
      {
        heading: '16. Disclaimer of Warranties',
        body: 'To the maximum extent permitted by applicable law, Edara is provided "as is" and "as available," without warranties beyond those that cannot legally be excluded. The Licensor does not warrant that the Software will be completely uninterrupted, error-free, compatible with every hardware or software configuration, or suitable for every particular purpose. Nothing in this EULA excludes any warranty or consumer protection right that cannot legally be excluded.',
      },
      {
        heading: '17. Limitation of Liability',
        body: 'To the maximum extent permitted by applicable law, Jalal Amanj shall not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or related to the use of Edara, including loss of data, revenue, profits, business opportunities, or other economic loss. The Licensee remains responsible for maintaining appropriate backups and protecting the device on which Edara is installed. Nothing in this EULA excludes or limits liability that cannot legally be excluded or limited.',
      },
      {
        heading: '18. Termination',
        body: 'This EULA and the license granted under it may terminate if you materially breach this EULA or the applicable license terms. Upon termination, you must stop using the Software and, where applicable, remove it from unauthorized devices. Termination does not affect provisions that by their nature are intended to survive termination, including provisions concerning intellectual property, disclaimers, limitations of liability, and applicable legal rights.',
      },
      {
        heading: '19. Assignment and Transfer',
        body: 'The license is intended for the purchaser and the authorized device and may not be transferred, resold, sublicensed, or assigned to another person or device without the Licensor\'s authorization, except where applicable law provides otherwise.',
      },
      {
        heading: '20. Governing Law',
        body: 'This EULA is intended to be governed by the applicable laws of the Republic of Iraq, subject to any mandatory legal protections or requirements that apply to the Licensee. Disputes arising from this EULA or the use of Edara shall be subject to the jurisdiction of the competent courts in Iraq, unless applicable law requires otherwise.',
      },
      {
        heading: '21. Entire Agreement',
        body: 'This EULA, together with the applicable purchase terms and the Edara Privacy Policy, constitutes the principal agreement governing the licensed use of Edara. If a specific written agreement expressly signed by the Licensor conflicts with this EULA, the specific written agreement will control to the extent of the conflict.',
      },
      {
        heading: '22. Changes to This EULA',
        body: 'The Licensor may update this EULA when reasonably necessary to reflect changes to the Software, licensing model, legal requirements, or business practices. The latest version will be made available through the appropriate Edara website or application resources. The "Last Updated" date identifies the most recent revision.',
      },
      {
        heading: '23. Contact Information',
        body: 'For licensing, EULA, purchase, or support questions, contact:',
        after: 'Jalal Amanj — Kirkuk, Iraq — Email: devjalalamanj@gmail.com',
      },
    ],
  },
};
