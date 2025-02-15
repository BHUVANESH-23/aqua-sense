import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarTrigger,
} from "../Components/ui/sidebar";

import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import {  Ghost, ListChecks, Trophy, User } from "lucide-react";

const quizSections = [
  { id: 1, title: "Water Cycle", description: "Learn about the water cycle and its importance." },
  { id: 2, title: "Water Conservation", description: "Tips and tricks to conserve water at home." },
  { id: 3, title: "Sources of Water", description: "Understand different sources of water." },
  { id: 4, title: "Water Pollution", description: "Effects of water pollution and prevention methods." },
  { id: 5, title: "Rain Water Harvesting", description: "Methods and ideas to collect and harvest rain water." },
  { id: 6, title: "Ground Water Management", description: "Ways to preserve and conserve groundwater and use it." },
];

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
                <Link to="/profile" className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-md">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
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

          <main className="flex-1 p-6 bg-[#FBFBFB] overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Quiz Sections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizSections.map((section) => (
                <Link to={`/quiz/${section.id}`} key={section.id}> {/* Navigate to the respective quiz section */}
                  <Card className="cursor-pointer">
                    <CardHeader>
                      <CardTitle>{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{section.description}</p>
                      <Button className="mt-2" variant="outline">
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <footer className="absolute bottom-4 right-4">
              <SidebarTrigger />
            </footer>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}