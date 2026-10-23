export const careerPaths = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Build websites and web applications using HTML, CSS, JavaScript, and modern frameworks.',
    icon: '🌐',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    totalSkills: 20,
    estimatedDuration: '8-12 months',
    jobRoles: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Create intelligent systems that learn from data using algorithms and neural networks.',
    icon: '🤖',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    totalSkills: 19,
    estimatedDuration: '10-14 months',
    jobRoles: ['ML Engineer', 'AI Researcher', 'Data Scientist'],
    tags: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision']
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Extract meaningful insights from data using statistics, visualization, and ML techniques.',
    icon: '📊',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    totalSkills: 15,
    estimatedDuration: '8-12 months',
    jobRoles: ['Data Scientist', 'Data Analyst', 'BI Analyst'],
    tags: ['Python', 'SQL', 'Pandas', 'Tableau', 'Statistics']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect systems, networks, and programs from digital attacks and vulnerabilities.',
    icon: '🔐',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    totalSkills: 15,
    estimatedDuration: '10-14 months',
    jobRoles: ['Security Analyst', 'Pen Tester', 'SOC Analyst'],
    tags: ['Networking', 'Linux', 'Ethical Hacking', 'Cryptography', 'Kali']
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Bridge dev and ops with CI/CD pipelines, containers, cloud, and automation.',
    icon: '⚙️',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    totalSkills: 15,
    estimatedDuration: '8-12 months',
    jobRoles: ['DevOps Engineer', 'SRE', 'Platform Engineer'],
    tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Design beautiful, intuitive interfaces and user experiences for digital products.',
    icon: '🎨',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    totalSkills: 14,
    estimatedDuration: '6-10 months',
    jobRoles: ['UI Designer', 'UX Designer', 'Product Designer'],
    tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Accessibility']
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description: 'Create cross-platform or native mobile applications for iOS and Android.',
    icon: '📱',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    totalSkills: 13,
    estimatedDuration: '8-12 months',
    jobRoles: ['Mobile Developer', 'React Native Dev', 'Flutter Developer'],
    tags: ['React Native', 'Flutter', 'Firebase', 'iOS', 'Android']
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description: 'Master algorithms, system design, architecture, and professional engineering practices.',
    icon: '💻',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    totalSkills: 15,
    estimatedDuration: '12-18 months',
    jobRoles: ['Software Engineer', 'Backend Engineer', 'Software Architect'],
    tags: ['DSA', 'System Design', 'Design Patterns', 'APIs', 'Databases']
  }
]

export const getCareerPath = (id) => careerPaths.find(cp => cp.id === id)
