import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Question, Answer } from "@/types/assessment";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  sectionName: string;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious?: () => void;
  canGoBack?: boolean;
  isLastQuestion?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack = false,
  isLastQuestion = false
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    
    let score = 0;
    let numericValue: number | string = value;

    if (question.type === 'likert') {
      numericValue = parseInt(value);
      score = numericValue;
    } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
      score = 1; // Will be calculated properly in scoring utils
    }

    onAnswer({
      questionId: question.id,
      value: numericValue,
      score
    });
  };

  const handleNext = () => {
    if (selectedValue) {
      onNext();
    }
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl assessment-fade-in">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{sectionName}</span>
            <span className="text-sm text-muted-foreground">
              {questionNumber} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
            {question.construct && (
              <CardDescription>
                Measuring: {question.construct}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {question.type === 'likert' && (
              <div className="space-y-4">
                <RadioGroup value={selectedValue} onValueChange={handleSelection}>
                  {[
                    { value: "1", label: "Strongly Disagree" },
                    { value: "2", label: "Disagree" },
                    { value: "3", label: "Neutral" },
                    { value: "4", label: "Agree" },
                    { value: "5", label: "Strongly Agree" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label 
                        htmlFor={option.value} 
                        className="cursor-pointer flex-1 py-2"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {(question.type === 'multiple-choice' || question.type === 'scenario') && question.options && (
              <div className="space-y-3">
                <RadioGroup value={selectedValue} onValueChange={handleSelection}>
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <RadioGroupItem 
                        value={option} 
                        id={`option-${index}`}
                        className="mt-1"
                      />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="cursor-pointer flex-1 py-2 leading-relaxed"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={onPrevious}
                disabled={!canGoBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!selectedValue}
                variant="default"
                className="flex items-center gap-2"
              >
                {isLastQuestion ? "Complete Section" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}