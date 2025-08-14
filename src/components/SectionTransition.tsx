import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

interface SectionTransitionProps {
  completedSection: string;
  nextSection: string;
  description: string;
  onContinue: () => void;
  estimatedTime?: string;
}

export default function SectionTransition({
  completedSection,
  nextSection,
  description,
  onContinue,
  estimatedTime = "5-8 min"
}: SectionTransitionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          
          <div>
            <CardTitle className="text-xl mb-2">
              {completedSection} Complete!
            </CardTitle>
            <CardDescription>
              Great progress! Let's move on to the next section.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">
              Next: {nextSection}
            </h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
            <Badge variant="outline" className="mx-auto">
              Estimated time: {estimatedTime}
            </Badge>
          </div>
          
          <Button 
            onClick={onContinue}
            variant="hero"
            className="w-full flex items-center gap-2"
          >
            Continue Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}