import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What should you do first during an earthquake?",
    options: [
      "Run outside immediately",
      "Drop, Cover, and Hold On",
      "Stand in a doorway",
      "Hide under a table only"
    ],
    correctAnswer: 1,
    explanation: "Drop to your hands and knees, take cover under a sturdy table, and hold on until shaking stops."
  },
  {
    id: 2,
    question: "How much water should you store per person per day for emergency preparedness?",
    options: [
      "1 liter",
      "2 liters", 
      "4 liters",
      "6 liters"
    ],
    correctAnswer: 2,
    explanation: "Store at least 4 liters (1 gallon) of water per person per day for drinking, cooking, and hygiene."
  },
  {
    id: 3,
    question: "What is the emergency number in most countries?",
    options: [
      "911",
      "999",
      "112",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Different countries use different emergency numbers: 911 (US), 999 (UK), 112 (EU), but 112 works in many places."
  },
  {
    id: 4,
    question: "Which item is most important in a first aid kit?",
    options: [
      "Bandages",
      "Antiseptic wipes",
      "Emergency contact information",
      "Pain relievers"
    ],
    correctAnswer: 2,
    explanation: "While all items are important, emergency contact information is crucial for getting professional help quickly."
  },
  {
    id: 5,
    question: "How often should you replace the batteries in your smoke detector?",
    options: [
      "Every month",
      "Every 6 months",
      "Every year",
      "Every 2 years"
    ],
    correctAnswer: 2,
    explanation: "Smoke detector batteries should be replaced at least once a year, or when the low-battery warning chirps."
  }
];

export const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetQuiz();
    }
  }, [isOpen]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const correct = selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const percentage = (correct / quizQuestions.length) * 100;
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${correct}/${quizQuestions.length} (${percentage.toFixed(0)}%)`,
    });
  };

  const getScoreColor = () => {
    const correct = selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = (correct / quizQuestions.length) * 100;
    
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResults) {
    const correctAnswers = selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Quiz Results
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor()}`}>
                {correctAnswers}/{quizQuestions.length}
              </div>
              <p className="text-muted-foreground">
                {((correctAnswers / quizQuestions.length) * 100).toFixed(0)}% Correct
              </p>
            </div>

            <div className="space-y-4">
              {quizQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">{question.question}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Your answer: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 mb-2">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-sm text-blue-600">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button onClick={resetQuiz} variant="outline" className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              <Button onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Safety Knowledge Quiz</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};