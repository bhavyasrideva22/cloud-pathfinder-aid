import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults as Results } from "@/types/assessment";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Target,
  Download,
  RotateCcw
} from "lucide-react";

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

export default function AssessmentResults({ results, onRestart }: AssessmentResultsProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle className="h-8 w-8 text-success" />;
      case 'maybe': return <AlertTriangle className="h-8 w-8 text-warning" />;
      case 'no': return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes': return 'Strongly Recommended';
      case 'maybe': return 'Conditionally Recommended';
      case 'no': return 'Consider Alternatives';
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes': return 'bg-success text-success-foreground';
      case 'maybe': return 'bg-warning text-warning-foreground';
      case 'no': return 'bg-destructive text-destructive-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Your Assessment Results
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of your fit for hybrid cloud engineering
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {getRecommendationIcon()}
            </div>
            <CardTitle className="text-2xl mb-2">
              {getRecommendationText()}
            </CardTitle>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {results.overallScore}%
              </div>
              <Badge className={getRecommendationColor()}>
                Overall Confidence Score
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Core Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Psychological Fit</span>
                  <span className="text-sm text-primary">{results.psychometricScore}%</span>
                </div>
                <Progress value={results.psychometricScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Technical Knowledge</span>
                  <span className="text-sm text-primary">{results.technicalScore}%</span>
                </div>
                <Progress value={results.technicalScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Aptitude & Problem Solving</span>
                  <span className="text-sm text-primary">{results.aptitudeScore}%</span>
                </div>
                <Progress value={results.aptitudeScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WISCAR Analysis</CardTitle>
              <CardDescription>
                Comprehensive readiness framework
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(results.wiscarScores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium capitalize">
                      {key === 'realWorld' ? 'Real-World Fit' : key}
                    </span>
                    <span className="text-sm text-primary">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills Gap Analysis */}
        {results.skillGaps.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Skills Development Areas
              </CardTitle>
              <CardDescription>
                Focus areas to strengthen your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.skillGaps.map((gap, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{gap.skill}</h4>
                      <Badge variant={
                        gap.priority === 'high' ? 'destructive' : 
                        gap.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {gap.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Current: {gap.current}%</span>
                      <span>Target: {gap.required}%</span>
                      <span className="text-muted-foreground">
                        Gap: {gap.required - gap.current}%
                      </span>
                    </div>
                    <Progress 
                      value={(gap.current / gap.required) * 100} 
                      className="h-2 mt-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Related Career Paths</CardTitle>
            <CardDescription>
              Roles you could pursue with hybrid cloud engineering skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.careerPaths.map((path, index) => (
                <Badge key={index} variant="outline" className="justify-center py-2">
                  {path}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={onRestart} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Retake Assessment
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
}