import { University } from '../context/AppContext';

// Korean Universities Data - Based on CSV imports
export const koreanUniversities: University[] = [
  {
    id: 'kr-ajou-1',
    name: 'ĐẠI HỌC AJOU (아주대학교)',
    country: 'South Korea',
    countryCode: '🇰🇷',
    tagline: 'Top 15 university in South Korea with strong engineering and IT programs',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600',
    overview: 'Ajou University is one of the leading universities in South Korea, ranked 15th out of 200 universities nationwide. Located in Suwon, Gyeonggi-do, Ajou offers comprehensive programs across engineering, IT, communications, natural sciences, business, law, humanities, and cybersecurity. The university provides strong support for international students with airport pickup services, foreign resident card assistance, and SIM card setup.',
    academicPrograms: [
      { icon: 'Cpu', title: 'Engineering & IT', description: 'Top programs in Engineering, Information Technology, and Communications' },
      { icon: 'Microscope', title: 'Natural Sciences', description: 'Strong research programs in natural sciences and applied sciences' },
      { icon: 'Briefcase', title: 'Business & Law', description: 'Comprehensive programs in Business Management and Law' },
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
      'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    ],
    ranking: 'Ranked 15/200 universities in South Korea',
    worldRanking: 550,
    
    // Traditional costs (will be overridden by Korean system)
    generalTuition: 0,
    visaFee: 0,
    accommodationFee: 0,
    insuranceFee: 0,
    additionalFees: [],
    
    // Fixed costs that apply to ALL students (always added - from Ajou sheet)
    fixedCosts: [
      { 
        type: 'Phí tư vấn (Consulting Fee)', 
        amount: 39000000, 
        currency: 'VND', 
        category: 'fixed',
        description: 'Chi phí tư vấn định hướng du học, hỗ trợ chọn trường và ngành học phù hợp với năng lực và nguyện vọng'
      },
      { 
        type: 'Phí môi giới (Agency Fees)', 
        amount: 11000000, 
        currency: 'VND', 
        category: 'fixed',
        description: 'Phí dịch vụ môi giới xử lý hồ sơ, liên lạc với trường, và hỗ trợ toàn bộ quá trình apply'
      },
      { 
        type: 'Khóa học tiếng Hàn (Korean Language Course)', 
        amount: 13000000, 
        currency: 'VND', 
        category: 'fixed',
        description: 'Chi phí khóa học tiếng Hàn cơ bản tại Việt Nam trước khi sang Hàn Quốc (4-6 tháng)'
      },
      { 
        type: 'Phí apply (Application Fee)', 
        amount: 100000, 
        currency: 'KRW', 
        category: 'fixed',
        description: 'Lệ phí nộp hồ sơ đăng ký nhập học do trường yêu cầu, không hoàn lại'
      },
      { 
        type: 'Phí hóa đơn (Invoice / Enrollment Fee)', 
        amount: 5800000, 
        currency: 'KRW', 
        category: 'fixed',
        description: 'Phí nhập học và xử lý hóa đơn học phí, bao gồm các thủ tục hành chính ban đầu'
      },
      { 
        type: 'Tài khoản tiết kiệm (Savings Account)', 
        amount: 10000000, 
        currency: 'KRW', 
        category: 'fixed',
        description: 'Tài khoản tiết kiệm bắt buộc để chứng minh tài chính khi xin visa (10M KRW)'
      },
    ],
    
    // Korean-specific data
    koreanData: {
      isKoreanUniversity: true,
      address: '206 Woldeukeom-ro, Woncheon-dong, Yeongtong-gu, Suwon, Gyeonggi-do, South Korea',
      topVisa: 'Top 2',
      koreanRanking: '15/200 trường đại học tại Hàn Quốc',
      
      // Visa system costs
      visaSystems: [
        {
          visaType: 'D4-1',
          tuitionPerTerm: 1450000,
          tuitionPerTermCurrency: 'KRW',
          applicationFee: 100000,
          applicationFeeCurrency: 'KRW',
          baseYearlyFee: 5800000,
          baseYearlyFeeCurrency: 'KRW',
          description: 'Chương trình tiếng Hàn (Korean Language Program)'
        },
        {
          visaType: 'D2-2',
          tuitionRange: { min: 3736000, max: 4845000 },
          tuitionRangeCurrency: 'KRW',
          applicationFee: 150000,
          applicationFeeCurrency: 'KRW',
          baseYearlyFee: 5800000,
          baseYearlyFeeCurrency: 'KRW',
          description: 'Chương trình đại học (Undergraduate Program)'
        },
        {
          visaType: 'D2-3',
          tuitionRange: { min: 2600000, max: 4038000 },
          tuitionRangeCurrency: 'KRW',
          enrollmentFee: 900000,
          enrollmentFeeCurrency: 'KRW',
          baseYearlyFee: 5800000,
          baseYearlyFeeCurrency: 'KRW',
          description: 'Chương trình sau đại học (Graduate Program)'
        }
      ],
      
      // Major categories
      majorCategories: [
        { 
          category: 'Thế mạnh (Strong Programs)', 
          subjects: ['Kỹ thuật (Engineering)', 'IT', 'Truyền thông (Communications)', 'Y học (Medicine - không nhận SV quốc tế)', 'Khoa học tự nhiên (Natural Sciences)'] 
        },
        { 
          category: 'Khác (Other Programs)', 
          subjects: ['QTKD (Business Management)', 'Luật (Law)', 'Nhân văn (Humanities)', 'Xã hội (Social Sciences)', 'An ninh mạng (Cybersecurity)'] 
        }
      ],
      
      // Scholarships
      scholarships: [
        { visaType: 'D4-1', description: 'Giảm 50-100% học phí cho SV xuất sắc hoặc gia đình Ajou' },
        { visaType: 'D2-2', description: 'Giảm 30-100% dựa trên TOPIK (3-6) hoặc IELTS (5.5-8.5)' },
        { visaType: 'D2-3', description: 'Giảm 40% (Thạc sĩ), 80% (Tiến sĩ) nếu có TOPIK 5+' }
      ],
      
      // Admission requirements
      admissionRequirements: [
        { visaType: 'D4-1', requirement: 'GPA ≥ 7.0, trống < 2 năm' },
        { visaType: 'D2-2', requirement: 'GPA ≥ 6.5, không giới hạn năm trống' },
        { visaType: 'D2-3', requirement: 'GPA ≥ 6.5, không giới hạn năm trống' }
      ],
      
      // Financial requirements
      financialRequirements: [
        { visaType: 'D4-1', requirement: 'Sổ 10,000 USD lùi 6 tháng' },
        { visaType: 'D2-2', requirement: 'Sổ 20,000,000 KRW lùi 3 tháng' },
        { visaType: 'D2-3', requirement: 'Sổ 20,000,000 KRW lùi 3 tháng' }
      ],
      
      // Dorm options in Korea
      dormOptions: [
        { type: 'Phòng 4 người (4-person room)', priceKRW: 747000 },
        { type: 'Phòng 2 người (2-person room)', priceKRW: 1102000 },
        { type: 'Phòng 2 người Quốc tế (International 2-person)', priceKRW: 1440000 }
      ],
      
      // Language course
      languageCourse: {
        available: true,
        priceVND: 13000000
      },
      
      // Student support services
      studentSupport: [
        'Hỗ trợ đón sinh viên Việt Nam tại sân bay về trường',
        'Hỗ trợ làm CCCD người nước ngoài',
        'Hỗ trợ thẻ SIM',
        'Chuyển đổi visa lên chuyên ngành',
        'Chính sách hoàn tiền linh hoạt'
      ],
      
      // Job opportunities
      jobOpportunities: 'Khu trung tâm, nhiều quán ăn (cách 10\' bus). Công việc: Nhà hàng, cửa hàng tiện lợi, dọn dẹp...'
    },
    
    // Optional add-ons - D4-1 specific
    optionalAddons: [
      {
        id: 'korean-language-course',
        name: 'Korean Language Course Level',
        nameVi: 'Học tiếng Hàn',
        nameKr: '한국어 과정',
        type: 'other',
        amount: 13000000,
        currency: 'VND',
        selectable: true,
        requiresInput: true,
        conditional: 'Chọn mức độ tiếng Hàn cần đạt',
        visaTypes: ['D4-1'],
        uiControl: 'dropdown',
        options: [
          { label: '0 → TOPIK 2 (13M VND)', value: 13000000, currency: 'VND' },
          { label: '0 → TOPIK 4 (26-27M VND)', value: 26500000, currency: 'VND' },
          { label: 'Không học (0 VND)', value: 0, currency: 'VND' }
        ]
      },
      {
        id: 'dorm-vn-d41',
        name: 'Dormitory in Vietnam',
        nameVi: 'KTX tại Việt Nam',
        nameKr: '베트남 기숙사',
        type: 'dorm-vn',
        amount: 2400000, // Default 3 months
        currency: 'VND',
        perMonth: true,
        selectable: true,
        requiresInput: true,
        conditional: 'Chọn số tháng ở KTX (800k/tháng)',
        visaTypes: ['D4-1'],
        uiControl: 'dropdown',
        options: [
          { label: '3 tháng (2.4M VND)', value: 2400000, currency: 'VND' },
          { label: '4 tháng (3.2M VND)', value: 3200000, currency: 'VND' },
          { label: '5 tháng (4M VND)', value: 4000000, currency: 'VND' },
          { label: '6 tháng (4.8M VND)', value: 4800000, currency: 'VND' },
          { label: '7 tháng (5.6M VND)', value: 5600000, currency: 'VND' },
          { label: '8 tháng (6.4M VND)', value: 6400000, currency: 'VND' },
          { label: '9 tháng (7.2M VND)', value: 7200000, currency: 'VND' },
          { label: '10 tháng (8M VND)', value: 8000000, currency: 'VND' },
          { label: '11 tháng (8.8M VND)', value: 8800000, currency: 'VND' },
          { label: '12 tháng (9.6M VND)', value: 9600000, currency: 'VND' }
        ]
      },
      {
        id: 'flight-ticket-d41',
        name: 'Flight Ticket',
        nameVi: 'Vé máy bay',
        nameKr: '항공권',
        type: 'flight',
        amount: 10000000,
        currency: 'VND',
        selectable: true,
        requiresInput: true,
        visaTypes: ['D4-1'],
        uiControl: 'dropdown',
        options: [
          { label: 'Sớm nhất (5M VND)', value: 5000000, currency: 'VND' },
          { label: 'Sớm (8M VND)', value: 8000000, currency: 'VND' },
          { label: 'Trung bình (10M VND)', value: 10000000, currency: 'VND' },
          { label: 'Muộn (13M VND)', value: 13000000, currency: 'VND' },
          { label: 'Muộn nhất (17M VND)', value: 17000000, currency: 'VND' }
        ]
      },
      {
        id: 'scholarship-d41',
        name: 'Scholarship for D4-1',
        nameVi: 'Học bổng',
        nameKr: '장학금',
        type: 'scholarship',
        percentage: 0,
        selectable: true,
        requiresInput: true,
        conditional: 'Giảm trừ từ phí Invoice',
        visaTypes: ['D4-1'],
        uiControl: 'dropdown',
        options: [
          { label: '0% - Không học bổng', value: 0 },
          { label: '10% giảm học phí', value: 10 },
          { label: '15% giảm học phí', value: 15 },
          { label: '30% giảm học phí', value: 30 },
          { label: '40% giảm học phí', value: 40 },
          { label: '50% giảm học phí', value: 50 },
          { label: '60% giảm học phí', value: 60 },
          { label: '70% giảm học phí', value: 70 },
          { label: '80% giảm học phí', value: 80 },
          { label: '90% giảm học phí', value: 90 },
          { label: '100% giảm học phí', value: 100 }
        ]
      },
      {
        id: 'dorm-kr-d41',
        name: 'KTX Korea for D4-1',
        nameVi: 'KTX Hàn Quốc',
        nameKr: 'KTX 한국',
        type: 'dorm-kr',
        amount: 14000000,
        currency: 'VND',
        selectable: true,
        requiresInput: true,
        conditional: 'Chi phí 6 tháng',
        visaTypes: ['D4-1'],
        uiControl: 'radio',
        options: [
          { label: 'Phòng 2 người (14M VND/6 tháng)', value: 14000000, currency: 'VND' },
          { label: 'Phòng khác (24M VND/6 tháng)', value: 24000000, currency: 'VND' }
        ]
      }
    ],
    
    majors: ['Engineering', 'IT', 'Communications', 'Natural Sciences', 'Business Management', 'Law', 'Humanities', 'Social Sciences', 'Cybersecurity']
  }
];