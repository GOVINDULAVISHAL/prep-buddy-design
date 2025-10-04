import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  LogOut, 
  Play,
  Settings,
  User,
  Mountain,
  Droplets,
  Flame,
  Wind,
  Award,
  Star,
  TrendingUp,
  Brain,
  Zap
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ProfileModal } from "@/components/ProfileModal";
import { QuizModal } from "@/components/QuizModal";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // All useState hooks must be called before any conditional returns
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

  const fetchUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      setUserProfile(data);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Redirect to login if not authenticated
  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-animated relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-secondary/20 to-accent/30 opacity-50"></div>
        <div className="animate-pulse-glow rounded-full h-32 w-32 border-4 border-primary bg-primary/20 shadow-2xl relative z-10"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Header */}
      <div className="gradient-hero p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-animated opacity-30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* User Profile Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Avatar 
                  className="h-16 w-16 cursor-pointer transition-all duration-200 group-hover:ring-4 group-hover:ring-primary/20" 
                  onClick={() => setShowProfileModal(true)}
                >
                  <AvatarImage src={userProfile?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-lg">
                    {userProfile?.full_name ? getInitials(userProfile.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Settings className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Welcome, {userProfile?.full_name ? userProfile.full_name.split(' ')[0] : 'Student'}!
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white border-white/30"
                  >
                    Level {userProfile?.level || 1}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="border-white/50 text-white"
                  >
                    Intermediate
                  </Badge>
                </div>
              </div>
            </div>

            <Button 
              onClick={signOut}
              variant="outline"
              className="border-white/90 bg-white/10 text-white hover:bg-white hover:text-primary font-semibold shadow-lg backdrop-blur-sm transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="border border-border/50 rounded-2xl hover-glow card-glow" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardContent className="p-6 text-center">
                <Avatar 
                  className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/20 cursor-pointer"
                  onClick={() => setShowProfileModal(true)}
                >
                  <AvatarImage src={userProfile?.avatar_url} />
                  <AvatarFallback className="gradient-sunset text-white text-lg">
                    {userProfile?.full_name ? getInitials(userProfile.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg text-foreground">{userProfile?.full_name || 'User'}</h3>
                <Badge variant="secondary" className="mb-4">
                  Intermediate
                </Badge>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Score</span>
                    <span className="font-bold text-primary text-gradient">{userProfile?.score || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Streak</span>
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4 text-accent animate-pulse-glow" />
                      <span className="font-bold text-accent">{userProfile?.streak || 0} days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Badges</span>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-tertiary" />
                      <span className="font-bold text-tertiary">{userProfile?.badges?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-border/50 rounded-2xl hover-glow card-glow-secondary" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-secondary animate-pulse" />
                  <span className="text-gradient">This Week</span>
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
                  <span className="font-bold text-primary text-gradient">87%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Daily Quiz Section */}
            <Card className="border border-border/50 gradient-ocean/5 rounded-2xl hover-glow card-glow-accent animate-fade-in" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-accent animate-pulse" />
                  <span className="text-rainbow">Today's Safety Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Emergency Preparedness Quiz</h3>
                    <p className="text-muted-foreground mb-4">
                      Test your knowledge about disaster preparedness and safety procedures. Complete today's quiz to maintain your streak!
                    </p>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-tertiary/20 text-tertiary border-tertiary/30 hover-glow">
                        5 Questions
                      </Badge>
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30 hover-glow">
                        +50 Points
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    className="gradient-sunset hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-glow"
                    onClick={() => setShowQuizModal(true)}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Modules */}
            <Card className="border border-border/50 rounded-2xl hover-glow" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-secondary animate-pulse" />
                  <span className="text-gradient">Learning Modules</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                      <Card key={module.id} className="border border-border/50 rounded-xl cursor-pointer transition-all duration-200 hover:border-border hover:shadow-md hover-glow animate-scale-in">
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
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userProfile={userProfile}
        onProfileUpdate={fetchUserProfile}
      />
      
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
      />
    </div>
  );
};

export default Dashboard;