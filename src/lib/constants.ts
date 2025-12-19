
import type { LucideIcon } from "lucide-react";
import { Lightbulb, Target, Users, Bot, Star, BarChart, Gem, Briefcase, DraftingCompass, Cpu, Code, BrainCircuit, Building, Network, Shield, Handshake, Landmark, BriefcaseBusiness, TrendingUp, UsersRound, Palette, Scale, HeartHandshake, Rocket, Banknote } from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/insights", label: "Insights" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About Us" },
];

export const PRODUCTS = [
  { 
    id: "atomicai", 
    name: "AtomicAI™", 
    description: "Granular insights into user behavior.", 
    icon: Bot, 
    imageId: "product1",
    tagline: "The microscope for user behavior.",
    detailedDescription: "AtomicAI™ provides hyper-granular insights into user interactions, revealing the subtle patterns and behaviors that drive engagement and conversion. Go beyond traditional analytics to understand the 'why' behind every click, scroll, and hesitation.",
    keyBenefits: `
      Identify hidden friction points in your user journeys.
      Uncover novel user segments based on nuanced behaviors.
      Quantify the impact of UI/UX changes with unprecedented precision.
      Power personalization engines with deep behavioral data.
    `,
    learnMoreUrl: "#"
  },
  { 
    id: "beyondquadrants", 
    name: "BeyondQuadrants™", 
    description: "Uncover hidden growth vectors.", 
    icon: Star, 
    imageId: "product2",
    tagline: "Navigate your market's multidimensional space.",
    detailedDescription: "Traditional market analysis places you in a 2x2 grid. BeyondQuadrants™ uses multi-factor analysis to map complex market landscapes, revealing uncontested spaces and hidden opportunities for strategic growth and differentiation.",
    keyBenefits: `
      Visualize your competitive landscape in multiple dimensions.
      Identify underserved market niches and emerging trends.
      Stress-test strategic moves before committing resources.
      Discover non-obvious partnership and M&A opportunities.
    `,
    learnMoreUrl: "#"
  },
  { 
    id: "disquo", 
    name: "DisQuo™", 
    description: "Transform business models with analytics.", 
    icon: BarChart, 
    imageId: "product3",
    tagline: "Challenge the status quo with data-driven audacity.",
    detailedDescription: "DisQuo™ is a strategic simulation engine that allows you to model and test disruptive business models. Evaluate the potential impact of changes to pricing, service delivery, and operational structure in a risk-free virtual environment.",
    keyBenefits: `
      De-risk innovation by simulating business model transformations.
      Understand the second and third-order effects of strategic shifts.
      Optimize for market disruption, not just incremental improvement.
      Build a robust, data-backed case for organizational change.
    `,
    learnMoreUrl: "#"
  },
  { 
    id: "elwis", 
    name: "ELWIS™", 
    description: "Streamline complex enterprise workflows.", 
    icon: Briefcase, 
    imageId: "product4",
    tagline: "The Enterprise-Level Workflow Intelligence System.",
    detailedDescription: "ELWIS™ maps, analyzes, and optimizes the intricate web of workflows that power your organization. It identifies bottlenecks, automates redundancies, and suggests process improvements to enhance efficiency and employee satisfaction across the enterprise.",
    keyBenefits: `
      Gain end-to-end visibility into cross-departmental processes.
      Identify and eliminate costly workflow inefficiencies.
      Automate manual tasks and free up your team for high-value work.
      Create a more agile and responsive organizational structure.
    `,
    learnMoreUrl: "#"
  },
  { 
    id: "propricing", 
    name: "ProPRICING™", 
    description: "Optimize revenue with data.", 
    icon: Gem, 
    imageId: "product5",
    tagline: "Price with precision. Monetize with confidence.",
    detailedDescription: "Move beyond cost-plus and competitor-based pricing. ProPRICING™ leverages behavioral data and value metrics to identify the optimal pricing structure for your products and services, maximizing both revenue and customer satisfaction.",
    keyBenefits: `
      Understand your customers' true willingness to pay.
      Develop dynamic, value-based pricing tiers.
      Model the revenue impact of different pricing strategies.
      Reduce churn by aligning price with perceived value.
    `,
    learnMoreUrl: "#"
  },
  { 
    id: "skillorbit", 
    name: "SkillOrbit™", 
    description: "Map, manage, and grow talent.", 
    icon: DraftingCompass, 
    imageId: "product6",
    tagline: "Your gravitational center for organizational talent.",
    detailedDescription: "SkillOrbit™ provides a dynamic, visual map of your organization's skills and competencies. It helps you identify skill gaps, deploy talent effectively, and create data-driven career pathing and development programs for your employees.",
    keyBenefits: `
      Visualize the collective capabilities of your entire workforce.
      Identify and address critical skill gaps before they impact performance.
      Facilitate internal mobility and data-driven succession planning.
      Personalize employee development plans at scale.
    `,
    learnMoreUrl: "#"
  },
];

export const PRODUCT_CATEGORIES = [
    {
        id: 'strategy',
        name: 'Strategy & Growth',
        description: 'Solutions for market analysis, business model innovation, and revenue optimization.',
        icon: TrendingUp,
        products: ['beyondquadrants', 'disquo', 'propricing'],
        imageId: "prod-cat-strategy"
    },
    {
        id: 'operations',
        name: 'Operations & Efficiency',
        description: 'Tools to streamline workflows, enhance productivity, and manage enterprise processes.',
        icon: Cpu,
        products: ['elwis'],
        imageId: "prod-cat-operations"
    },
    {
        id: 'people',
        name: 'People & Talent',
        description: 'Platforms for understanding user behavior, managing skills, and fostering development.',
        icon: UsersRound,
        products: ['atomicai', 'skillorbit'],
        imageId: "prod-cat-people"
    }
]

export const WHAT_WE_DO_CARDS: { title: string; description: string; Icon: LucideIcon, imageId: string }[] = [
    { title: "RESULTING™", description: "Our proprietary framework for measuring and driving tangible outcomes in technology and human capital.", Icon: Target, imageId: "what-we-do-1" },
    { title: "Thought-leadership", description: "Cutting-edge research and insights from the forefront of human-computer interaction and organizational psychology.", Icon: Lightbulb, imageId: "what-we-do-2" },
    { title: "Training & Development", description: "Upskilling your teams to thrive in a dynamically changing digital landscape with our bespoke programs.", Icon: Users, imageId: "what-we-do-3" },
];

export const INSIGHTS_TEASER_CARDS = [
    { title: "Global Tech Impact Survey 2024", category: "Surveys", description: "Our annual survey provides a comprehensive overview of the technology landscape. We analyze critical trends, benchmark industry standards, and offer forward-looking predictions for the year ahead.", imageId: "insight1", date: "Oct 22, 2024", readTime: "8 min read", _id: "research1" },
    { title: "The Rise of the Hybrid Workforce", category: "Blogs", description: "Explore our expert analysis on the evolving nature of work. This blog post delves into the challenges and opportunities presented by hybrid models and offers strategies for building a resilient and connected remote team.", imageId: "insight2", date: "Oct 15, 2024", readTime: "5 min read", _id: "research2" },
    { title: "Transforming Retail with AtomicAI™", category: "Case Studies", description: "Discover how a leading retailer leveraged AtomicAI™ to revolutionize their customer experience and drive revenue. This case study details the implementation process, key performance indicators, and the impressive results achieved.", imageId: "insight3", date: "Oct 1, 2024", readTime: "12 min read", _id: "research3" },
    { title: "The Ethics of AI in Hiring", category: "AI Ethics", description: "This article navigates the complex ethical considerations of using AI in recruitment and talent acquisition. We discuss potential biases in algorithms and propose a framework for responsible, fair, and transparent implementation.", imageId: "insight4", date: "Sep 25, 2024", readTime: "7 min read", _id: "research4" },
    { title: "Cybersecurity in the Quantum Era", category: "Cybersecurity", description: "As quantum computing advances, new cybersecurity threats emerge that could break current encryption standards. Our research explores the potential risks and outlines strategies for future-proofing your security infrastructure.", imageId: "insight5", date: "Sep 18, 2024", readTime: "10 min read", _id: "research5" },
    { title: "UX for AR: Designing for New Realities", category: "UX Design", description: "Augmented reality presents unique design challenges that go beyond traditional screen-based interfaces. This article provides best practices for creating intuitive and engaging user experiences in AR environments.", imageId: "insight6", date: "Sep 10, 2024", readTime: "9 min read", _id: "research6" }
];

export const RESEARCH_CATEGORIES = [
    { name: "UX Research", description: "Deep dives into user behavior and interaction design.", icon: Users, imageId: "category-ux" },
    { name: "Artificial Intelligence", description: "Exploring the frontiers of machine learning and cognitive computing.", icon: Bot, imageId: "category-ai" },
    { name: "Developer Tools", description: "Analysis of tools and platforms that shape modern software development.", icon: Code, imageId: "category-dev" },
    { name: "Future of Work", description: "Investigating the evolving landscape of work, collaboration, and productivity.", icon: BriefcaseBusiness, imageId: "category-work" },
    { name: "AI Ethics", description: "Navigating the moral and societal implications of artificial intelligence.", icon: Handshake, imageId: "category-ethics" },
    { name: "Cybersecurity", description: "Studies on digital defense, threat intelligence, and secure systems.", icon: Shield, imageId: "category-cyber" },
    { name: "Economics", description: "Analyzing the financial and market impacts of technological innovation.", icon: Landmark, imageId: "category-econ" },
    { name: "Data Science", description: "Methodologies for extracting knowledge and insights from data.", icon: BarChart, imageId: "category-data" },
    { name: "Psychology", description: "Understanding the cognitive and behavioral aspects of technology use.", icon: BrainCircuit, imageId: "category-psych" },
];

export const RESEARCH_ARTICLES = [
  { 
    _id: "mock-1",
    title: "The Psychology of UI: How Color and Shape Influence User Behavior", 
    category: "UX Research", 
    imageId: "research1",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-2",
    title: "AI in 2025: Predicting the Next Wave of Disruptive Innovation", 
    category: "Artificial Intelligence", 
    imageId: "research2",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-3",
    title: "Measuring Developer Productivity: Beyond Lines of Code", 
    category: "Developer Tools", 
    imageId: "research3",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-4",
    title: "The Future of Remote Collaboration: Tools and Techniques", 
    category: "Future of Work", 
    imageId: "research4",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-5",
    title: "Ethical AI: Navigating the Moral Landscape of Machine Learning", 
    category: "AI Ethics", 
    imageId: "research5",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-6",
    title: "Quantum Computing's Impact on Enterprise Data Security", 
    category: "Cybersecurity", 
    imageId: "research6",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-7",
    title: "The Economic Impact of Open Source Software", 
    category: "Economics", 
    imageId: "research7",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-8",
    title: "Data Sonification: Turning Data into Sound", 
    category: "Data Science", 
    imageId: "research8",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-9",
    title: "The Gig Economy & The Future of Work", 
    category: "Future of Work", 
    imageId: "research9",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-10",
    title: "Human-AI Collaboration in Creative Processes", 
    category: "Artificial Intelligence", 
    imageId: "research10",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-11",
    title: "The Role of Empathy in Design Thinking", 
    category: "UX Research", 
    imageId: "research11",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-12",
    title: "Cyber-Physical Systems: A New Frontier", 
    category: "Cybersecurity", 
    imageId: "research12",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-13",
    title: "The Psychology of Gamification", 
    category: "Psychology", 
    imageId: "research13",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-14",
    title: "Low-Code/No-Code Platforms: The Democratization of Development", 
    category: "Developer Tools", 
    imageId: "research14",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-15",
    title: "Neuro-Symbolic AI: The Next Evolution", 
    category: "Artificial Intelligence", 
    imageId: "research15",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-16",
    title: "The Metaverse: Hype vs. Reality", 
    category: "Future of Work", 
    imageId: "research16",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-17",
    title: "Privacy-Preserving Machine Learning", 
    category: "AI Ethics", 
    imageId: "research17",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-18",
    title: "Digital Twins: Modeling the Real World", 
    category: "Data Science", 
    imageId: "research18",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-19",
    title: "The Impact of 5G on IoT", 
    category: "Cybersecurity", 
    imageId: "research19",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
  { 
    _id: "mock-20",
    title: "The Ethics of Autonomous Weapons", 
    category: "AI Ethics", 
    imageId: "research20",
    summary: "A comprehensive analysis of how remote work has transformed organizational culture.",
    publicationDate: "2024-11-15",
  },
];

export const GLOBAL_OFFICES = ["Australia", "Brazil", "Germany", "India", "Japan", "UK", "US"];

export const LEADERSHIP_TEAM = [
    { name: "Dr. Evelyn Reed", role: "Founder & CEO", bio: "A visionary in human-tech dynamics, Evelyn founded Planckpoint to bridge the gap between innovation and its human impact.", imageId: "leader1" },
    { name: "Marcus Thorne", role: "Chief Technology Officer", bio: "With two decades in software architecture, Marcus leads the development of our groundbreaking product suite.", imageId: "leader2" },
    { name: "Lena Petrova", role: "Head of Research", bio: "Lena's work in organizational psychology and data science fuels our industry-leading insights and methodologies.", imageId: "leader3" },
    { name: "Kenji Tanaka", role: "Chief Operating Officer", bio: "Kenji excels at scaling operations globally, ensuring Planckpoint's seamless delivery and client satisfaction.", imageId: "leader4" },
];

export const BOARD_OF_ADVISORS = [
    { name: "Dr. Alistair Finch", role: "Professor of Human-Computer Interaction, MIT" },
    { name: "Isabella Rossi", role: "Former CEO, Tech Solutions Inc." },
    { name: "General Carter (Ret.)", role: "Cybersecurity Strategist" },
    { name: "Priya Sharma", role: "Venture Capitalist, Futura Ventures" },
];

export const FOOTER_LINKS = [
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Insights", href: "/insights" },
            { label: "Research", href: "/research" },
        ],
    },
    {
        title: "Products",
        links: [
            ...PRODUCTS.map(p => ({ label: p.name, href: `/products#${p.id}`}))
        ],
    },
    {
        title: "Connect",
        links: [
            { label: "Contact Us", href: "/contact" },
            { label: "LinkedIn", href: "#" },
            { label: "Twitter", href: "#" },
        ],
    },
];


export const HOME_HERO_CONTENT = [
    { id: "hero-slide-1", title: "Empower human-centered innovation.", subtitle: "Build technology that works for people.", imageId: "hero-abstract-1" },
    { id: "hero-slide-2", title: "Reimagine business with AI-driven workforces.", subtitle: "Unlock human potential with intelligent automation.", imageId: "hero-abstract-2" },
    { id: "hero-slide-3", title: "Transform data into strategic intelligence.", subtitle: "Drive decisions with clarity and foresight.", imageId: "hero-abstract-3" },
]


// Mock research data for demo containers
export const mockResearchData = [
  {
    _id: 'mock-1',
    title: 'The Evolution of Remote Work Culture',
    summary: 'Comprehensive analysis of how remote work has transformed organizational culture and employee engagement over the past three years.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_f6cd93b30bf640b3a4325a8b6b06308f~mv2.jpg',
    publicationDate: new Date('2024-11-15'),
    category: 'Future of Work',
  },
  {
    _id: 'mock-2',
    title: 'AI Integration in Enterprise Systems',
    summary: 'Study on successful AI implementation strategies and their impact on operational efficiency and cost reduction.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_8801d0855b1f4ab981404fef841c824e~mv2.jpg',
    publicationDate: new Date('2024-11-10'),
    category: 'Artificial Intelligence',
  },
  {
    _id: 'mock-3',
    title: 'Employee Wellness and Productivity Metrics',
    summary: 'Data-driven insights into the correlation between employee wellness programs and overall productivity levels.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_efd169792bfb434581b1736268834290~mv2.jpg',
    publicationDate: new Date('2024-11-05'),
    category: 'Workplace Analytics',
  },
  {
    _id: 'mock-4',
    title: 'Cybersecurity in Distributed Teams',
    summary: 'Best practices for maintaining security protocols in organizations with distributed and remote workforce.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_4361fe968edb461487cc7515b778b550~mv2.jpg',
    publicationDate: new Date('2024-10-28'),
    category: 'Cybersecurity',
  },
  {
    _id: 'mock-5',
    title: 'Digital Skills Gap Analysis 2024',
    summary: 'Assessment of current digital skills gaps in the workforce and recommendations for targeted training programs.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_f6cd93b30bf640b3a4325a8b6b06308f~mv2.jpg',
    publicationDate: new Date('2024-10-20'),
    category: 'Digital Transformation',
  },
  {
    _id: 'mock-6',
    title: 'Cloud Migration Success Factors',
    summary: 'Analysis of key factors that determine successful cloud migration projects and organizational readiness.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_8801d0855b1f4ab981404fef841c824e~mv2.jpg',
    publicationDate: new Date('2024-10-15'),
    category: 'Digital Transformation',
  },
  {
    _id: 'mock-7',
    title: 'Human-Centered Design in Tech',
    summary: 'Exploring the importance of human-centered design principles in creating user-friendly technology solutions.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_efd169792bfb434581b1736268834290~mv2.jpg',
    publicationDate: new Date('2024-10-08'),
    category: 'UX Research',
  },
  {
    _id: 'mock-8',
    title: 'Automation and Job Displacement',
    summary: 'Research on the impact of automation on employment and strategies for workforce transition and reskilling.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_4361fe968edb461487cc7515b778b550~mv2.jpg',
    publicationDate: new Date('2024-09-30'),
    category: 'Future of Work',
  },
  {
    _id: 'mock-9',
    title: 'Organizational Change Management',
    summary: 'Best practices for managing organizational change during digital transformation initiatives.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_f6cd93b30bf640b3a4325a8b6b06308f~mv2.jpg',
    publicationDate: new Date('2024-09-22'),
    category: 'Digital Transformation',
  },
  {
    _id: 'mock-10',
    title: 'Data Privacy and Compliance',
    summary: 'Comprehensive guide to data privacy regulations and compliance strategies for modern organizations.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_8801d0855b1f4ab981404fef841c824e~mv2.jpg',
    publicationDate: new Date('2024-09-15'),
    category: 'Cybersecurity',
  },
  {
    _id: 'mock-11',
    title: 'Customer Experience in Digital Age',
    summary: 'How organizations are leveraging technology to enhance customer experience and build loyalty.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_efd169792bfb434581b1736268834290~mv2.jpg',
    publicationDate: new Date('2024-09-08'),
    category: 'UX Research',
  },
  {
    _id: 'mock-12',
    title: 'Emerging Technologies Roadmap',
    summary: 'Exploration of emerging technologies and their potential impact on business operations and strategy.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_4361fe968edb461487cc7515b778b550~mv2.jpg',
    publicationDate: new Date('2024-08-30'),
    category: 'Artificial Intelligence',
  },
  {
    _id: 'mock-13',
    title: 'Leadership in Digital Transformation',
    summary: 'Study on leadership qualities and skills required to successfully lead digital transformation initiatives.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_f6cd93b30bf640b3a4325a8b6b06308f~mv2.jpg',
    publicationDate: new Date('2024-08-22'),
    category: 'Digital Transformation',
  },
  {
    _id: 'mock-14',
    title: 'Sustainable Technology Practices',
    summary: 'Research on sustainable technology practices and their role in corporate environmental responsibility.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_8801d0855b1f4ab981404fef841c824e~mv2.jpg',
    publicationDate: new Date('2024-08-15'),
    category: 'Economics',
  },
  {
    _id: 'mock-15',
    title: 'Collaborative Tools and Productivity',
    summary: 'Analysis of how modern collaborative tools impact team productivity and communication effectiveness.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_efd169792bfb434581b1736268834290~mv2.jpg',
    publicationDate: new Date('2024-08-08'),
    category: 'Workplace Analytics',
  },
  {
    _id: 'mock-16',
    title: 'Blockchain Applications in Business',
    summary: 'Examination of blockchain technology applications and their potential in various business sectors.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_4361fe968edb461487cc7515b778b550~mv2.jpg',
    publicationDate: new Date('2024-07-30'),
    category: 'Economics',
  },
  {
    _id: 'mock-17',
    title: 'Machine Learning in Decision Making',
    summary: 'How machine learning algorithms are transforming business decision-making processes and analytics.',
    mainImage: 'https://static.wixstatic.com/media/61c56d_f6cd93b30bf640b3a4325a8b6b06308f~mv2.jpg',
    publicationDate: new Date('2024-07-22'),
    category: 'Artificial Intelligence',
  },
  {
    _id: 'mock-18',
    title: 'Digital Twins: Modeling the Real World',
    summary: 'An in-depth look at how digital twin technology is revolutionizing industries from manufacturing to healthcare.',
    mainImage: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg',
    publicationDate: new Date('2024-07-15'),
    category: 'Data Science',
  },
  {
    _id: 'mock-19',
    title: 'The Impact of 5G on IoT',
    summary: 'Analyzing how the rollout of 5G networks is unlocking the full potential of the Internet of Things.',
    mainImage: 'https://images.pexels.com/photos/14840714/pexels-photo-14840714.jpeg',
    publicationDate: new Date('2024-07-08'),
    category: 'Cybersecurity',
  },
  {
    _id: 'mock-20',
    title: 'The Ethics of Autonomous Weapons',
    summary: 'A critical examination of the moral, ethical, and legal challenges posed by autonomous warfare.',
    mainImage: 'https://images.pexels.com/photos/8434771/pexels-photo-8434771.jpeg',
    publicationDate: new Date('2024-07-01'),
    category: 'AI Ethics',
  },
];
    
export const INDUSTRY_SOLUTIONS = [
    {
        id: 'finance',
        name: 'Finance',
        description: 'Optimize risk management, fraud detection, and algorithmic trading with our advanced AI and data analytics platforms.',
        icon: Banknote,
        products: ['atomicai', 'disquo', 'propricing'],
        imageId: "industry-finance"
    },
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Enhance patient outcomes, streamline hospital operations, and accelerate medical research with our specialized healthcare solutions.',
        icon: HeartHandshake,
        products: ['elwis', 'skillorbit'],
        imageId: "industry-healthcare"
    },
    {
        id: 'technology',
        name: 'Technology',
        description: 'Accelerate innovation, optimize development cycles, and gain a competitive edge with our suite of tools for the tech industry.',
        icon: Rocket,
        products: ['beyondquadrants', 'atomicai', 'skillorbit'],
        imageId: "industry-tech"
    },
    {
        id: 'legal',
        name: 'Legal',
        description: 'Transform your legal practice with AI-powered document analysis, case management, and predictive legal analytics.',
        icon: Scale,
        products: ['elwis', 'disquo'],
        imageId: "industry-legal"
    }
]
