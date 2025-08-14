import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    question: 'I enjoy understanding how systems connect and communicate across different environments.',
    construct: 'Interest'
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    question: 'I prefer structure and predictability over ambiguity in technology projects.',
    construct: 'Personality'
  },
  {
    id: 'psych_3',
    type: 'likert',
    category: 'psychometric',
    question: 'I learn best by experimenting with real tools instead of just studying theory.',
    construct: 'Learning Style'
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    question: 'I am excited by the idea of working across on-premise and cloud environments.',
    construct: 'Interest'
  },
  {
    id: 'psych_5',
    type: 'likert',
    category: 'psychometric',
    question: 'I enjoy troubleshooting complex infrastructure problems that require systematic thinking.',
    construct: 'Cognitive Preferences'
  },
  {
    id: 'psych_6',
    type: 'likert',
    category: 'psychometric',
    question: 'I find satisfaction in optimizing system performance and efficiency.',
    construct: 'Motivation'
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    question: 'What does VPC stand for in cloud computing?',
    options: [
      'Virtual Private Cloud',
      'Virtual Public Connection',
      'Virtualized Processing Center',
      'Virtual Protocol Configuration'
    ]
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    question: 'Which tool is primarily used for Infrastructure as Code?',
    options: [
      'Docker',
      'Terraform',
      'Jenkins',
      'Kubernetes'
    ]
  },
  {
    id: 'tech_3',
    type: 'multiple-choice',
    category: 'technical',
    question: 'In a hybrid cloud architecture, what is typically used to securely connect on-premise infrastructure to cloud services?',
    options: [
      'Public Internet',
      'VPN or Direct Connect',
      'SSH Tunnels',
      'FTP Connections'
    ]
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    category: 'technical',
    question: 'What is the primary purpose of containerization in cloud environments?',
    options: [
      'To increase hardware costs',
      'To provide application portability and scalability',
      'To slow down deployment processes',
      'To reduce security'
    ]
  },
  {
    id: 'tech_5',
    type: 'multiple-choice',
    category: 'technical',
    question: 'Which Azure service helps manage hybrid cloud environments?',
    options: [
      'Azure DevOps',
      'Azure Arc',
      'Azure Storage',
      'Azure Monitor'
    ]
  }
];

export const aptitudeQuestions: Question[] = [
  {
    id: 'apt_1',
    type: 'scenario',
    category: 'aptitude',
    question: 'Your company needs to migrate a legacy application to the cloud while maintaining some components on-premise due to compliance requirements. What would be your first step?',
    options: [
      'Immediately move everything to the cloud',
      'Conduct a thorough assessment of dependencies and compliance requirements',
      'Keep everything on-premise',
      'Choose the cheapest cloud provider'
    ]
  },
  {
    id: 'apt_2',
    type: 'scenario',
    category: 'aptitude',
    question: 'You notice that data transfer between your on-premise servers and cloud services is slower than expected. How would you approach this problem?',
    options: [
      'Ignore it as normal network behavior',
      'Analyze network topology, bandwidth, and consider dedicated connections',
      'Switch to a different cloud provider immediately',
      'Move all data to local storage'
    ]
  },
  {
    id: 'apt_3',
    type: 'multiple-choice',
    category: 'aptitude',
    question: 'When designing a hybrid cloud solution, which factor is MOST critical for security?',
    options: [
      'Cost optimization',
      'Network latency',
      'Identity and access management across environments',
      'Storage capacity'
    ]
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: 'wiscar_1',
    type: 'likert',
    category: 'wiscar',
    question: 'I would work in hybrid cloud engineering even if it required significant effort to get started.',
    construct: 'Will'
  },
  {
    id: 'wiscar_2',
    type: 'likert',
    category: 'wiscar',
    question: 'I frequently read about or watch content related to cloud technologies in my free time.',
    construct: 'Interest'
  },
  {
    id: 'wiscar_3',
    type: 'likert',
    category: 'wiscar',
    question: 'I have experience with networking, virtualization, or system administration.',
    construct: 'Skill'
  },
  {
    id: 'wiscar_4',
    type: 'likert',
    category: 'wiscar',
    question: 'I can quickly learn new technical concepts and apply them in practical situations.',
    construct: 'Cognitive'
  },
  {
    id: 'wiscar_5',
    type: 'likert',
    category: 'wiscar',
    question: 'When I encounter technical challenges, I persist until I find a solution.',
    construct: 'Ability'
  },
  {
    id: 'wiscar_6',
    type: 'likert',
    category: 'wiscar',
    question: 'The career prospects and day-to-day work of hybrid cloud engineering align with my goals.',
    construct: 'Real-World'
  }
];

export const correctAnswers: Record<string, number | string> = {
  tech_1: 'Virtual Private Cloud',
  tech_2: 'Terraform',
  tech_3: 'VPN or Direct Connect',
  tech_4: 'To provide application portability and scalability',
  tech_5: 'Azure Arc',
  apt_1: 'Conduct a thorough assessment of dependencies and compliance requirements',
  apt_2: 'Analyze network topology, bandwidth, and consider dedicated connections',
  apt_3: 'Identity and access management across environments'
};