import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarTrigger,
} from "../Components/ui/sidebar";
import ConfettiExplosion from "react-confetti-explosion";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Ghost, ListChecks, Trophy, User } from "lucide-react";

const quizSections = [
  { id: 1, title: "Water Cycle", description: "Learn about the water cycle and its importance.", sectionId: "watercycle" },
  { id: 2, title: "Water Conservation", description: "Tips and tricks to conserve water at home.", sectionId: "waterconservation" },
  { id: 3, title: "Sources of Water", description: "Understand different sources of water.", sectionId: "watersources" },
  { id: 4, title: "Water Pollution", description: "Effects of water pollution and prevention methods.", sectionId: "waterpollution" },
  { id: 5, title: "Rain Water Harvesting", description: "Methods and ideas to collect and harvest rain water.", sectionId: "waterharvest" },
  { id: 6, title: "Ground Water Management", description: "Ways to preserve and conserve groundwater .", sectionId: "groundwater" },
];

const finalQuiz = {
  id: 7,
  title: "Final Challenge",
  description: "Test your ultimate water knowledge!",
  sectionId: "finalquiz",
};


export default function Quiz() {
  const sidebarRef = useRef(null);
  const gameRef = useRef(null);
  const [position, setPosition] = useState({ top: 200, left: 20 });
  const [isExploding, setIsExploding] = useState(false);
  const [rightExplosion, setRightExplosion] = useState(false);

  useEffect(() => {
    updateGamePosition();
  }, []);

  useEffect(() => {
    if (isExploding) {
      const timer = setTimeout(() => {
        setIsExploding(false);
        setRightExplosion(false);
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [isExploding]);


  const allCompleted = quizSections.every(
    (section) => localStorage.getItem(`quizCompleted_${section.sectionId}`) === "true"
  );

  const updateGamePosition = () => {
    if (!sidebarRef.current || !gameRef.current) return;

    const sidebar = sidebarRef.current.getBoundingClientRect();
    const gameSize = gameRef.current.getBoundingClientRect();

    const minY = 200;
    const maxY = Math.min(window.innerHeight - gameSize.height - 10, sidebar.bottom - gameSize.height - 10);
    const maxX = sidebar.width - gameSize.width - 10;

    const newX = Math.random() * maxX;
    const newY = minY + Math.random() * (maxY - minY);

    setPosition({ top: newY, left: newX });
  };

  const handleButtonClick = () => {
    setIsExploding(true);
    setRightExplosion(true);
  };

  return (
    <>
      {isExploding && (
        <ConfettiExplosion
          particleCount={400}
          colors={["#FFC700", "#FF0000", "#2E3191", "#41BBC7"]}
          width={2000}
          zIndex={100}
          force={0.9}
          duration={3000}
        />
      )}

      {rightExplosion && (
        <div className="absolute top-1/2 right-10">
          <ConfettiExplosion
            particleCount={400}
            colors={["#FFC700", "#FF0000", "#2E3191", "#41BBC7"]}
            width={2000}
            zIndex={100}
            force={0.9}
            duration={3000}
          />
        </div>
      )}

      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden relative">
          <Sidebar ref={sidebarRef} className="w-64 bg-[#C6E7FF] flex flex-col h-screen">
            <SidebarHeader className="bg-[#C6E7FF]">
              <h2 className="text-2xl font-semibold pt-8 pl-6">Quiz Navigation</h2>
            </SidebarHeader>
            <SidebarContent className="bg-[#C6E7FF] flex-1 overflow-hidden">
              <SidebarGroup className="z-30">
                <Link to="/" className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-md">
                  <ListChecks className="w-5 h-5" />
                  <span>Quiz Sections</span>
                </Link>
                <Link to="/leaderboard" className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-md">
                  <Trophy className="w-5 h-5" />
                  <span>Leaderboard</span>
                </Link>

              </SidebarGroup>

              <div className="h-full z-0">
                <div
                  ref={gameRef}
                  className="absolute w-40 h-40 border border-transparent rounded-lg transition-all duration-300 bg-transparent"
                  style={{ top: `${position.top}px`, left: `${position.left}px` }}
                  onMouseEnter={updateGamePosition}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Button
                      className="absolute transition-all duration-200"
                      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                      onMouseEnter={updateGamePosition}
                      onClick={handleButtonClick}
                      tabIndex="-1"
                    >
                      Catch Me <Ghost />
                    </Button>
                  </div>
                </div>
              </div>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 p-6 bg-gradient-to-r from-green-100 to-blue-200 overflow-auto rounded-lg shadow-xl border-4 border-green-100 ">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-pink-700 drop-shadow-lg">🎉 Quiz Sections 🎉</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizSections.map((section) => {
                const sectionId = section.sectionId;
                const isCompleted = localStorage.getItem(`quizCompleted_${sectionId}`) === "true";

                return (
                  <Link
                    to={isCompleted ? "#" : `/quiz/${section.id}`}
                    key={section.id}
                    className={isCompleted ? "pointer-events-none cursor-not-allowed" : ""}
                  >
                    <Card
                      className={`bg-white rounded-xl shadow-lg border-4 border-yellow-100 transition-all duration-300 
              ${isCompleted ? "opacity-70 cursor-not-allowed" : "cursor-pointer transform hover:rotate-3 hover:scale-110 hover:bg-yellow-200"}`}
                    >
                      <CardHeader className="text-center text-yellow-800 font-bold text-lg">
                        <CardTitle>{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-gray-700 text-center font-medium">
                        <p>{section.description}</p>
                        {!isCompleted && (
                          <Button className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-md ">
                            Start Quiz
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}

              {allCompleted && (
                <div className="absolute bottom-10 left-[800px] transform -translate-x-1/2 animate-bounce">
                  
                  <Link to={`/quiz/${finalQuiz.id}`} key={finalQuiz.id}>
                    <Card className="relative bg-gradient-to-br from-yellow-300 to-green-300 rounded-3xl shadow-lg border-4 border-green-500 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:shadow-2xl hover:border-green-600 animate-float">

                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition duration-300 rounded-3xl"></div>

                      <CardHeader className="text-center text-green-900 font-extrabold text-2xl p-4">
                        <CardTitle className="relative">
                          {finalQuiz.title}
                          {/* Sparkle Effect */}
                          <span className="absolute top-[-10px] right-[-10px] animate-ping text-yellow-500">✨</span>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="text-gray-900 text-center font-medium text-lg p-5">
                        <p>{finalQuiz.description}</p>
                        <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md animate-pulse hover:scale-105 hover:shadow-xl">
                          🚀 Start Final Quiz 🚀
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )}

            </div>

            <footer className="bg-transparent hover:bg-transparent absolute bottom-4 right-4 animate-bounce">
              <SidebarTrigger className="hover:bg-transparent" />
            </footer>
          </main>

        </div>
      </SidebarProvider>
    </>
  );
}