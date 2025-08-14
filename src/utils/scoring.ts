import { Answer, AssessmentResults, SkillGap } from '@/types/assessment';
import { correctAnswers } from '@/data/questions';

export function calculateScores(answers: Answer[]): AssessmentResults {
  const psychometricAnswers = answers.filter(a => a.questionId.startsWith('psych_'));
  const technicalAnswers = answers.filter(a => a.questionId.startsWith('tech_'));
  const aptitudeAnswers = answers.filter(a => a.questionId.startsWith('apt_'));
  const wiscarAnswers = answers.filter(a => a.questionId.startsWith('wiscar_'));

  // Calculate psychometric score (0-100)
  const psychometricScore = calculateLikertScore(psychometricAnswers);

  // Calculate technical score (0-100)
  const technicalScore = calculateMultipleChoiceScore(technicalAnswers);

  // Calculate aptitude score (0-100)
  const aptitudeScore = calculateMultipleChoiceScore(aptitudeAnswers);

  // Calculate WISCAR scores
  const wiscarScores = calculateWiscarScores(wiscarAnswers);

  // Calculate overall score
  const overallScore = Math.round(
    (psychometricScore * 0.25) +
    (technicalScore * 0.3) +
    (aptitudeScore * 0.2) +
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.25)
  );

  // Determine recommendation
  let recommendation: 'yes' | 'no' | 'maybe';
  if (overallScore >= 80) recommendation = 'yes';
  else if (overallScore >= 60) recommendation = 'maybe';
  else recommendation = 'no';

  // Generate next steps and skill gaps
  const { nextSteps, skillGaps } = generateRecommendations(
    overallScore,
    technicalScore,
    aptitudeScore,
    wiscarScores
  );

  const careerPaths = [
    'Hybrid Cloud Engineer',
    'Cloud Infrastructure Engineer',
    'Cloud Platform Architect',
    'Systems Integration Specialist',
    'Infrastructure Automation Engineer'
  ];

  return {
    psychometricScore,
    technicalScore,
    aptitudeScore,
    wiscarScores,
    overallScore,
    recommendation,
    nextSteps,
    careerPaths,
    skillGaps
  };
}

function calculateLikertScore(answers: Answer[]): number {
  if (answers.length === 0) return 0;
  const total = answers.reduce((sum, answer) => sum + (answer.value as number), 0);
  return Math.round((total / (answers.length * 5)) * 100);
}

function calculateMultipleChoiceScore(answers: Answer[]): number {
  if (answers.length === 0) return 0;
  const correct = answers.filter(answer => 
    correctAnswers[answer.questionId] === answer.value
  ).length;
  return Math.round((correct / answers.length) * 100);
}

function calculateWiscarScores(answers: Answer[]): AssessmentResults['wiscarScores'] {
  const wiscarMap = {
    will: answers.filter(a => a.questionId === 'wiscar_1'),
    interest: answers.filter(a => a.questionId === 'wiscar_2'),
    skill: answers.filter(a => a.questionId === 'wiscar_3'),
    cognitive: answers.filter(a => a.questionId === 'wiscar_4'),
    ability: answers.filter(a => a.questionId === 'wiscar_5'),
    realWorld: answers.filter(a => a.questionId === 'wiscar_6')
  };

  return {
    will: wiscarMap.will.length > 0 ? Math.round(((wiscarMap.will[0].value as number) / 5) * 100) : 0,
    interest: wiscarMap.interest.length > 0 ? Math.round(((wiscarMap.interest[0].value as number) / 5) * 100) : 0,
    skill: wiscarMap.skill.length > 0 ? Math.round(((wiscarMap.skill[0].value as number) / 5) * 100) : 0,
    cognitive: wiscarMap.cognitive.length > 0 ? Math.round(((wiscarMap.cognitive[0].value as number) / 5) * 100) : 0,
    ability: wiscarMap.ability.length > 0 ? Math.round(((wiscarMap.ability[0].value as number) / 5) * 100) : 0,
    realWorld: wiscarMap.realWorld.length > 0 ? Math.round(((wiscarMap.realWorld[0].value as number) / 5) * 100) : 0
  };
}

function generateRecommendations(
  overallScore: number,
  technicalScore: number,
  aptitudeScore: number,
  wiscarScores: AssessmentResults['wiscarScores']
): { nextSteps: string[]; skillGaps: SkillGap[] } {
  const nextSteps: string[] = [];
  const skillGaps: SkillGap[] = [];

  if (overallScore >= 80) {
    nextSteps.push(
      'Start with advanced hybrid cloud courses on Pluralsight or Coursera',
      'Set up a home lab with VMware and AWS/Azure',
      'Pursue Azure Arc or Google Anthos certification',
      'Join hybrid cloud communities and forums'
    );
  } else if (overallScore >= 60) {
    nextSteps.push(
      'Strengthen foundational networking and Linux skills',
      'Complete basic cloud certifications (AWS Cloud Practitioner, Azure Fundamentals)',
      'Practice Infrastructure as Code with Terraform',
      'Build projects combining on-premise and cloud components'
    );
  } else {
    nextSteps.push(
      'Focus on fundamental IT skills first',
      'Learn basic networking concepts (TCP/IP, subnets, DNS)',
      'Get comfortable with Linux command line',
      'Consider starting with general cloud computing before hybrid specialization'
    );
  }

  // Generate skill gaps based on scores
  if (technicalScore < 70) {
    skillGaps.push({
      skill: 'Cloud Platform Knowledge',
      current: technicalScore,
      required: 80,
      priority: 'high'
    });
  }

  if (wiscarScores.skill < 60) {
    skillGaps.push({
      skill: 'Networking & Infrastructure',
      current: wiscarScores.skill,
      required: 75,
      priority: 'high'
    });
  }

  if (aptitudeScore < 65) {
    skillGaps.push({
      skill: 'Systems Thinking',
      current: aptitudeScore,
      required: 75,
      priority: 'medium'
    });
  }

  return { nextSteps, skillGaps };
}