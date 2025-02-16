import React, { useState, useEffect } from "react";
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarGroup, SidebarTrigger } from "../Components/ui/sidebar";
import { Button } from "../Components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { useQuiz } from "../Context/QuizContext";
import { useNavigate } from "react-router-dom";


const questions = [
  { id: 1, question: "Which of the following is the largest source of freshwater on Earth?", options: ["Rivers", "Lakes", "Glaciers and Ice Caps", "Groundwater"], answer: "Glaciers and Ice Caps" },
  { id: 2, question: "What is the main source of freshwater for human consumption?", options: ["Oceans", "Groundwater", "Lakes", "Rainwater"], answer: "Groundwater" },
  { id: 3, question: "Which of the following is NOT a natural source of water?", options: ["Lakes", "Dams", "Rivers", "Glaciers"], answer: "Dams" },
  { id: 4, question: "What percentage of Earth's water is freshwater?", options: ["3%", "10%", "25%", "50%"], answer: "3%" },
  { id: 5, question: "Which water source contains the highest amount of salt?", options: ["Oceans", "Lakes", "Rivers", "Groundwater"], answer: "Oceans" },
  { id: 6, question: "Which of the following is an artificial source of water?", options: ["Ponds", "Reservoirs", "Springs", "Streams"], answer: "Reservoirs" },
  { id: 7, question: "Which water source is formed when water collects in a hollow area on land?", options: ["Rivers", "Lakes", "Groundwater", "Glaciers"], answer: "Lakes" },
  { id: 8, question: "Which of the following sources of water is renewable?", options: ["Groundwater", "Oceans", "Rainwater", "All of the above"], answer: "All of the above" },
  { id: 9, question: "Which human activity affects water sources the most?", options: ["Fishing", "Deforestation", "Cycling", "Solar energy usage"], answer: "Deforestation" },
  { id: 10, question: "Which water source plays a major role in the water cycle?", options: ["Lakes", "Oceans", "Springs", "Dams"], answer: "Oceans" }
];


export default function WaterSources() {

  const sectionId = "watersources";  // 🔹 Unique identifier for this quiz section
  
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const usermail = user?.email || "Unknown User";

  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const {
    score, setScore,
    currentQuestion, setCurrentQuestion,
    answeredQuestions, setAnsweredQuestions,
    selectedOption, setSelectedOption,
  } = useQuiz();

  // Ensure `currentQuestion` and `answeredQuestions` exist for this section
  const sectionCurrentQuestion = currentQuestion[sectionId] ?? 0;
  const sectionAnsweredQuestions = answeredQuestions[sectionId] || [];

  // Persist state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
    localStorage.setItem("score", JSON.stringify(score));
  }, [currentQuestion, answeredQuestions, score]);

  // Function to confirm answer and update score
  const handleConfirmAnswer = () => {
    if (selectedOption === questions[sectionCurrentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setIsAnswerConfirmed(true);
  };

  // Function to move to the next question

  const handleNextQuestion = () => {
    // Store the answered question
    setAnsweredQuestions((prev) => ({
      ...prev,
      [sectionId]: [...sectionAnsweredQuestions, sectionCurrentQuestion],
    }));
  
    setIsAnswerConfirmed(false);
    setSelectedOption(null);
  
    if (sectionCurrentQuestion + 1 < questions.length) {
      // Move to the next question
      setCurrentQuestion((prev) => ({
        ...prev,
        [sectionId]: sectionCurrentQuestion + 1,
      }));
    } else {
      // 🔹 Mark quiz as completed
      setCurrentQuestion((prev) => ({
        ...prev,
        [sectionId]: questions.length, // Prevents further questions
      }));
  
      // 🔹 Store completion in localStorage
      localStorage.setItem(`quizCompleted_${sectionId}`, "true");
  
      setTimeout(() => {
        updateUserScore(score);
        navigate("/");  // Redirect to the main page or results page
      }, 5000);
    }
  };
  

  // 🌊 Water Ripple Effect
  const handleMouseMove = (e) => {
    const newRipple = {
      id: Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  const updateUserScore = async (newScore) => {
    if (!usermail) return;

    try {
      const response = await fetch("http://localhost:5000/api/update-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usermail,
          score: newScore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update score");
      }
      console.log("Score updated successfully!");
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };



 return (
     <>
       <SidebarProvider>
         <div className="relative flex h-screen w-full bg-gradient-to-r from-blue-100 to-cyan-200 overflow-hidden" onMouseMove={handleMouseMove}>
           {/* Water Ripple Effects */}
           {ripples.map((ripple) => (
             <div
               key={ripple.id}
               className="absolute rounded-full ripple"
               style={{
                 left: ripple.x,
                 top: ripple.y,
                 transform: "translate(-50%, -50%)",
               }}
             ></div>
           ))}
 
           {/* Sidebar */}
           <Sidebar className=" bg-gradient-to-b from-indigo-400 to-blue-500 text-white flex flex-col h-screen rounded-r-3xl shadow-lg">
             <SidebarHeader className="p-6 text-center">
               <h2 className="text-3xl font-extrabold text-black">🌊 Water Sources</h2>
             </SidebarHeader>
             <SidebarContent className="flex-1 overflow-hidden p-4">
               <SidebarGroup>
                 {questions.map((q, index) => (
                   <button
                     key={q.id}
                     onClick={() => index === sectionCurrentQuestion ? setCurrentQuestion(prev => ({ ...prev, [sectionId]: index })) : null}
                     className={`w-full text-left py-3 px-5 mb-4 flex items-center space-x-4 rounded-xl transition-all text-lg font-bold shadow-md
         ${index === sectionCurrentQuestion ? "bg-yellow-400 text-black scale-105 shadow-lg" :
                         (Array.isArray(sectionAnsweredQuestions) && sectionAnsweredQuestions.includes(index))
                           ? "bg-green-500 text-white cursor-not-allowed"
                           : "bg-gray-400 text-gray-900 cursor-not-allowed"}
                               `}
                     disabled={Array.isArray(sectionAnsweredQuestions) && sectionAnsweredQuestions.includes(index)}
                   >
                     {index === sectionCurrentQuestion ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                     <span>Question {index + 1}</span>
                   </button>
                 ))}
 
               </SidebarGroup>
             </SidebarContent>
           </Sidebar>
 
           {/* Question Content */}
           <main className="flex-1 flex flex-col justify-center items-center p-10 text-center bg-blue-100">
             <div className="max-w-3xl p-10 bg-white shadow-2xl rounded-3xl w-full flex flex-col justify-between h-[80vh] border-4 border-yellow-400">
               {sectionCurrentQuestion < questions.length ? (
                 <h1 className="text-4xl font-extrabold text-center text-blue-700">
                   {questions[sectionCurrentQuestion]?.question || "Loading..."}
                 </h1>
               ) : (
                 <h1 className="text-4xl font-extrabold text-green-600 animate-bounce">
                   🎉 Congratulations! You have completed the quiz! 🎉
                 </h1>
               )}
 
 
               <div className="flex flex-col space-y-6 w-[450px] justify-center mx-auto">
                 {questions[sectionCurrentQuestion] ? (
                   questions[sectionCurrentQuestion].options.map((option) => {
                     let btnClass = "bg-blue-500 text-white hover:bg-blue-700 scale-105 transition-all";
 
                     if (isAnswerConfirmed) {
                       if (option === questions[sectionCurrentQuestion].answer) {
                         btnClass = "bg-green-400 text-white scale-105 shadow-md";
                       } else if (option === selectedOption) {
                         btnClass = "bg-red-500 text-white scale-105 shadow-md";
                       } else {
                         btnClass = "bg-gray-400 text-white opacity-70";
                       }
                     } else if (selectedOption === option) {
                       btnClass = "bg-blue-700 text-white scale-110 shadow-lg";
                     }
 
                     return (
                       <Button
                         key={option}
                         onClick={() => setSelectedOption(option)}
                         className={`w-full py-5 text-xl rounded-3xl font-bold transition-all ${btnClass}`}
                         disabled={isAnswerConfirmed}
                       >
                         {option}
                       </Button>
                     );
                   })
                 ) : (
                   <p className="text-red-500 text-lg font-bold">⚠️ No question found!</p>
                 )}
 
               </div>
               {/* Confirm & Next Buttons */}
               <div className="flex justify-between items-center w-full mt-6">
                 <Button
                   onClick={handleConfirmAnswer}
                   className={`py-4 px-8 text-lg rounded-2xl font-bold transition-all shadow-lg ${selectedOption ? "bg-green-600 text-white hover:bg-green-700 scale-105" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                     }`}
                   disabled={!selectedOption || isAnswerConfirmed}
                 >
                   Confirm
                 </Button>
 
                 {isAnswerConfirmed && (
                   <Button
                     onClick={handleNextQuestion}
                     className="py-4 px-8 text-lg bg-yellow-500 text-white rounded-2xl font-bold transition-all shadow-lg hover:bg-yellow-600 scale-105"
                   >
                     Next Question
                   </Button>
                 )}
               </div>
 
             </div>
 
           </main>
           <footer className="bg-transparent hover:bg-transparent absolute bottom-4 right-4 animate-bounce">
             <SidebarTrigger className="hover:bg-transparent" />
           </footer>
         </div>
       </SidebarProvider>
 
       {/* CSS for Ripple Effect */}
       <style>{`
           .ripple {
             width: 50px;
             height: 50px;
             background: rgba(173, 216, 230, 0.4);
             border-radius: 50%;
             position: absolute;
             opacity: 0.8;
             animation: ripple-effect 1s ease-out forwards;
           }
   
           @keyframes ripple-effect {
             0% {
               transform: scale(1);
               opacity: 0.8;
             }
             50% {
               transform: scale(2);
               opacity: 0.4;
             }
             100% {
               transform: scale(3);
               opacity: 0;
             }
           }
         `}</style>
     </>
   );
}
