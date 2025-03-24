import React, { useEffect, useState } from "react";
import { Trophy, User } from "lucide-react";
import axios from "axios";

const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("https://web-game-for-water-conservation-awareness.onrender.comapi/leaderboard"); // Adjust API URL
      const sortedPlayers = response.data.sort((a, b) => b.score - a.score);
      setPlayers(sortedPlayers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-100 to-purple-200 rounded-xl shadow-lg border-4 border-blue-300">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6 drop-shadow-lg">
        🏆 Leaderboard 🏆
      </h1>

      {loading ? (
        <p className="text-center text-gray-700 font-medium text-lg">Loading...</p>
      ) : players.length === 0 ? (
        <p className="text-center text-gray-700 font-medium text-lg">No scores yet. Be the first to play!</p>
      ) : (
        <ul className="space-y-4">
          {players.map((player, index) => (
            <li
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md text-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                index === 0 ? "bg-yellow-300 text-yellow-900 border-4 border-yellow-500" :
                index === 1 ? "bg-gray-300 text-gray-900 border-4 border-gray-500" :
                index === 2 ? "bg-orange-300 text-orange-900 border-4 border-orange-500" :
                "bg-white text-gray-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                {index === 0 && <Trophy className="text-yellow-600 w-6 h-6 animate-bounce" />}
                {index === 1 && <Trophy className="text-gray-600 w-6 h-6 animate-bounce" />}
                {index === 2 && <Trophy className="text-orange-600 w-6 h-6 animate-bounce" />}
                {index > 2 && <User className="text-blue-600 w-6 h-6" />}
                <span>{player.name}</span>
              </div>
              <span className="text-xl">{player.score} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeaderBoard;
