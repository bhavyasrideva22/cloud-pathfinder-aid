import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, Award } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export default function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <Badge variant="outline" className="mx-auto">
              Professional Assessment
            </Badge>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Should I Learn Hybrid Cloud Engineering?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover if hybrid cloud engineering aligns with your skills, interests, and career goals through our comprehensive assessment.
            </p>
          </div>

          {/* Assessment Overview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <Clock className="h-8 w-8 text-primary mx-auto" />
                <CardTitle className="text-lg">25-30 Minutes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Comprehensive evaluation across multiple dimensions</p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader className="pb-3">
                <Users className="h-8 w-8 text-accent mx-auto" />
                <CardTitle className="text-lg">4 Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Psychometric, Technical, Aptitude, and WISCAR analysis</p>
              </CardContent>
            </Card>

            <Card className="border-success/20">
              <CardHeader className="pb-3">
                <TrendingUp className="h-8 w-8 text-success mx-auto" />
                <CardTitle className="text-lg">Personalized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Tailored recommendations and learning paths</p>
              </CardContent>
            </Card>

            <Card className="border-warning/20">
              <CardHeader className="pb-3">
                <Award className="h-8 w-8 text-warning mx-auto" />
                <CardTitle className="text-lg">Career Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Skills gap analysis and career mapping</p>
              </CardContent>
            </Card>
          </div>

          {/* What is Hybrid Cloud Engineering */}
          <Card className="text-left max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">What is Hybrid Cloud Engineering?</CardTitle>
              <CardDescription>
                Understanding the role and its requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Hybrid Cloud Engineers work at the intersection of public cloud services (AWS, Azure, GCP) and on-premise infrastructure. 
                They design, deploy, integrate, and manage seamless hybrid environments using cutting-edge tools and technologies.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Key Responsibilities</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Design hybrid cloud architectures</li>
                    <li>• Manage cross-environment connectivity</li>
                    <li>• Implement security and compliance</li>
                    <li>• Optimize performance and costs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Essential Tools</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Terraform, Ansible</li>
                    <li>• Kubernetes, Docker</li>
                    <li>• Azure Arc, Google Anthos</li>
                    <li>• VMware vSphere</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="space-y-6">
            <Button 
              onClick={onStart}
              variant="hero"
              size="lg"
              className="text-lg px-12 py-6 h-auto"
            >
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground">
              Get personalized insights into your fit for hybrid cloud engineering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}