import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/new-york/profile-avatar";
import { fetchOpponentsData } from "@/components/mockApi";
import { useUserContext } from "@/context/UserContext";

interface Opponent {
  id: number;
  name: string;
  avatar: string;
  date: string;
  score: number;
}

export function RecentOpponents() {
  // Testing if I can get the username from the context
  const username = useUserContext();
  console.log("Username from context:", username.user?.username);

  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpponents = async () => {
      try {
        const data = await fetchOpponentsData(); // Replace with your API endpoint
        setOpponents(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load opponents data");
        setLoading(false);
      }
    };

    fetchOpponents();
  }, []);

  // Sort the opponents by date in descending order
  const sortedOpponents = opponents.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get the last 5 opponents
  const recentOpponents = sortedOpponents.slice(0, 5);

  // Function to calculate days ago
  const calculateDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const differenceInTime = now.getTime() - date.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  if (loading) {
    return (
      <div className="text-center p-4 mt-10">Loading opponents data...</div>
    );
  }

  if (error) {
    return <div className="text-center p-4 text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {/* Header Row */}
      <div className="flex items-center font-semibold text-gray-700">
        <div className="w-1/3">Name</div>
        <div className="w-1/3 text-center">Days Ago</div>
        <div className="w-1/3 text-right">Score</div>
      </div>
      {recentOpponents.map((opponent) => (
        <div
          key={opponent.id}
          className={`flex items-center p-4 mb-4 rounded-lg shadow ${
            opponent.score >= 0 ? "bg-green-200" : "bg-red-200"
          }`}
        >
          <div className="w-1/12">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={opponent.avatar}
                alt={`Avatar of ${opponent.name}`}
              />
              <AvatarFallback>
                {opponent.name[0]}
                {opponent.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4 space-y-1 w-3/12">
            <p className="text-sm font-medium leading-none">{opponent.name}</p>
          </div>
          <div className="w-1/3 text-center">
            <p className="text-sm text-muted-foreground">
              {calculateDaysAgo(opponent.date)}d ago
            </p>
          </div>
          <div className="w-1/3 text-right font-medium">
            {opponent.score >= 0 ? `+${opponent.score}` : opponent.score}
          </div>
        </div>
      ))}
    </div>
  );
}
