import { useState, useEffect } from "react";
import { AssessmentState, Answer } from "@/types/assessment";
import { 
  psychometricQuestions, 
  technicalQuestions, 
  aptitudeQuestions, 
  wiscarQuestions 
} from "@/data/questions";
import { calculateScores } from "@/utils/scoring";
import AssessmentIntro from "./AssessmentIntro";
import QuestionCard from "./QuestionCard";
import SectionTransition from "./SectionTransition";
import AssessmentResults from "./AssessmentResults";

export default function Assessment() {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'intro',
    currentQuestionIndex: 0,
    answers: []
  });

  const allQuestions = {
    psychometric: psychometricQuestions,
    technical: technicalQuestions,
    aptitude: aptitudeQuestions,
    wiscar: wiscarQuestions
  };

  const getCurrentQuestions = () => {
    switch (state.currentSection) {
      case 'psychometric': return allQuestions.psychometric;
      case 'technical': return allQuestions.technical;
      case 'aptitude': return allQuestions.aptitude;
      case 'wiscar': return allQuestions.wiscar;
      default: return [];
    }
  };

  const getSectionName = () => {
    switch (state.currentSection) {
      case 'psychometric': return 'Psychological Assessment';
      case 'technical': return 'Technical Knowledge';
      case 'aptitude': return 'Aptitude & Problem Solving';
      case 'wiscar': return 'WISCAR Framework';
      default: return '';
    }
  };

  const handleStart = () => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      currentQuestionIndex: 0,
      startTime: new Date(),
      sectionStartTime: new Date()
    }));
  };

  const handleAnswer = (answer: Answer) => {
    setState(prev => ({
      ...prev,
      answers: [...prev.answers.filter(a => a.questionId !== answer.questionId), answer]
    }));
  };

  const handleNext = () => {
    const currentQuestions = getCurrentQuestions();
    
    if (state.currentQuestionIndex < currentQuestions.length - 1) {
      // Move to next question in current section
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Move to next section or show transition
      moveToNextSection();
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const moveToNextSection = () => {
    const sectionOrder: AssessmentState['currentSection'][] = [
      'psychometric', 'technical', 'aptitude', 'wiscar', 'results'
    ];
    
    const currentIndex = sectionOrder.indexOf(state.currentSection);
    const nextSection = sectionOrder[currentIndex + 1];
    
    if (nextSection === 'results') {
      setState(prev => ({
        ...prev,
        currentSection: 'results',
        currentQuestionIndex: 0
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentSection: nextSection,
        currentQuestionIndex: 0,
        sectionStartTime: new Date()
      }));
    }
  };

  const handleRestart = () => {
    setState({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      answers: []
    });
  };

  const getSectionTransitionInfo = (section: AssessmentState['currentSection']) => {
    switch (section) {
      case 'technical':
        return {
          nextSection: 'Technical Knowledge',
          description: 'Test your understanding of cloud computing concepts, networking, and hybrid infrastructure.',
          estimatedTime: '8-10 min'
        };
      case 'aptitude':
        return {
          nextSection: 'Aptitude & Problem Solving',
          description: 'Evaluate your analytical thinking and approach to real-world scenarios.',
          estimatedTime: '5-7 min'
        };
      case 'wiscar':
        return {
          nextSection: 'WISCAR Framework',
          description: 'Comprehensive assessment of your Will, Interest, Skill, Cognitive readiness, Ability, and Real-world alignment.',
          estimatedTime: '5-6 min'
        };
      default:
        return {
          nextSection: 'Next Section',
          description: 'Continue with the assessment.',
          estimatedTime: '5 min'
        };
    }
  };

  // Render intro
  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStart={handleStart} />;
  }

  // Render results
  if (state.currentSection === 'results') {
    const results = calculateScores(state.answers);
    return <AssessmentResults results={results} onRestart={handleRestart} />;
  }

  // Check if we should show transition
  const currentQuestions = getCurrentQuestions();
  const isLastQuestionInSection = state.currentQuestionIndex >= currentQuestions.length;
  
  if (isLastQuestionInSection) {
    const completedSectionName = getSectionName();
    const transitionInfo = getSectionTransitionInfo(state.currentSection);
    
    return (
      <SectionTransition
        completedSection={completedSectionName}
        nextSection={transitionInfo.nextSection}
        description={transitionInfo.description}
        estimatedTime={transitionInfo.estimatedTime}
        onContinue={moveToNextSection}
      />
    );
  }

  // Render question
  const currentQuestion = currentQuestions[state.currentQuestionIndex];
  
  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={state.currentQuestionIndex + 1}
      totalQuestions={currentQuestions.length}
      sectionName={getSectionName()}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoBack={state.currentQuestionIndex > 0}
      isLastQuestion={state.currentQuestionIndex === currentQuestions.length - 1}
    />
  );
}