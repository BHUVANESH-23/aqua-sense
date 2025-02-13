import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarTrigger,
} from "../Components/ui/sidebar"; // ✅ Ensure correct import

import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { LayoutDashboard, ListChecks, Trophy, User } from "lucide-react";

const quizSections = [
  { id: 1, title: "Water Cycle", description: "Learn about the water cycle and its importance." },
  { id: 2, title: "Water Conservation", description: "Tips and tricks to conserve water at home." },
  { id: 3, title: "Sources of Water", description: "Understand different sources of water." },
  { id: 4, title: "Water Pollution", description: "Effects of water pollution and prevention methods." },
];

export default function Quiz() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Track sidebar state

  return (
    <SidebarProvider >
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className={`w-64 ${sidebarOpen ? "block" : "hidden"} bg-[#C6E7FF]`}>
          <SidebarHeader className="bg-[#C6E7FF] ">
            <h2 className="text-2xl font-semibold pt-8 pl-6 ">Quiz Navigation</h2>
          </SidebarHeader>

          <SidebarContent className="bg-[#C6E7FF] h-full">
            <SidebarGroup>
              <Link to="/quiz-sections" className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-md">
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
          </SidebarContent>


        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#FBFBFB ]">
          <h1 className="text-2xl font-bold mb-4">Quiz Sections</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizSections.map((section) => (
              <Card key={section.id} className="cursor-pointer">
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
            ))}
          </div>
          <footer className="absolute bottom-4 right-4">
            <SidebarTrigger />
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
