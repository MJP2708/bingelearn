// Central front-end taxonomy for Thai K-12 levels plus university-prep faculties and courses.
// Keeping the catalog in one file makes the mockup easy to extend without backend changes.

export type SchoolLevel = "PRIMARY" | "LOWER_SECONDARY" | "UPPER_SECONDARY";

export interface SchoolSubject {
  id: string;
  level: SchoolLevel;
  nameTH: string;
  nameEN: string;
}

export interface Faculty {
  id: string;
  nameTH: string;
  nameEN: string;
  iconEmoji: string;
  description: string;
}

export interface FacultyCourse {
  id: string;
  facultyId: string;
  nameTH: string;
  nameEN: string;
  shortDescription: string;
}

export const schoolLevelMeta: Array<{
  level: SchoolLevel;
  slug: string;
  nameTH: string;
  nameEN: string;
  shortDescription: string;
}> = [
  {
    level: "PRIMARY",
    slug: "primary",
    nameTH: "ประถมศึกษา (ป.1-ป.6)",
    nameEN: "Primary (Prathom 1-6)",
    shortDescription: "Core foundation subjects for younger learners building literacy, numeracy, and confidence.",
  },
  {
    level: "LOWER_SECONDARY",
    slug: "lower-secondary",
    nameTH: "มัธยมศึกษาตอนต้น (ม.1-ม.3)",
    nameEN: "Lower Secondary (Mathayom 1-3)",
    shortDescription: "Deeper middle-school study with stronger exam prep and problem-solving practice.",
  },
  {
    level: "UPPER_SECONDARY",
    slug: "upper-secondary",
    nameTH: "มัธยมศึกษาตอนปลาย (ม.4-ม.6)",
    nameEN: "Upper Secondary (Mathayom 4-6)",
    shortDescription: "Advanced upper-school subjects for university pathways and major entrance preparation.",
  },
];

const primaryAndLowerSubjects = [
  ["mathematics", "คณิตศาสตร์", "Mathematics"],
  ["science", "วิทยาศาสตร์", "Science"],
  ["thai-language", "ภาษาไทย", "Thai Language"],
  ["english", "ภาษาอังกฤษ", "English"],
  ["social-studies", "สังคมศึกษา ศาสนา และวัฒนธรรม", "Social Studies, Religion, Culture"],
  ["health-pe", "สุขศึกษาและพลศึกษา", "Health & Physical Education"],
  ["arts-performing", "ดนตรี ศิลปะ และนาฏศิลป์", "Music, Art, Performing Arts"],
  ["work-technology", "การงานอาชีพและเทคโนโลยี", "Work & Technology"],
] as const;

export const schoolSubjects: SchoolSubject[] = [
  ...primaryAndLowerSubjects.map(([id, nameTH, nameEN]) => ({
    id: `primary-${id}`,
    level: "PRIMARY" as const,
    nameTH,
    nameEN,
  })),
  ...primaryAndLowerSubjects.map(([id, nameTH, nameEN]) => ({
    id: `lower-secondary-${id}`,
    level: "LOWER_SECONDARY" as const,
    nameTH,
    nameEN,
  })),
  { id: "upper-secondary-mathematics", level: "UPPER_SECONDARY", nameTH: "คณิตศาสตร์", nameEN: "Mathematics" },
  { id: "upper-secondary-general-science", level: "UPPER_SECONDARY", nameTH: "วิทยาศาสตร์", nameEN: "General Science" },
  { id: "upper-secondary-physics", level: "UPPER_SECONDARY", nameTH: "ฟิสิกส์", nameEN: "Physics" },
  { id: "upper-secondary-chemistry", level: "UPPER_SECONDARY", nameTH: "เคมี", nameEN: "Chemistry" },
  { id: "upper-secondary-biology", level: "UPPER_SECONDARY", nameTH: "ชีววิทยา", nameEN: "Biology" },
  { id: "upper-secondary-thai-language", level: "UPPER_SECONDARY", nameTH: "ภาษาไทย", nameEN: "Thai Language" },
  { id: "upper-secondary-english", level: "UPPER_SECONDARY", nameTH: "ภาษาอังกฤษ", nameEN: "English" },
  { id: "upper-secondary-social-studies", level: "UPPER_SECONDARY", nameTH: "สังคมศึกษา ศาสนา และวัฒนธรรม", nameEN: "Social Studies, Religion, Culture" },
  { id: "upper-secondary-health-pe", level: "UPPER_SECONDARY", nameTH: "สุขศึกษาและพลศึกษา", nameEN: "Health & Physical Education" },
  { id: "upper-secondary-arts-performing", level: "UPPER_SECONDARY", nameTH: "ดนตรี ศิลปะ และนาฏศิลป์", nameEN: "Music, Art, Performing Arts" },
  { id: "upper-secondary-work-technology", level: "UPPER_SECONDARY", nameTH: "การงานอาชีพและเทคโนโลยี", nameEN: "Work & Technology" },
];

export const faculties: Faculty[] = [
  { id: "medicine", nameTH: "คณะแพทยศาสตร์", nameEN: "Medicine", iconEmoji: "🩺", description: "Pre-med and medical school preparation from foundational sciences to clinical thinking." },
  { id: "engineering", nameTH: "คณะวิศวกรรมศาสตร์", nameEN: "Engineering", iconEmoji: "⚙️", description: "Math-heavy and physics-heavy preparation for engineering problem solving." },
  { id: "computer-science-it", nameTH: "คณะวิทยาการคอมพิวเตอร์ / IT", nameEN: "Computer Science / IT", iconEmoji: "💻", description: "Programming, systems, and software foundations for future developers and technologists." },
  { id: "business-administration", nameTH: "คณะบริหารธุรกิจ", nameEN: "Business Administration", iconEmoji: "📈", description: "Management, marketing, finance, and entrepreneurship for business-focused learners." },
  { id: "law", nameTH: "คณะนิติศาสตร์", nameEN: "Law", iconEmoji: "⚖️", description: "Legal reasoning, legal systems, and doctrinal foundations for law students." },
  { id: "political-science", nameTH: "คณะรัฐศาสตร์", nameEN: "Political Science", iconEmoji: "🏛️", description: "Politics, governance, policy, and global affairs preparation." },
  { id: "fine-arts-design", nameTH: "คณะศิลปกรรม / ออกแบบ", nameEN: "Fine Arts / Design", iconEmoji: "🎨", description: "Portfolio and concept development for fine arts, design, and visual communication." },
  { id: "tourism-hospitality", nameTH: "คณะการท่องเที่ยวและการโรงแรม", nameEN: "Tourism & Hospitality", iconEmoji: "🏨", description: "Service, tourism operations, language-for-service, and hospitality management." },
  { id: "psychology", nameTH: "คณะจิตวิทยา", nameEN: "Psychology", iconEmoji: "🧠", description: "Human behavior, development, research design, and applied psychology." },
  { id: "education", nameTH: "คณะครุศาสตร์ / ศึกษาศาสตร์", nameEN: "Education", iconEmoji: "📚", description: "Teaching practice, curriculum design, and learner-centered educational foundations." },
  { id: "agriculture", nameTH: "คณะเกษตรศาสตร์", nameEN: "Agriculture", iconEmoji: "🌾", description: "Plant, soil, livestock, and sustainable agriculture pathways." },
  { id: "fisheries", nameTH: "คณะประมง", nameEN: "Fisheries", iconEmoji: "🐟", description: "Aquaculture, marine science, and fisheries systems." },
  { id: "forestry", nameTH: "คณะวนศาสตร์", nameEN: "Forestry", iconEmoji: "🌲", description: "Forest systems, conservation, and natural resource stewardship." },
  { id: "architecture", nameTH: "คณะสถาปัตยกรรมศาสตร์", nameEN: "Architecture", iconEmoji: "🏗️", description: "Design studio thinking, technical drawing, and architectural culture." },
  { id: "communication-journalism", nameTH: "คณะนิเทศศาสตร์ / วารสารศาสตร์", nameEN: "Communication / Journalism", iconEmoji: "🎤", description: "Media, storytelling, PR, advertising, and digital communication." },
  { id: "aviation", nameTH: "คณะการบิน", nameEN: "Aviation", iconEmoji: "✈️", description: "Flight theory, aviation systems, and safety-focused preparation." },
  { id: "maritime-studies", nameTH: "คณะพาณิชยนาวี", nameEN: "Maritime Studies", iconEmoji: "🚢", description: "Navigation, maritime law, and sea-based logistics pathways." },
  { id: "accounting", nameTH: "คณะบัญชี", nameEN: "Accounting", iconEmoji: "🧾", description: "Accounting systems, auditing, taxation, and financial reporting." },
  { id: "economics", nameTH: "คณะเศรษฐศาสตร์", nameEN: "Economics", iconEmoji: "💹", description: "Theory-driven quantitative preparation for markets, incentives, and policy." },
  { id: "international-relations", nameTH: "คณะความสัมพันธ์ระหว่างประเทศ", nameEN: "International Relations", iconEmoji: "🌍", description: "Global politics, diplomacy, international law, and international systems." },
  { id: "arts-humanities", nameTH: "คณะอักษรศาสตร์ / มนุษยศาสตร์", nameEN: "Arts / Humanities", iconEmoji: "📝", description: "Languages, literature, linguistics, and humanistic inquiry." },
  { id: "religious-studies-theology", nameTH: "คณะศาสนศึกษา / เทววิทยา", nameEN: "Religious Studies / Theology", iconEmoji: "⛪", description: "Religion, ethics, philosophy, and theological inquiry." },
  { id: "public-health", nameTH: "คณะสาธารณสุข", nameEN: "Public Health", iconEmoji: "🏥", description: "Population health, prevention, health promotion, and community systems." },
  { id: "pharmacy", nameTH: "คณะเภสัชศาสตร์", nameEN: "Pharmacy", iconEmoji: "💊", description: "Drug science, therapeutics, and pharmacy practice preparation." },
  { id: "dentistry", nameTH: "คณะทันตแพทยศาสตร์", nameEN: "Dentistry", iconEmoji: "🦷", description: "Oral anatomy and dental foundations for future dentists." },
  { id: "nursing", nameTH: "คณะพยาบาลศาสตร์", nameEN: "Nursing", iconEmoji: "🩹", description: "Patient care, nursing science, and community-based care pathways." },
  { id: "medical-technology", nameTH: "คณะเทคนิคการแพทย์", nameEN: "Medical Technology", iconEmoji: "🧪", description: "Clinical lab science, diagnostics, and applied medical analysis." },
  { id: "physical-therapy", nameTH: "คณะกายภาพบำบัด", nameEN: "Physical Therapy", iconEmoji: "🦴", description: "Movement science, anatomy, and rehabilitation-focused study." },
  { id: "allied-health-sciences", nameTH: "คณะสหเวชศาสตร์", nameEN: "Allied Health Sciences", iconEmoji: "🥗", description: "Health science pathways spanning nutrition, sports medicine, and wellness." },
  { id: "food-technology", nameTH: "คณะเทคโนโลยีอาหาร", nameEN: "Food Technology", iconEmoji: "🍱", description: "Food science, safety, and processing systems." },
  { id: "digital-games-multimedia", nameTH: "คณะดิจิทัล / เกม / มัลติมีเดีย", nameEN: "Digital / Games / Multimedia", iconEmoji: "🎮", description: "Creative technology pathways in games, animation, UX/UI, and digital content." },
  { id: "criminology", nameTH: "คณะอาชญาวิทยา", nameEN: "Criminology", iconEmoji: "🚨", description: "Crime systems, justice institutions, and behavioral analysis." },
  { id: "military-police", nameTH: "คณะทหาร / ตำรวจ", nameEN: "Military / Police", iconEmoji: "🛡️", description: "Security, defense, strategy, and law-enforcement preparation." },
  { id: "interdisciplinary", nameTH: "คณะสหวิทยาการ", nameEN: "Interdisciplinary", iconEmoji: "🧩", description: "Flexible pathways blending data, innovation, entrepreneurship, and cross-field study." },
];

export const facultyCourses: FacultyCourse[] = [
  { id: "medicine-anatomy", facultyId: "medicine", nameTH: "กายวิภาคศาสตร์", nameEN: "Anatomy", shortDescription: "Ideal for pre-med students building body-structure fundamentals." },
  { id: "medicine-physiology", facultyId: "medicine", nameTH: "สรีรวิทยา", nameEN: "Physiology", shortDescription: "For learners who want to understand how body systems function." },
  { id: "medicine-biochemistry", facultyId: "medicine", nameTH: "ชีวเคมี", nameEN: "Biochemistry", shortDescription: "Strong bridge subject between chemistry and medicine." },
  { id: "medicine-pathology", facultyId: "medicine", nameTH: "พยาธิวิทยา", nameEN: "Pathology", shortDescription: "Best for students preparing for disease mechanisms and diagnostics." },
  { id: "medicine-pharmacology", facultyId: "medicine", nameTH: "เภสัชวิทยา", nameEN: "Pharmacology", shortDescription: "Useful for students interested in drug action and treatment principles." },
  { id: "medicine-microbiology", facultyId: "medicine", nameTH: "จุลชีววิทยา", nameEN: "Microbiology", shortDescription: "For future med students covering bacteria, viruses, and infection." },
  { id: "medicine-community-medicine", facultyId: "medicine", nameTH: "เวชศาสตร์ชุมชน", nameEN: "Community Medicine", shortDescription: "Public-health-facing medicine for prevention and population care." },
  { id: "medicine-clinical", facultyId: "medicine", nameTH: "อายุรศาสตร์ / ศัลยศาสตร์", nameEN: "Internal Medicine / Surgery", shortDescription: "Clinical orientation for learners exploring core hospital disciplines." },

  { id: "engineering-calculus", facultyId: "engineering", nameTH: "แคลคูลัส", nameEN: "Calculus", shortDescription: "Essential for first-year engineering mathematics." },
  { id: "engineering-physics", facultyId: "engineering", nameTH: "ฟิสิกส์วิศวกรรม", nameEN: "Engineering Physics", shortDescription: "Physics principles with direct engineering application." },
  { id: "engineering-mechanics", facultyId: "engineering", nameTH: "กลศาสตร์วิศวกรรม", nameEN: "Engineering Mechanics", shortDescription: "For students preparing statics and dynamics foundations." },
  { id: "engineering-drawing", facultyId: "engineering", nameTH: "เขียนแบบวิศวกรรม", nameEN: "Engineering Drawing", shortDescription: "Visual communication and technical drafting for engineering majors." },
  { id: "engineering-materials", facultyId: "engineering", nameTH: "วัสดุวิศวกรรม", nameEN: "Engineering Materials", shortDescription: "Introduction to materials behavior and selection." },
  { id: "engineering-thermodynamics", facultyId: "engineering", nameTH: "อุณหพลศาสตร์", nameEN: "Thermodynamics", shortDescription: "Core energy systems topic for mechanical and chemical pathways." },
  { id: "engineering-circuits", facultyId: "engineering", nameTH: "วงจรไฟฟ้า", nameEN: "Electric Circuits", shortDescription: "Foundational electrical analysis for multiple engineering disciplines." },
  { id: "engineering-programming", facultyId: "engineering", nameTH: "การเขียนโปรแกรม", nameEN: "Programming", shortDescription: "Programming for engineering computation and automation." },

  { id: "cs-programming", facultyId: "computer-science-it", nameTH: "การเขียนโปรแกรม", nameEN: "Programming", shortDescription: "Best starting point for future software and CS students." },
  { id: "cs-data-structures", facultyId: "computer-science-it", nameTH: "โครงสร้างข้อมูล", nameEN: "Data Structures", shortDescription: "For students ready to optimize how programs store and access data." },
  { id: "cs-algorithms", facultyId: "computer-science-it", nameTH: "ขั้นตอนวิธี", nameEN: "Algorithms", shortDescription: "Problem-solving logic and computational efficiency for CS majors." },
  { id: "cs-databases", facultyId: "computer-science-it", nameTH: "ระบบฐานข้อมูล", nameEN: "Database Systems", shortDescription: "Foundational data design and querying for apps and systems." },
  { id: "cs-operating-systems", facultyId: "computer-science-it", nameTH: "ระบบปฏิบัติการ", nameEN: "Operating Systems", shortDescription: "For learners exploring memory, processes, and system design." },
  { id: "cs-ai", facultyId: "computer-science-it", nameTH: "ปัญญาประดิษฐ์", nameEN: "Artificial Intelligence", shortDescription: "Introductory AI concepts for students interested in modern computing." },
  { id: "cs-networks", facultyId: "computer-science-it", nameTH: "เครือข่ายคอมพิวเตอร์", nameEN: "Computer Networks", shortDescription: "For future IT and infrastructure specialists." },
  { id: "cs-software-engineering", facultyId: "computer-science-it", nameTH: "วิศวกรรมซอฟต์แวร์", nameEN: "Software Engineering", shortDescription: "Project-oriented software design and team development practices." },

  { id: "business-accounting", facultyId: "business-administration", nameTH: "การบัญชีการเงิน", nameEN: "Financial Accounting", shortDescription: "Good for business students who need to read and build financial statements." },
  { id: "business-marketing", facultyId: "business-administration", nameTH: "การตลาด", nameEN: "Marketing", shortDescription: "For brand, customer, and demand-focused learners." },
  { id: "business-management", facultyId: "business-administration", nameTH: "การจัดการ", nameEN: "Management", shortDescription: "Core organizational planning and leadership foundations." },
  { id: "business-economics", facultyId: "business-administration", nameTH: "เศรษฐศาสตร์ธุรกิจ", nameEN: "Business Economics", shortDescription: "Economics applied to business decisions and markets." },
  { id: "business-finance", facultyId: "business-administration", nameTH: "การเงิน", nameEN: "Finance", shortDescription: "For learners focusing on valuation, risk, and capital decisions." },
  { id: "business-hr", facultyId: "business-administration", nameTH: "การจัดการทรัพยากรมนุษย์", nameEN: "Human Resource Management", shortDescription: "People strategy and talent systems for business contexts." },
  { id: "business-entrepreneurship", facultyId: "business-administration", nameTH: "ผู้ประกอบการ", nameEN: "Entrepreneurship", shortDescription: "Startup mindset, innovation, and business-building skills." },

  { id: "law-civil", facultyId: "law", nameTH: "กฎหมายแพ่ง", nameEN: "Civil Law", shortDescription: "Foundational law for rights, obligations, and civil relationships." },
  { id: "law-criminal", facultyId: "law", nameTH: "กฎหมายอาญา", nameEN: "Criminal Law", shortDescription: "Key doctrine for offense, liability, and punishment." },
  { id: "law-constitutional", facultyId: "law", nameTH: "กฎหมายรัฐธรรมนูญ", nameEN: "Constitutional Law", shortDescription: "For students interested in state power and constitutional systems." },
  { id: "law-administrative", facultyId: "law", nameTH: "กฎหมายปกครอง", nameEN: "Administrative Law", shortDescription: "Public administration and state-action legal foundations." },
  { id: "law-international", facultyId: "law", nameTH: "กฎหมายระหว่างประเทศ", nameEN: "International Law", shortDescription: "For globally minded legal studies learners." },
  { id: "law-business", facultyId: "law", nameTH: "กฎหมายธุรกิจ", nameEN: "Business Law", shortDescription: "Commercial and corporate legal basics for business-law pathways." },

  { id: "polisci-theory", facultyId: "political-science", nameTH: "ทฤษฎีการเมือง", nameEN: "Political Theory", shortDescription: "For learners exploring classic and modern political thought." },
  { id: "polisci-ir", facultyId: "political-science", nameTH: "ความสัมพันธ์ระหว่างประเทศ", nameEN: "International Relations", shortDescription: "Global systems, diplomacy, and international actors." },
  { id: "polisci-comparative", facultyId: "political-science", nameTH: "การเมืองเปรียบเทียบ", nameEN: "Comparative Politics", shortDescription: "Comparing institutions, regimes, and political systems." },
  { id: "polisci-policy", facultyId: "political-science", nameTH: "นโยบายสาธารณะ", nameEN: "Public Policy", shortDescription: "For students interested in policy design and implementation." },
  { id: "polisci-thai-politics", facultyId: "political-science", nameTH: "การเมืองไทย", nameEN: "Thai Politics", shortDescription: "Political institutions and issues in Thailand." },
  { id: "polisci-economy", facultyId: "political-science", nameTH: "เศรษฐศาสตร์การเมือง", nameEN: "Political Economy", shortDescription: "Bridges power, markets, and institutional outcomes." },

  { id: "design-drawing", facultyId: "fine-arts-design", nameTH: "วาดเส้น", nameEN: "Drawing", shortDescription: "Foundational visual skill for portfolios and studio practice." },
  { id: "design-composition", facultyId: "fine-arts-design", nameTH: "องค์ประกอบศิลป์", nameEN: "Composition", shortDescription: "Visual arrangement and design balance for creative work." },
  { id: "design-graphic", facultyId: "fine-arts-design", nameTH: "ออกแบบกราฟิก", nameEN: "Graphic Design", shortDescription: "Brand, layout, and visual communication basics." },
  { id: "design-history", facultyId: "fine-arts-design", nameTH: "ประวัติศาสตร์ศิลปะ", nameEN: "Art History", shortDescription: "Contextual study of visual art movements and influences." },
  { id: "design-product", facultyId: "fine-arts-design", nameTH: "ออกแบบผลิตภัณฑ์", nameEN: "Product Design", shortDescription: "Human-centered design for physical products." },
  { id: "design-digital", facultyId: "fine-arts-design", nameTH: "ออกแบบดิจิทัล", nameEN: "Digital Design", shortDescription: "Screen-based design foundations for modern creatives." },

  { id: "tourism-hotel", facultyId: "tourism-hospitality", nameTH: "การจัดการโรงแรม", nameEN: "Hotel Management", shortDescription: "Operations and service systems for hotel industry preparation." },
  { id: "tourism-service", facultyId: "tourism-hospitality", nameTH: "การบริการลูกค้า", nameEN: "Customer Service", shortDescription: "Core service excellence for hospitality-focused learners." },
  { id: "tourism-management", facultyId: "tourism-hospitality", nameTH: "การจัดการการท่องเที่ยว", nameEN: "Tourism Management", shortDescription: "Planning and managing tourism experiences and systems." },
  { id: "tourism-event", facultyId: "tourism-hospitality", nameTH: "การจัดการอีเวนต์", nameEN: "Event Management", shortDescription: "Events, experiences, and guest logistics." },
  { id: "tourism-english", facultyId: "tourism-hospitality", nameTH: "ภาษาอังกฤษเพื่อการบริการ", nameEN: "English for Service", shortDescription: "Practical communication for real hospitality settings." },
  { id: "tourism-second-language", facultyId: "tourism-hospitality", nameTH: "ภาษาที่สอง", nameEN: "Second Language", shortDescription: "Useful for students targeting global service roles." },

  { id: "psych-general", facultyId: "psychology", nameTH: "จิตวิทยาทั่วไป", nameEN: "General Psychology", shortDescription: "First-stop overview of human thought, emotion, and behavior." },
  { id: "psych-developmental", facultyId: "psychology", nameTH: "จิตวิทยาพัฒนาการ", nameEN: "Developmental Psychology", shortDescription: "For students exploring growth across the lifespan." },
  { id: "psych-social", facultyId: "psychology", nameTH: "จิตวิทยาสังคม", nameEN: "Social Psychology", shortDescription: "Focuses on how people think and behave in groups and society." },
  { id: "psych-clinical", facultyId: "psychology", nameTH: "จิตวิทยาคลินิก", nameEN: "Clinical Psychology", shortDescription: "Introductory path for learners interested in mental health practice." },
  { id: "psych-statistics", facultyId: "psychology", nameTH: "สถิติทางจิตวิทยา", nameEN: "Statistics in Psychology", shortDescription: "Quantitative foundations for psych research and analysis." },
  { id: "psych-research", facultyId: "psychology", nameTH: "ระเบียบวิธีวิจัย", nameEN: "Research Methods", shortDescription: "Experimental design and evidence-building for psychology students." },

  { id: "education-psychology", facultyId: "education", nameTH: "จิตวิทยาการศึกษา", nameEN: "Educational Psychology", shortDescription: "How students learn, develop, and respond to teaching." },
  { id: "education-curriculum", facultyId: "education", nameTH: "หลักสูตรและการสอน", nameEN: "Curriculum & Instruction", shortDescription: "Planning and delivering effective learning sequences." },
  { id: "education-measurement", facultyId: "education", nameTH: "การวัดและประเมินผล", nameEN: "Measurement & Evaluation", shortDescription: "Assessment design and evidence-based grading." },
  { id: "education-technology", facultyId: "education", nameTH: "เทคโนโลยีการศึกษา", nameEN: "Educational Technology", shortDescription: "Using digital tools and media to support instruction." },
  { id: "education-pedagogy", facultyId: "education", nameTH: "วิธีสอนเฉพาะสาขา", nameEN: "Subject-specific Pedagogy", shortDescription: "Teaching methods tailored to a chosen subject area." },

  { id: "agri-crop", facultyId: "agriculture", nameTH: "พืชศาสตร์", nameEN: "Crop Science", shortDescription: "For learners focused on plant production and crop systems." },
  { id: "agri-animal", facultyId: "agriculture", nameTH: "สัตวศาสตร์", nameEN: "Animal Science", shortDescription: "Animal production, physiology, and management basics." },
  { id: "agri-soil", facultyId: "agriculture", nameTH: "ดินและปุ๋ย", nameEN: "Soil & Fertilizer", shortDescription: "Essential foundations for soil quality and nutrient management." },
  { id: "agri-entomology", facultyId: "agriculture", nameTH: "กีฏวิทยา", nameEN: "Entomology", shortDescription: "For students studying insects in agricultural systems." },
  { id: "agri-plant-pathology", facultyId: "agriculture", nameTH: "โรคพืช", nameEN: "Plant Pathology", shortDescription: "Disease prevention and diagnosis in crops." },
  { id: "agri-sustainable", facultyId: "agriculture", nameTH: "เกษตรยั่งยืน", nameEN: "Sustainable Agriculture", shortDescription: "Future-facing agriculture with ecological responsibility." },

  { id: "fisheries-aquaculture", facultyId: "fisheries", nameTH: "การเพาะเลี้ยงสัตว์น้ำ", nameEN: "Aquaculture", shortDescription: "For students interested in fish and aquatic farming systems." },
  { id: "fisheries-marine-biology", facultyId: "fisheries", nameTH: "ชีววิทยาทางทะเล", nameEN: "Marine Biology", shortDescription: "Living systems in marine environments." },
  { id: "fisheries-water", facultyId: "fisheries", nameTH: "การจัดการทรัพยากรน้ำ", nameEN: "Water Resource Management", shortDescription: "Water systems, quality, and sustainability in fisheries contexts." },
  { id: "fisheries-technology", facultyId: "fisheries", nameTH: "เทคโนโลยีประมง", nameEN: "Fisheries Technology", shortDescription: "Applied tools and systems for fisheries operations." },

  { id: "forestry-management", facultyId: "forestry", nameTH: "การจัดการป่าไม้", nameEN: "Forest Management", shortDescription: "Planning and stewardship of forest landscapes." },
  { id: "forestry-ecology", facultyId: "forestry", nameTH: "นิเวศวิทยาป่าไม้", nameEN: "Forest Ecology", shortDescription: "Forest ecosystems, biodiversity, and ecological interactions." },
  { id: "forestry-conservation", facultyId: "forestry", nameTH: "การอนุรักษ์ทรัพยากรธรรมชาติ", nameEN: "Natural Resource Conservation", shortDescription: "Conservation-focused study for forest and natural systems." },
  { id: "forestry-silviculture", facultyId: "forestry", nameTH: "วนวัฒนวิทยา", nameEN: "Silviculture", shortDescription: "Tree cultivation and scientific forest regeneration." },

  { id: "arch-design", facultyId: "architecture", nameTH: "ออกแบบสถาปัตยกรรม", nameEN: "Architectural Design", shortDescription: "Core studio thinking for architecture entrants." },
  { id: "arch-drawing", facultyId: "architecture", nameTH: "เขียนแบบเทคนิค", nameEN: "Technical Drawing", shortDescription: "Essential drafting skills for architecture and built environments." },
  { id: "arch-history", facultyId: "architecture", nameTH: "ประวัติศาสตร์สถาปัตยกรรม", nameEN: "Architectural History", shortDescription: "Historical understanding of built form and design language." },
  { id: "arch-interior", facultyId: "architecture", nameTH: "ออกแบบภายใน", nameEN: "Interior Design", shortDescription: "Interior environments, spatial planning, and material mood." },
  { id: "arch-landscape", facultyId: "architecture", nameTH: "ภูมิสถาปัตยกรรม", nameEN: "Landscape Architecture", shortDescription: "Outdoor space, environment, and site design." },

  { id: "comm-mass", facultyId: "communication-journalism", nameTH: "การสื่อสารมวลชน", nameEN: "Mass Communication", shortDescription: "Foundational communication systems and media influence." },
  { id: "comm-production", facultyId: "communication-journalism", nameTH: "การผลิตสื่อ", nameEN: "Media Production", shortDescription: "Hands-on creation of audio, video, and digital media." },
  { id: "comm-advertising", facultyId: "communication-journalism", nameTH: "การโฆษณา", nameEN: "Advertising", shortDescription: "Creative persuasion, campaigns, and consumer communication." },
  { id: "comm-pr", facultyId: "communication-journalism", nameTH: "ประชาสัมพันธ์", nameEN: "Public Relations", shortDescription: "Image-building, messaging, and stakeholder communication." },
  { id: "comm-digital", facultyId: "communication-journalism", nameTH: "สื่อดิจิทัล", nameEN: "Digital Media", shortDescription: "Modern content and communication for online platforms." },

  { id: "aviation-pilot", facultyId: "aviation", nameTH: "ทฤษฎีนักบิน", nameEN: "Pilot Theory", shortDescription: "Ground-school foundations for future pilots." },
  { id: "aviation-aerodynamics", facultyId: "aviation", nameTH: "อากาศพลศาสตร์", nameEN: "Aerodynamics", shortDescription: "Physics of flight and aircraft movement." },
  { id: "aviation-management", facultyId: "aviation", nameTH: "การจัดการการบิน", nameEN: "Aviation Management", shortDescription: "Operations, systems, and management in aviation contexts." },
  { id: "aviation-safety", facultyId: "aviation", nameTH: "ความปลอดภัยการบิน", nameEN: "Aviation Safety", shortDescription: "Safety culture, regulations, and risk management for aviation." },

  { id: "maritime-navigation", facultyId: "maritime-studies", nameTH: "การเดินเรือ", nameEN: "Navigation", shortDescription: "Core maritime movement, route, and vessel operations." },
  { id: "maritime-logistics", facultyId: "maritime-studies", nameTH: "โลจิสติกส์ทางทะเล", nameEN: "Maritime Logistics", shortDescription: "Shipping, ports, and sea-based supply chains." },
  { id: "maritime-law", facultyId: "maritime-studies", nameTH: "กฎหมายทางทะเล", nameEN: "Maritime Law", shortDescription: "Legal frameworks for shipping and sea operations." },

  { id: "accounting-financial", facultyId: "accounting", nameTH: "การบัญชีการเงิน", nameEN: "Financial Accounting", shortDescription: "Accounting fundamentals for statements and reporting." },
  { id: "accounting-management", facultyId: "accounting", nameTH: "การบัญชีบริหาร", nameEN: "Management Accounting", shortDescription: "Internal decision-making through accounting information." },
  { id: "accounting-auditing", facultyId: "accounting", nameTH: "การสอบบัญชี", nameEN: "Auditing", shortDescription: "Assurance and verification of financial information." },
  { id: "accounting-taxation", facultyId: "accounting", nameTH: "ภาษีอากร", nameEN: "Taxation", shortDescription: "Tax systems and compliance for accounting pathways." },

  { id: "econ-micro", facultyId: "economics", nameTH: "เศรษฐศาสตร์จุลภาค", nameEN: "Microeconomics", shortDescription: "Consumer, firm, and market behavior at the micro level." },
  { id: "econ-macro", facultyId: "economics", nameTH: "เศรษฐศาสตร์มหภาค", nameEN: "Macroeconomics", shortDescription: "Growth, inflation, unemployment, and national economies." },
  { id: "econ-econometrics", facultyId: "economics", nameTH: "เศรษฐมิติ", nameEN: "Econometrics", shortDescription: "Data analysis and statistical inference for economics." },
  { id: "econ-financial", facultyId: "economics", nameTH: "เศรษฐศาสตร์การเงิน", nameEN: "Financial Economics", shortDescription: "The economics of finance, assets, and risk." },

  { id: "ir-intro", facultyId: "international-relations", nameTH: "ความสัมพันธ์ระหว่างประเทศ", nameEN: "International Relations", shortDescription: "Foundational course for global politics and state interaction." },
  { id: "ir-global", facultyId: "international-relations", nameTH: "การเมืองโลก", nameEN: "Global Politics", shortDescription: "For learners examining power and conflict beyond borders." },
  { id: "ir-diplomacy", facultyId: "international-relations", nameTH: "การทูต", nameEN: "Diplomacy", shortDescription: "Negotiation, representation, and international dialogue." },
  { id: "ir-law", facultyId: "international-relations", nameTH: "กฎหมายระหว่างประเทศ", nameEN: "International Law", shortDescription: "Legal systems that shape international conduct." },

  { id: "arts-linguistics", facultyId: "arts-humanities", nameTH: "ภาษาศาสตร์", nameEN: "Linguistics", shortDescription: "The scientific study of language structure and use." },
  { id: "arts-literature", facultyId: "arts-humanities", nameTH: "วรรณคดี", nameEN: "Literature", shortDescription: "Critical reading and literary interpretation for humanities students." },
  { id: "arts-translation", facultyId: "arts-humanities", nameTH: "การแปล", nameEN: "Translation", shortDescription: "Language transfer and nuance for multilingual learners." },
  { id: "arts-languages", facultyId: "arts-humanities", nameTH: "ภาษาอังกฤษ จีน ญี่ปุ่น และภาษาอื่น ๆ", nameEN: "Languages (English, Chinese, Japanese, etc.)", shortDescription: "Practical and academic language tracks for humanities learners." },

  { id: "religion-philosophy", facultyId: "religious-studies-theology", nameTH: "ปรัชญาศาสนา", nameEN: "Philosophy of Religion", shortDescription: "For learners exploring belief, reason, and meaning." },
  { id: "religion-theology", facultyId: "religious-studies-theology", nameTH: "เทววิทยา", nameEN: "Theology", shortDescription: "Formal study of doctrine, belief systems, and sacred traditions." },
  { id: "religion-ethics", facultyId: "religious-studies-theology", nameTH: "จริยศาสตร์", nameEN: "Ethics", shortDescription: "Moral reasoning and ethical frameworks across traditions." },

  { id: "public-health-epi", facultyId: "public-health", nameTH: "ระบาดวิทยา", nameEN: "Epidemiology", shortDescription: "Patterns, causes, and prevention of disease in populations." },
  { id: "public-health-education", facultyId: "public-health", nameTH: "สุขศึกษา", nameEN: "Health Education", shortDescription: "Communication and education for healthier communities." },
  { id: "public-health-environment", facultyId: "public-health", nameTH: "อนามัยสิ่งแวดล้อม", nameEN: "Environmental Health", shortDescription: "Environmental factors shaping public well-being." },
  { id: "public-health-promotion", facultyId: "public-health", nameTH: "การส่งเสริมสุขภาพ", nameEN: "Health Promotion", shortDescription: "Behavior change and community well-being initiatives." },

  { id: "pharmacy-chemistry", facultyId: "pharmacy", nameTH: "เคมีเภสัชกรรม", nameEN: "Pharmaceutical Chemistry", shortDescription: "For students interested in medicine design and compounds." },
  { id: "pharmacy-pharmacology", facultyId: "pharmacy", nameTH: "เภสัชวิทยา", nameEN: "Pharmacology", shortDescription: "Drug action and therapeutic effects for pharmacy-focused learners." },
  { id: "pharmacy-clinical", facultyId: "pharmacy", nameTH: "เภสัชกรรมคลินิก", nameEN: "Clinical Pharmacy", shortDescription: "Patient-centered pharmacy practice foundations." },
  { id: "pharmacy-technology", facultyId: "pharmacy", nameTH: "เทคโนโลยีเภสัชกรรม", nameEN: "Pharmaceutical Technology", shortDescription: "Formulation and production of pharmaceutical products." },

  { id: "dentistry-oral-anatomy", facultyId: "dentistry", nameTH: "กายวิภาคช่องปาก", nameEN: "Oral Anatomy", shortDescription: "Core structure knowledge for future dental students." },
  { id: "dentistry-general", facultyId: "dentistry", nameTH: "ทันตกรรมทั่วไป", nameEN: "General Dentistry", shortDescription: "Overview of essential dental care principles and treatments." },
  { id: "dentistry-surgery", facultyId: "dentistry", nameTH: "ศัลยกรรมช่องปาก", nameEN: "Oral Surgery", shortDescription: "For learners interested in procedural and surgical dental care." },

  { id: "nursing-basic", facultyId: "nursing", nameTH: "การพยาบาลพื้นฐาน", nameEN: "Basic Nursing", shortDescription: "Foundational patient care and nursing practice." },
  { id: "nursing-adult", facultyId: "nursing", nameTH: "การพยาบาลผู้ใหญ่", nameEN: "Adult Nursing", shortDescription: "Care systems and assessment for adult patients." },
  { id: "nursing-pediatric", facultyId: "nursing", nameTH: "การพยาบาลเด็ก", nameEN: "Pediatric Nursing", shortDescription: "Developmentally appropriate care for infants and children." },
  { id: "nursing-community", facultyId: "nursing", nameTH: "การพยาบาลชุมชน", nameEN: "Community Nursing", shortDescription: "Public-facing and community-centered nursing practice." },

  { id: "medtech-micro", facultyId: "medical-technology", nameTH: "จุลชีววิทยาคลินิก", nameEN: "Clinical Microbiology", shortDescription: "Laboratory study of microbes in clinical diagnostics." },
  { id: "medtech-hema", facultyId: "medical-technology", nameTH: "โลหิตวิทยา", nameEN: "Hematology", shortDescription: "Blood science and clinical testing foundations." },
  { id: "medtech-chem", facultyId: "medical-technology", nameTH: "เคมีคลินิก", nameEN: "Clinical Chemistry", shortDescription: "Biochemical analysis used in medical diagnosis." },

  { id: "pt-anatomy", facultyId: "physical-therapy", nameTH: "กายวิภาคศาสตร์", nameEN: "Anatomy", shortDescription: "Movement-relevant anatomy for PT students." },
  { id: "pt-rehab", facultyId: "physical-therapy", nameTH: "เวชศาสตร์ฟื้นฟู", nameEN: "Rehabilitation Medicine", shortDescription: "For students focused on recovery and functional restoration." },
  { id: "pt-techniques", facultyId: "physical-therapy", nameTH: "เทคนิคกายภาพบำบัด", nameEN: "Physical Therapy Techniques", shortDescription: "Hands-on foundations for physical therapy practice." },

  { id: "allied-nutrition", facultyId: "allied-health-sciences", nameTH: "โภชนาการ", nameEN: "Nutrition", shortDescription: "Applied nutrition for health science pathways." },
  { id: "allied-sports", facultyId: "allied-health-sciences", nameTH: "เวชศาสตร์การกีฬา", nameEN: "Sports Medicine", shortDescription: "Sport, injury, and performance health fundamentals." },
  { id: "allied-health-science", facultyId: "allied-health-sciences", nameTH: "วิทยาศาสตร์สุขภาพ", nameEN: "Health Science", shortDescription: "Broad interdisciplinary preparation in health systems and wellness." },

  { id: "food-science", facultyId: "food-technology", nameTH: "วิทยาศาสตร์การอาหาร", nameEN: "Food Science", shortDescription: "Core scientific principles behind food systems and quality." },
  { id: "food-safety", facultyId: "food-technology", nameTH: "ความปลอดภัยอาหาร", nameEN: "Food Safety", shortDescription: "Contamination prevention and safety systems for food industries." },
  { id: "food-processing", facultyId: "food-technology", nameTH: "การแปรรูปอาหาร", nameEN: "Food Processing", shortDescription: "Processing methods, preservation, and food production systems." },

  { id: "digital-game-design", facultyId: "digital-games-multimedia", nameTH: "ออกแบบเกม", nameEN: "Game Design", shortDescription: "Systems, mechanics, and creative gameplay planning." },
  { id: "digital-animation", facultyId: "digital-games-multimedia", nameTH: "แอนิเมชัน", nameEN: "Animation", shortDescription: "Motion storytelling for film, games, and multimedia." },
  { id: "digital-uxui", facultyId: "digital-games-multimedia", nameTH: "UX/UI", nameEN: "UX/UI", shortDescription: "Product thinking and interface design for digital products." },
  { id: "digital-content", facultyId: "digital-games-multimedia", nameTH: "คอนเทนต์ดิจิทัล", nameEN: "Digital Content", shortDescription: "Creative production for modern media platforms." },

  { id: "crim-criminology", facultyId: "criminology", nameTH: "อาชญาวิทยา", nameEN: "Criminology", shortDescription: "Theories and patterns of crime and deviance." },
  { id: "crim-justice", facultyId: "criminology", nameTH: "กระบวนการยุติธรรม", nameEN: "Justice System", shortDescription: "Institutions, procedure, and justice delivery systems." },
  { id: "crim-behavior", facultyId: "criminology", nameTH: "พฤติกรรมอาชญากรรม", nameEN: "Criminal Behavior", shortDescription: "Behavioral perspectives on offending and risk." },

  { id: "military-strategy", facultyId: "military-police", nameTH: "ยุทธศาสตร์", nameEN: "Strategy", shortDescription: "Strategic thinking for defense and security education." },
  { id: "military-security-law", facultyId: "military-police", nameTH: "กฎหมายความมั่นคง", nameEN: "Security Law", shortDescription: "Legal frameworks tied to security and enforcement." },
  { id: "military-defense", facultyId: "military-police", nameTH: "การป้องกันประเทศ", nameEN: "National Defense", shortDescription: "Foundational national security and defense concepts." },

  { id: "inter-data-science", facultyId: "interdisciplinary", nameTH: "วิทยาการข้อมูล", nameEN: "Data Science", shortDescription: "Cross-disciplinary quantitative problem solving with data." },
  { id: "inter-innovation", facultyId: "interdisciplinary", nameTH: "นวัตกรรม", nameEN: "Innovation", shortDescription: "Creative systems thinking for modern interdisciplinary programs." },
  { id: "inter-entrepreneurship", facultyId: "interdisciplinary", nameTH: "ผู้ประกอบการ", nameEN: "Entrepreneurship", shortDescription: "Business-building and opportunity design across disciplines." },
  { id: "inter-studies", facultyId: "interdisciplinary", nameTH: "สหวิทยาการศึกษา", nameEN: "Interdisciplinary Studies", shortDescription: "Flexible study across multiple knowledge domains." },
];

export const facultyTutorIds: Record<string, string[]> = {
  medicine: ["tutor-profile-1"],
  engineering: ["tutor-profile-2"],
  "computer-science-it": ["tutor-profile-2"],
  "digital-games-multimedia": ["tutor-profile-2"],
  psychology: ["tutor-profile-1"],
  education: ["tutor-profile-1"],
};

export function parseSchoolLevelSlug(slug: string): SchoolLevel | null {
  return schoolLevelMeta.find((item) => item.slug === slug)?.level ?? null;
}

export function getSchoolLevelBySlug(slug: string) {
  return schoolLevelMeta.find((item) => item.slug === slug) ?? null;
}

export function getSubjectsForLevel(level: SchoolLevel) {
  return schoolSubjects.filter((subject) => subject.level === level);
}

export function getFacultyById(id: string) {
  return faculties.find((faculty) => faculty.id === id) ?? null;
}

export function getCoursesForFaculty(id: string) {
  return facultyCourses.filter((course) => course.facultyId === id);
}

export function getMockTagsForLevel(level: SchoolLevel) {
  if (level === "PRIMARY") {
    return ["พื้นฐาน", "เสริมความเข้าใจ", "สอบเข้าม.1"];
  }

  if (level === "LOWER_SECONDARY") {
    return ["พื้นฐาน", "ตะลุยโจทย์", "สอบเข้าม.4"];
  }

  return ["พื้นฐาน", "ตะลุยโจทย์", "สอบเข้ามหาลัย"];
}
