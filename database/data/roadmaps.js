const roadmapsData = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'web',
    description: 'Master the art of building modern, responsive websites and web applications from scratch.',
    icon: '🌐',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    estimatedDuration: '8-12 months',
    jobRoles: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    levels: [
      {
        name: 'Phase 1: Internet & Basics',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'internet-basics', name: 'Internet Basics', description: 'How the internet works, HTTP/HTTPS, DNS, hosting, and browsers.', level: 'beginner', estimatedTime: '3 days' },
          { id: 'html', name: 'HTML5', description: 'Structure web pages with semantic HTML, forms, tables, and accessibility.', level: 'beginner', estimatedTime: '1 week' },
          { id: 'css', name: 'CSS3', description: 'Style web pages with selectors, box model, flexbox, grid, and animations.', level: 'beginner', estimatedTime: '2 weeks' },
          { id: 'git', name: 'Git & GitHub', description: 'Version control, branching, merging, pull requests, and collaboration.', level: 'beginner', estimatedTime: '1 week' }
        ]
      },
      {
        name: 'Phase 2: Core JavaScript',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'javascript', name: 'JavaScript', description: 'Variables, functions, DOM, events, ES6+, async/await, and fetch API.', level: 'beginner', estimatedTime: '4 weeks' },
          { id: 'responsive-design', name: 'Responsive Design', description: 'Mobile-first design, media queries, and cross-browser compatibility.', level: 'beginner', estimatedTime: '1 week' },
          { id: 'npm', name: 'Package Managers (npm)', description: 'Managing dependencies, scripts, and project configurations.', level: 'intermediate', estimatedTime: '3 days' },
          { id: 'browser-devtools', name: 'Browser DevTools', description: 'Debugging, performance profiling, and network analysis.', level: 'beginner', estimatedTime: '3 days' }
        ]
      },
      {
        name: 'Phase 3: Frontend Framework',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'react', name: 'React.js', description: 'Components, hooks, state management, React Router, and Context API.', level: 'intermediate', estimatedTime: '6 weeks' },
          { id: 'tailwindcss', name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development.', level: 'intermediate', estimatedTime: '1 week' },
          { id: 'api-integration', name: 'REST API Integration', description: 'Axios, fetch, handling async data, and API authentication.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'state-management', name: 'State Management', description: 'Redux Toolkit, Zustand, or React Query for global state.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 4: Backend & Database',
        order: 4,
        color: '#8b5cf6',
        skills: [
          { id: 'nodejs', name: 'Node.js', description: 'Server-side JavaScript, modules, file system, and event loop.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'expressjs', name: 'Express.js', description: 'REST APIs, middleware, routing, and error handling.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'mongodb', name: 'MongoDB', description: 'NoSQL database, Mongoose ODM, CRUD operations, and aggregation.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'authentication', name: 'Authentication & Security', description: 'JWT, bcrypt, OAuth, session management, and security best practices.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 5: Advanced & Deployment',
        order: 5,
        color: '#ef4444',
        skills: [
          { id: 'typescript', name: 'TypeScript', description: 'Static typing, interfaces, generics, and type-safe development.', level: 'advanced', estimatedTime: '3 weeks' },
          { id: 'testing', name: 'Testing', description: 'Jest, React Testing Library, unit tests, and integration tests.', level: 'advanced', estimatedTime: '2 weeks' },
          { id: 'deployment', name: 'Deployment', description: 'Vercel, Netlify, Railway, Docker basics, and CI/CD pipelines.', level: 'advanced', estimatedTime: '1 week' },
          { id: 'performance', name: 'Web Performance', description: 'Core Web Vitals, code splitting, lazy loading, and optimization.', level: 'advanced', estimatedTime: '2 weeks' }
        ]
      }
    ],
    projects: [
      { name: 'Portfolio Website', description: 'Build a responsive personal portfolio with React', difficulty: 'beginner', skills: ['HTML', 'CSS', 'React'] },
      { name: 'Todo App', description: 'Full CRUD application with local storage', difficulty: 'beginner', skills: ['JavaScript', 'React'] },
      { name: 'E-Commerce Store', description: 'Full-stack store with cart and payments', difficulty: 'intermediate', skills: ['React', 'Node.js', 'MongoDB'] },
      { name: 'Social Media App', description: 'Real-time app with auth and feeds', difficulty: 'advanced', skills: ['React', 'Express', 'MongoDB', 'Socket.io'] }
    ],
    totalSkills: 20
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    category: 'ai',
    description: 'Dive into algorithms, neural networks, and intelligent systems that learn from data.',
    icon: '🤖',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    estimatedDuration: '10-14 months',
    jobRoles: ['ML Engineer', 'AI Researcher', 'Data Scientist'],
    levels: [
      {
        name: 'Phase 1: Math & Programming',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'python-basics', name: 'Python Basics', description: 'Syntax, data structures, OOP, and libraries for ML.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'linear-algebra', name: 'Linear Algebra', description: 'Vectors, matrices, eigenvalues, and matrix operations.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'statistics', name: 'Statistics & Probability', description: 'Distributions, hypothesis testing, and Bayesian thinking.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'calculus', name: 'Calculus for ML', description: 'Derivatives, gradients, and optimization concepts.', level: 'beginner', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 2: Data & Libraries',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'numpy-pandas', name: 'NumPy & Pandas', description: 'Data manipulation, cleaning, and analysis with Python.', level: 'beginner', estimatedTime: '2 weeks' },
          { id: 'matplotlib', name: 'Data Visualization', description: 'Matplotlib, Seaborn, and Plotly for data insights.', level: 'beginner', estimatedTime: '1 week' },
          { id: 'data-preprocessing', name: 'Data Preprocessing', description: 'Feature engineering, normalization, and handling missing values.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'sql-ml', name: 'SQL for Data', description: 'Querying and managing datasets from databases.', level: 'beginner', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 3: Core ML Algorithms',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'supervised-learning', name: 'Supervised Learning', description: 'Linear/Logistic regression, decision trees, SVM, and KNN.', level: 'intermediate', estimatedTime: '4 weeks' },
          { id: 'unsupervised-learning', name: 'Unsupervised Learning', description: 'K-means clustering, PCA, and dimensionality reduction.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'sklearn', name: 'Scikit-Learn', description: 'Model training, evaluation, pipelines, and cross-validation.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'model-evaluation', name: 'Model Evaluation', description: 'Metrics, confusion matrix, ROC curves, and overfitting.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 4: Deep Learning',
        order: 4,
        color: '#8b5cf6',
        skills: [
          { id: 'neural-networks', name: 'Neural Networks', description: 'Perceptrons, backpropagation, and activation functions.', level: 'advanced', estimatedTime: '4 weeks' },
          { id: 'tensorflow-pytorch', name: 'TensorFlow / PyTorch', description: 'Building and training deep learning models.', level: 'advanced', estimatedTime: '6 weeks' },
          { id: 'cnn', name: 'CNNs (Computer Vision)', description: 'Convolutional neural networks for image classification.', level: 'advanced', estimatedTime: '4 weeks' },
          { id: 'nlp', name: 'NLP & Transformers', description: 'Text processing, BERT, GPT, and LLM fine-tuning.', level: 'advanced', estimatedTime: '5 weeks' }
        ]
      },
      {
        name: 'Phase 5: MLOps & Deployment',
        order: 5,
        color: '#ef4444',
        skills: [
          { id: 'mlflow', name: 'MLflow & Experiment Tracking', description: 'Track, compare, and manage ML experiments.', level: 'advanced', estimatedTime: '2 weeks' },
          { id: 'model-deployment', name: 'Model Deployment', description: 'FastAPI, Flask, Docker, and cloud deployment for ML models.', level: 'advanced', estimatedTime: '3 weeks' },
          { id: 'cloud-ml', name: 'Cloud ML Platforms', description: 'AWS SageMaker, GCP Vertex AI, or Azure ML.', level: 'advanced', estimatedTime: '3 weeks' }
        ]
      }
    ],
    projects: [
      { name: 'Spam Classifier', description: 'Email spam detection using NLP', difficulty: 'beginner', skills: ['Python', 'Scikit-learn'] },
      { name: 'House Price Predictor', description: 'Regression model for price prediction', difficulty: 'intermediate', skills: ['Python', 'Pandas', 'Sklearn'] },
      { name: 'Image Classifier', description: 'CNN-based image classification app', difficulty: 'advanced', skills: ['PyTorch', 'CNN', 'Transfer Learning'] },
      { name: 'Chatbot with LLM', description: 'Fine-tune and deploy a custom chatbot', difficulty: 'advanced', skills: ['Transformers', 'HuggingFace', 'FastAPI'] }
    ],
    totalSkills: 19
  },
  {
    id: 'data-science',
    title: 'Data Science',
    category: 'data',
    description: 'Extract insights from data using statistics, visualization, and machine learning techniques.',
    icon: '📊',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    estimatedDuration: '8-12 months',
    jobRoles: ['Data Scientist', 'Data Analyst', 'Business Intelligence Analyst'],
    levels: [
      {
        name: 'Phase 1: Foundations',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'ds-python', name: 'Python for Data Science', description: 'Python syntax, Jupyter notebooks, and data science libraries.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'ds-sql', name: 'SQL & Databases', description: 'SQL queries, joins, aggregations, and database design.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'ds-stats', name: 'Statistics', description: 'Descriptive stats, inferential stats, and A/B testing.', level: 'beginner', estimatedTime: '4 weeks' },
          { id: 'excel', name: 'Excel / Spreadsheets', description: 'Data cleaning, pivot tables, and basic analysis.', level: 'beginner', estimatedTime: '1 week' }
        ]
      },
      {
        name: 'Phase 2: Data Analysis',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'pandas-ds', name: 'Pandas & NumPy', description: 'Data manipulation, aggregation, and wrangling.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'viz', name: 'Data Visualization', description: 'Matplotlib, Seaborn, Plotly, and Tableau basics.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'eda', name: 'Exploratory Data Analysis', description: 'Patterns, correlations, outliers, and data profiling.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'feature-eng', name: 'Feature Engineering', description: 'Creating, transforming, and selecting features.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 3: Machine Learning',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'ds-ml', name: 'Machine Learning', description: 'Regression, classification, and clustering algorithms.', level: 'intermediate', estimatedTime: '5 weeks' },
          { id: 'model-selection', name: 'Model Selection & Tuning', description: 'Cross-validation, hyperparameter tuning, and ensemble methods.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'time-series', name: 'Time Series Analysis', description: 'Forecasting, ARIMA, LSTM for sequential data.', level: 'advanced', estimatedTime: '3 weeks' }
        ]
      },
      {
        name: 'Phase 4: Advanced Topics',
        order: 4,
        color: '#8b5cf6',
        skills: [
          { id: 'big-data', name: 'Big Data Tools', description: 'Spark, Hadoop, and distributed computing basics.', level: 'advanced', estimatedTime: '4 weeks' },
          { id: 'ds-deployment', name: 'Dashboards & Reporting', description: 'Streamlit, Dash, Power BI, and automated reports.', level: 'advanced', estimatedTime: '2 weeks' },
          { id: 'cloud-ds', name: 'Cloud for Data Science', description: 'AWS, GCP, or Azure data services and pipelines.', level: 'advanced', estimatedTime: '3 weeks' }
        ]
      }
    ],
    projects: [
      { name: 'Sales Dashboard', description: 'Interactive business analytics dashboard', difficulty: 'beginner', skills: ['Python', 'Pandas', 'Plotly'] },
      { name: 'Customer Churn Prediction', description: 'ML model for predicting customer retention', difficulty: 'intermediate', skills: ['Python', 'Sklearn', 'Pandas'] },
      { name: 'Real Estate Market Analysis', description: 'Full EDA and predictive modeling project', difficulty: 'advanced', skills: ['Python', 'ML', 'Visualization'] }
    ],
    totalSkills: 15
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'security',
    description: 'Protect systems and networks from cyber threats, vulnerabilities, and attacks.',
    icon: '🔐',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    estimatedDuration: '10-14 months',
    jobRoles: ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Security Engineer'],
    levels: [
      {
        name: 'Phase 1: IT Fundamentals',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'networking', name: 'Networking Basics', description: 'TCP/IP, OSI model, DNS, DHCP, routing, and subnetting.', level: 'beginner', estimatedTime: '4 weeks' },
          { id: 'os-linux', name: 'Linux & OS Fundamentals', description: 'Linux commands, file system, processes, and permissions.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'programming-sec', name: 'Programming Basics', description: 'Python/Bash scripting for automation and security tasks.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'cryptography', name: 'Cryptography Basics', description: 'Encryption, hashing, PKI, TLS/SSL, and digital signatures.', level: 'beginner', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 2: Security Fundamentals',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'security-concepts', name: 'Security Concepts', description: 'CIA triad, threat models, risk assessment, and compliance.', level: 'beginner', estimatedTime: '2 weeks' },
          { id: 'web-security', name: 'Web Application Security', description: 'OWASP Top 10, XSS, SQL injection, CSRF, and secure coding.', level: 'intermediate', estimatedTime: '4 weeks' },
          { id: 'network-security', name: 'Network Security', description: 'Firewalls, VPNs, IDS/IPS, and network monitoring.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'security-tools', name: 'Security Tools', description: 'Wireshark, Nmap, Metasploit, Burp Suite, and Nessus.', level: 'intermediate', estimatedTime: '3 weeks' }
        ]
      },
      {
        name: 'Phase 3: Ethical Hacking',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'pen-testing', name: 'Penetration Testing', description: 'Methodology, recon, exploitation, post-exploitation, and reporting.', level: 'intermediate', estimatedTime: '6 weeks' },
          { id: 'ctf', name: 'CTF Challenges', description: 'Capture The Flag competitions and practical security challenges.', level: 'intermediate', estimatedTime: '4 weeks' },
          { id: 'malware-analysis', name: 'Malware Analysis', description: 'Static/dynamic analysis, reverse engineering, and sandbox tools.', level: 'advanced', estimatedTime: '4 weeks' }
        ]
      },
      {
        name: 'Phase 4: Advanced Security',
        order: 4,
        color: '#ef4444',
        skills: [
          { id: 'incident-response', name: 'Incident Response', description: 'Detection, containment, eradication, and forensics.', level: 'advanced', estimatedTime: '3 weeks' },
          { id: 'cloud-security', name: 'Cloud Security', description: 'AWS/Azure security services, IAM, and compliance.', level: 'advanced', estimatedTime: '3 weeks' },
          { id: 'certifications', name: 'Certifications Prep', description: 'CompTIA Security+, CEH, OSCP preparation.', level: 'advanced', estimatedTime: '8 weeks' }
        ]
      }
    ],
    projects: [
      { name: 'Home Lab Setup', description: 'Build a virtual hacking lab with Kali Linux', difficulty: 'beginner', skills: ['Linux', 'Networking', 'VMs'] },
      { name: 'Vulnerability Scanner', description: 'Custom Python-based network scanner', difficulty: 'intermediate', skills: ['Python', 'Networking', 'Nmap'] },
      { name: 'CTF Writeups', description: 'Solve and document 10 CTF challenges', difficulty: 'advanced', skills: ['Pen Testing', 'Cryptography', 'Web Security'] }
    ],
    totalSkills: 15
  },
  {
    id: 'devops',
    title: 'DevOps',
    category: 'infrastructure',
    description: 'Bridge development and operations with automation, CI/CD, and cloud infrastructure.',
    icon: '⚙️',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    estimatedDuration: '8-12 months',
    jobRoles: ['DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer', 'Cloud Engineer'],
    levels: [
      {
        name: 'Phase 1: Foundations',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'devops-linux', name: 'Linux Administration', description: 'Shell scripting, system administration, and process management.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'devops-git', name: 'Git & Version Control', description: 'Advanced Git, branching strategies, and collaboration workflows.', level: 'beginner', estimatedTime: '1 week' },
          { id: 'devops-networking', name: 'Networking', description: 'TCP/IP, DNS, HTTP, load balancing, and firewalls.', level: 'beginner', estimatedTime: '2 weeks' },
          { id: 'devops-programming', name: 'Scripting (Bash/Python)', description: 'Automation scripts, cron jobs, and infrastructure scripting.', level: 'beginner', estimatedTime: '3 weeks' }
        ]
      },
      {
        name: 'Phase 2: Containers & CI/CD',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'docker', name: 'Docker', description: 'Containers, images, Docker Compose, and containerization.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'kubernetes', name: 'Kubernetes', description: 'Orchestration, pods, deployments, services, and Helm.', level: 'intermediate', estimatedTime: '6 weeks' },
          { id: 'cicd', name: 'CI/CD Pipelines', description: 'GitHub Actions, Jenkins, GitLab CI, and pipeline design.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'artifact-mgmt', name: 'Artifact Management', description: 'Docker Hub, ECR, Nexus, and package registries.', level: 'intermediate', estimatedTime: '1 week' }
        ]
      },
      {
        name: 'Phase 3: Cloud & IaC',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'aws', name: 'Cloud (AWS/GCP/Azure)', description: 'EC2, S3, VPC, IAM, Lambda, and cloud services.', level: 'intermediate', estimatedTime: '6 weeks' },
          { id: 'terraform', name: 'Terraform (IaC)', description: 'Infrastructure as Code, provisioning, and state management.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'ansible', name: 'Ansible / Configuration Mgmt', description: 'Playbooks, roles, and configuration management automation.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 4: Monitoring & Security',
        order: 4,
        color: '#ef4444',
        skills: [
          { id: 'monitoring', name: 'Monitoring & Observability', description: 'Prometheus, Grafana, ELK Stack, and alerting.', level: 'advanced', estimatedTime: '3 weeks' },
          { id: 'devsecops', name: 'DevSecOps', description: 'Security scanning, SAST/DAST, secrets management.', level: 'advanced', estimatedTime: '2 weeks' },
          { id: 'sre', name: 'SRE Principles', description: 'SLOs, SLAs, error budgets, and reliability engineering.', level: 'advanced', estimatedTime: '2 weeks' }
        ]
      }
    ],
    projects: [
      { name: 'Dockerize an App', description: 'Containerize a web app with Docker Compose', difficulty: 'beginner', skills: ['Docker', 'Linux'] },
      { name: 'CI/CD Pipeline', description: 'Full pipeline with testing and deployment', difficulty: 'intermediate', skills: ['GitHub Actions', 'Docker', 'AWS'] },
      { name: 'Kubernetes Cluster', description: 'Deploy microservices on K8s with monitoring', difficulty: 'advanced', skills: ['Kubernetes', 'Helm', 'Prometheus'] }
    ],
    totalSkills: 15
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'design',
    description: 'Create beautiful, user-centered digital experiences through design thinking and visual craft.',
    icon: '🎨',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    estimatedDuration: '6-10 months',
    jobRoles: ['UI Designer', 'UX Designer', 'Product Designer', 'Interaction Designer'],
    levels: [
      {
        name: 'Phase 1: Design Fundamentals',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'design-principles', name: 'Design Principles', description: 'Typography, color theory, layout, hierarchy, and visual design.', level: 'beginner', estimatedTime: '2 weeks' },
          { id: 'ux-research', name: 'UX Research', description: 'User interviews, surveys, personas, and empathy mapping.', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'ia', name: 'Information Architecture', description: 'Sitemaps, user flows, card sorting, and content strategy.', level: 'beginner', estimatedTime: '2 weeks' },
          { id: 'wireframing', name: 'Wireframing', description: 'Low-fi wireframes, sketching, and layout planning.', level: 'beginner', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 2: Design Tools',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'figma', name: 'Figma', description: 'Components, auto-layout, prototyping, and design systems.', level: 'intermediate', estimatedTime: '4 weeks' },
          { id: 'prototyping', name: 'Interactive Prototyping', description: 'Clickable prototypes, micro-interactions, and user testing.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'design-systems', name: 'Design Systems', description: 'Component libraries, style guides, and consistency.', level: 'intermediate', estimatedTime: '3 weeks' }
        ]
      },
      {
        name: 'Phase 3: UX Process',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'usability-testing', name: 'Usability Testing', description: 'Test plans, user testing sessions, and iteration.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'accessibility', name: 'Accessibility (WCAG)', description: 'Inclusive design, WCAG guidelines, and screen readers.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'mobile-design', name: 'Mobile App Design', description: 'iOS/Android guidelines, touch targets, and gestures.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 4: Advanced & Portfolio',
        order: 4,
        color: '#8b5cf6',
        skills: [
          { id: 'motion-design', name: 'Motion & Animation', description: 'Micro-animations, transitions, and Lottie files.', level: 'advanced', estimatedTime: '3 weeks' },
          { id: 'ux-writing', name: 'UX Writing', description: 'Clear, concise copy for interfaces and error messages.', level: 'advanced', estimatedTime: '2 weeks' },
          { id: 'portfolio', name: 'Design Portfolio', description: 'Case studies, Behance/Dribbble, and presentation skills.', level: 'advanced', estimatedTime: '4 weeks' }
        ]
      }
    ],
    projects: [
      { name: 'App Redesign', description: 'Redesign a popular app with better UX', difficulty: 'beginner', skills: ['Figma', 'UX Research'] },
      { name: 'Design System', description: 'Create a complete component design system', difficulty: 'intermediate', skills: ['Figma', 'Components', 'Documentation'] },
      { name: 'End-to-End Product', description: 'Full product design from research to prototype', difficulty: 'advanced', skills: ['UX Research', 'Figma', 'Usability Testing'] }
    ],
    totalSkills: 14
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    category: 'mobile',
    description: 'Build cross-platform or native mobile apps for iOS and Android.',
    icon: '📱',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    estimatedDuration: '8-12 months',
    jobRoles: ['Mobile Developer', 'React Native Developer', 'Flutter Developer', 'iOS/Android Developer'],
    levels: [
      {
        name: 'Phase 1: Foundations',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'js-mobile', name: 'JavaScript/Dart Basics', description: 'Core language skills for React Native (JS) or Flutter (Dart).', level: 'beginner', estimatedTime: '3 weeks' },
          { id: 'mobile-concepts', name: 'Mobile App Concepts', description: 'App lifecycle, navigation, gestures, and platform differences.', level: 'beginner', estimatedTime: '1 week' },
          { id: 'ui-mobile', name: 'Mobile UI Design', description: 'Platform guidelines, responsive layouts, and touch interactions.', level: 'beginner', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 2: Framework',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'react-native', name: 'React Native / Flutter', description: 'Components, navigation, state management, and native modules.', level: 'intermediate', estimatedTime: '8 weeks' },
          { id: 'navigation-mobile', name: 'Navigation', description: 'Stack, tab, drawer navigation and deep linking.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'state-mobile', name: 'State Management', description: 'Redux, MobX, Zustand, or Riverpod for app state.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'api-mobile', name: 'API Integration', description: 'REST APIs, GraphQL, and real-time data with WebSockets.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 3: Native Features',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'device-features', name: 'Device Features', description: 'Camera, GPS, push notifications, biometrics, and sensors.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'offline-storage', name: 'Offline & Storage', description: 'AsyncStorage, SQLite, Realm, and offline-first apps.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'firebase-mobile', name: 'Firebase Integration', description: 'Auth, Firestore, Cloud Storage, and FCM.', level: 'intermediate', estimatedTime: '3 weeks' }
        ]
      },
      {
        name: 'Phase 4: Publishing & Advanced',
        order: 4,
        color: '#ef4444',
        skills: [
          { id: 'testing-mobile', name: 'Mobile Testing', description: 'Jest, Detox, and end-to-end testing for mobile apps.', level: 'advanced', estimatedTime: '2 weeks' },
          { id: 'performance-mobile', name: 'Performance Optimization', description: 'Memory management, animation optimization, and profiling.', level: 'advanced', estimatedTime: '2 weeks' },
          { id: 'publishing', name: 'App Store Publishing', description: 'App Store (iOS) and Google Play Store submission process.', level: 'advanced', estimatedTime: '1 week' }
        ]
      }
    ],
    projects: [
      { name: 'Weather App', description: 'Real-time weather app using a public API', difficulty: 'beginner', skills: ['React Native', 'API', 'Navigation'] },
      { name: 'Chat Application', description: 'Real-time messaging app with Firebase', difficulty: 'intermediate', skills: ['React Native', 'Firebase', 'Realtime DB'] },
      { name: 'E-Commerce App', description: 'Full mobile shopping app with payments', difficulty: 'advanced', skills: ['React Native', 'Redux', 'Stripe'] }
    ],
    totalSkills: 13
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    category: 'engineering',
    description: 'Master software design, architecture, algorithms, and professional engineering practices.',
    icon: '💻',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    estimatedDuration: '12-18 months',
    jobRoles: ['Software Engineer', 'Backend Engineer', 'Software Architect', 'Tech Lead'],
    levels: [
      {
        name: 'Phase 1: CS Fundamentals',
        order: 1,
        color: '#10b981',
        skills: [
          { id: 'dsa', name: 'Data Structures & Algorithms', description: 'Arrays, linked lists, trees, graphs, sorting, and searching.', level: 'beginner', estimatedTime: '8 weeks' },
          { id: 'se-programming', name: 'Core Programming', description: 'OOP, functional programming, and language mastery (Python/Java/C++).', level: 'beginner', estimatedTime: '6 weeks' },
          { id: 'os-concepts', name: 'Operating Systems', description: 'Processes, threads, memory management, and system calls.', level: 'intermediate', estimatedTime: '4 weeks' },
          { id: 'computer-networks', name: 'Computer Networks', description: 'Protocols, sockets, and network programming.', level: 'intermediate', estimatedTime: '3 weeks' }
        ]
      },
      {
        name: 'Phase 2: Design & Architecture',
        order: 2,
        color: '#f59e0b',
        skills: [
          { id: 'design-patterns', name: 'Design Patterns', description: 'Creational, structural, and behavioral patterns (Gang of Four).', level: 'intermediate', estimatedTime: '4 weeks' },
          { id: 'solid', name: 'SOLID Principles', description: 'Clean code, SOLID, DRY, KISS, and software principles.', level: 'intermediate', estimatedTime: '2 weeks' },
          { id: 'system-design', name: 'System Design', description: 'Scalable systems, distributed systems, and architecture patterns.', level: 'advanced', estimatedTime: '8 weeks' },
          { id: 'databases-se', name: 'Databases (SQL + NoSQL)', description: 'RDBMS, NoSQL, indexing, transactions, and query optimization.', level: 'intermediate', estimatedTime: '4 weeks' }
        ]
      },
      {
        name: 'Phase 3: Engineering Practices',
        order: 3,
        color: '#3b82f6',
        skills: [
          { id: 'testing-se', name: 'Testing & TDD', description: 'Unit tests, integration tests, TDD, and BDD.', level: 'intermediate', estimatedTime: '3 weeks' },
          { id: 'se-git', name: 'Git & Code Review', description: 'PR workflow, code review, and collaborative development.', level: 'intermediate', estimatedTime: '1 week' },
          { id: 'agile', name: 'Agile & Scrum', description: 'Sprint planning, stand-ups, retrospectives, and Kanban.', level: 'intermediate', estimatedTime: '1 week' },
          { id: 'api-design', name: 'API Design', description: 'REST, GraphQL, gRPC, and API versioning best practices.', level: 'intermediate', estimatedTime: '2 weeks' }
        ]
      },
      {
        name: 'Phase 4: Senior Level',
        order: 4,
        color: '#ef4444',
        skills: [
          { id: 'microservices', name: 'Microservices & Distributed Systems', description: 'Service mesh, event-driven architecture, and reliability.', level: 'advanced', estimatedTime: '6 weeks' },
          { id: 'performance-se', name: 'Performance Engineering', description: 'Profiling, benchmarking, and code optimization.', level: 'advanced', estimatedTime: '3 weeks' },
          { id: 'interview-prep', name: 'Interview Preparation', description: 'LeetCode, system design interviews, and behavioral prep.', level: 'advanced', estimatedTime: '8 weeks' }
        ]
      }
    ],
    projects: [
      { name: 'DSA Practice', description: 'Solve 100 LeetCode problems across difficulties', difficulty: 'beginner', skills: ['Algorithms', 'Data Structures'] },
      { name: 'RESTful API Service', description: 'Production-ready API with auth, tests, and docs', difficulty: 'intermediate', skills: ['Node.js', 'Testing', 'API Design'] },
      { name: 'Distributed System', description: 'Design and implement a message queue system', difficulty: 'advanced', skills: ['System Design', 'Microservices', 'Databases'] }
    ],
    totalSkills: 15
  }
];

module.exports = roadmapsData;
