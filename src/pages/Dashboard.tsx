import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Target, 
  Users, 
  Brain, 
  Zap, 
  Mountain, 
  Droplets, 
  Flame, 
  Wind,
  Award,
  Star,
  TrendingUp,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { signOut } = useAuth();
  const [user] = useState({
    name: "Alex Johnson",
    avatar: "",
    score: 2450,
    rank: 5,
    badges: 12,
    streak: 7,
    level: "Intermediate"
  });

  const [modules] = useState([
    {
      id: 1,
      name: "Earthquake",
      icon: Mountain,
      progress: 85,
      color: "bg-gradient-to-r from-primary to-primary-light",
      completed: 17,
      total: 20
    },
    {
      id: 2,
      name: "Flood",
      icon: Droplets,
      progress: 60,
      color: "bg-gradient-to-r from-secondary to-secondary-light",
      completed: 12,
      total: 20
    },
    {
      id: 3,
      name: "Fire",
      icon: Flame,
      progress: 40,
      color: "bg-gradient-to-r from-accent to-accent-light",
      completed: 8,
      total: 20
    },
    {
      id: 4,
      name: "Cyclone",
      icon: Wind,
      progress: 25,
      color: "bg-gradient-to-r from-warning to-warning",
      completed: 5,
      total: 20
    }
  ]);

  const [leaderboard] = useState([
    { id: 1, name: "Sarah Chen", score: 3200, avatar: "" },
    { id: 2, name: "Marcus Rodriguez", score: 2980, avatar: "" },
    { id: 3, name: "Emma Thompson", score: 2750, avatar: "" },
    { id: 4, name: "David Kim", score: 2650, avatar: "" },
    { id: 5, name: "Alex Johnson", score: 2450, avatar: "", isCurrentUser: true }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-white/80">Ready to continue your safety journey?</p>
          </div>
          <Button 
            onClick={signOut}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="border border-border/50 rounded-2xl" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
                <Badge variant="secondary" className="mb-4">
                  {user.level}
                </Badge>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Score</span>
                    <span className="font-bold text-primary">{user.score.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Rank</span>
                    <Badge variant="outline" className="font-bold">
                      #{user.rank}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Badges</span>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-accent" />
                      <span className="font-bold">{user.badges}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Streak</span>
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="font-bold">{user.streak} days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-border/50 rounded-2xl" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quizzes Taken</span>
                  <span className="font-bold text-foreground">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Points Earned</span>
                  <span className="font-bold text-success">+380</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="font-bold text-primary">87%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Daily Quiz Section */}
            <Card className="border border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span>Today's Safety Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Earthquake Emergency Procedures</h3>
                    <p className="text-muted-foreground mb-4">
                      Test your knowledge about what to do during an earthquake. Complete today's quiz to maintain your streak!
                    </p>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        5 Questions
                      </Badge>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        +50 Points
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-md">
                    Start Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Modules */}
            <Card className="border border-border/50 rounded-2xl" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Target className="h-6 w-6 text-secondary" />
                  <span>Learning Modules</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                      <Card key={module.id} className="border border-border/50 rounded-xl cursor-pointer transition-all duration-200 hover:border-border" style={{ boxShadow: 'var(--shadow-sm)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`p-2 rounded-lg ${module.color}`}>
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{module.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {module.completed}/{module.total} lessons
                              </p>
                            </div>
                          </div>
                          <Progress value={module.progress} className="mb-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-muted-foreground">
                              {module.progress}% complete
                            </span>
                            <Button variant="outline" size="sm">
                              Continue
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border border-border/50 rounded-2xl" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-accent" />
                  <span>Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((student, index) => (
                    <div 
                      key={student.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        student.isCurrentUser 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8">
                        {index < 3 ? (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                            'bg-gradient-to-r from-yellow-600 to-yellow-700'
                          }`}>
                            {index + 1}
                          </div>
                        ) : (
                          <span className="text-muted-foreground font-medium">#{index + 1}</span>
                        )}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="text-xs">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className={`font-medium ${student.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                          {student.name} {student.isCurrentUser && '(You)'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{student.score.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}