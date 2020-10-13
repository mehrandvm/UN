const vocabs = {
    'damage-assessment': 'سامانه ارزیابی خسارت و بازسازی',
    'baztab-project': 'پروژه بازتاب',
    'humanitarian-protection': 'حفاظت بشر دوستانه و بازسازی اجتماعی در استان کرمانشاه',
    'islamic-republic': 'جمهوری اسلامی ایران',
    'login': 'لاگین',
    'english': 'انگلیسی',
    'persian': 'فارسی',
    'sign-in': 'ورود',
    'password': 'رمز عبور',
    'email-address': 'آدرس ایمیل',
    'copyright': 'Copyright © ',
    'un-habitat': 'UN Habitat',
    'national-view': 'نمای ملی',
    'selected-province': 'استان انتخاب شده',
    'selected-county': 'شهرستان انتخاب شده',
    'selected-village': 'روستای انتخاب شده',
    'flood-hazard-zone': 'محدوده خطر سیلاب',
    'seismic-hazard-zone': 'محدوده خطر زلزله',
    'stage-one': "مرحله اول",
    'stage-two': "مرحله دوم",
    'stage-three': "مرحله سوم",
    'stage-four': "مرحله چهارم",
    'logout': "خروج",
    'first-name': "نام",
    'last-name': "نام خانوادگی",
    'user-name': "نام کاربری",
    'user-role': "وظیفه کاربری",
    'email': "ایمیل",
    'phone-number': "شماره تلفن",
    'users-table': "جدول کاربران",
    'agent-name': "نام کارشناس",
    'assigned-subdivision': "بخش ارجاع شده",
    'task-reporter': "ارجاع دهنده وظیفه",
    'tasks-table': "جدول وظایف",
    'past-year-progress-by-month': "پیشرفت سالیانه به تفکیک ماه",
    'selected-user': 'کاربر انتخاب شده',
    'tasks-form': 'فرم وظایف',
    'users-form': 'فرم کاربران',
    'cancel': 'لغو',
    'save': 'ذخیره',
    'confirm-password': 'تایید رمز عبور',
    'agent': 'کارشناس',
    'admin': 'ادمین',
    'dashboard': 'داشبورد',
    'home': 'خانه',
    'users': 'تعیین کاربران',
    'tasks': 'تعیین وظایف',
    'my-tasks': 'وظایف من',
    'profile': 'پروفایل',
    'my-tasks-table': 'جدول وظایف من',
    'my-dashboard': 'داشبورد من',
    'list-of-assessed-units': 'لیست مراکز ارزیابی شده',
    'list-of-issue-to-bank': 'لیست نامه های مراجعه به بانک',
    'list-of-appeals-objections': 'لیست درخواست ها و اعتراضات',
    'assigned-units': 'مراکز اختصاص یافته: ',
    'damage-assessments':'تاسیسات آسیب دیده',
    'issue-letter':'نامه به بانک',
    'appeals-objections':'درخواست ها / اعتراضات',
    'referrence_code': 'شماره پرونده',
    'subdivision': 'زیربخش',
    'incident': 'نوع حادثه',
    'damage_type': 'نوع خسارت',
    'stage_number': 'مرحله',
    'is_wall_damaged': 'دیوار آسیب دیده',
    'view-objection': 'دیدن اعتراض',
    'download-letter': 'دانلود نامه',
    'objection-review': 'بازدید اعتراض',
    'objection-text': 'متن اعتراض',
    'stage': 'مرحله',
    'yes': 'بله',
    'no': 'خیر',
    'export-letter': 'صدور نامه',
    'preliminary': 'مقدماتی',
    'incident-name': 'نام حادثه',
    'coordinate-x': 'طول جغرافیایی حادثه',
    'coordinate-y': 'عرض جغرافیایی حادثه',
    'show-coordinates': 'نمایش مختصات',
    'confirm-incident': 'تایید حادثه',
    'loading-dashboard': 'در حال بارگذاری داشبورد...',
    'user-expired': 'نام کاربری یا پسورد شما منقضی شده است',
    'unauthorized': 'نام کاربری یا پسورد شما نادرست می باشد',
    'auth-error': 'خطای ورود',
    'survey-table': 'جدول فرم ها',
    'category-table': 'جدول دسته بندی ها',
    'question-table': 'جدول سوال ها',
    'stage-one-name': 'ارزیابی خسارت',
    'stage-two-name': 'پی و ستون ها',
    'stage-three-name': 'دیوار ها و سقف ها',
    'stage-four-name': 'نازک کاری',
    'survey-forms': 'فرم های ارزیابی',
    'categories': 'دسته بندی ها',
    'questions': 'سوالات',
};

export const fa = (key) => vocabs[key] || `${key}`;
