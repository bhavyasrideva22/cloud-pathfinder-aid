export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'aptitude' | 'wiscar';
  question: string;
  options?: string[];
  construct?: string;
}

export interface Answer {
  questionId: string;
  value: number | string;
  score: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  aptitudeScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  nextSteps: string[];
  careerPaths: string[];
  skillGaps: SkillGap[];
}

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
  priority: 'high' | 'medium' | 'low';
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'aptitude' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  answers: Answer[];
  startTime?: Date;
  sectionStartTime?: Date;
}