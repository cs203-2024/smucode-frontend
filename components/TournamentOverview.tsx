"use client"

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';
import { fetchTournamentOverviewData } from './mockApi';
import { TournamentOverviewProps } from './types';
import { useTournamentId } from "@/context/TournamentIdContext";

const TournamentOverview: React.FC = () => {
  const [tournamentData, setTournamentData] = useState<TournamentOverviewProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tournamentId = useTournamentId();
  useEffect(() => {
    const loadTournamentData = async () => {
      try {
        const data = await fetchTournamentOverviewData(tournamentId);
        setTournamentData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tournament data');
        setLoading(false);
      }
    };

    loadTournamentData();
  }, [tournamentId]);

  if (loading) {
    return <div className="text-center p-4 mt-10">Loading tournament data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500 mt-10">{error}</div>;
  }

  if (!tournamentData) {
    return <div className="text-center p-4 mt-10">No tournament data available</div>;
  }

  const {
    name,
    imageUrl,
    startDateTime,
    endDateTime,
    signUpStartDateTime,
    signUpCloseDateTime,
    signUpStatus,
    tournamentStatus,
    currentRound,
    participantsCount,
    maxParticipants,
    scoreCriteria
  } = tournamentData;

  return (
    <div className="w-full space-y-6">
    <h2 className="text-2xl font-bold text-black ml-[12px] mt-[2px]">Tournament Overview</h2>
      <div className="bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold text-center">{name}</h1>
      </div>
      <div className="p-6 space-y-6">

        <div className="grid md:grid-cols-2 gap-6">

        <div className="relative bg-white rounded-lg shadow h-64">
            <Image
            src={imageUrl || '/assets/images/tournament_default.png'} 
            alt="Tournament Image"
            fill 
            className="object-contain rounded-lg" 
            />
        </div>

        {/* Right side with two vertically stacked cards */}
        <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow relative">
            <div className="absolute top-2 m-2 right-2 flex space-x-2">
                <Badge className={`text-sm px-2 py-1 ${tournamentStatus === 'Ongoing' ? 'bg-green-500' : tournamentStatus === 'Upcoming' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                {tournamentStatus}
                </Badge>
                {currentRound && (
                <Badge className="text-sm px-2 py-1 bg-blue-500">{currentRound}</Badge>
                )}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Tournament Period</h3>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Start:</span> {startDateTime}</p>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">End:</span> {endDateTime}</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow relative">
            <div className="absolute top-2 right-2">
                <Badge className={`text-sm m-2 px-2 py-1 ${signUpStatus === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}>
                {signUpStatus}
                </Badge>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Sign Up Period</h3>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Start:</span> {signUpStartDateTime}</p>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Close:</span> {signUpCloseDateTime}</p>
            </div>
        </div>
        </div>



        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Participants</h3>
          <div className="flex items-center">
            <div className="flex-grow bg-gray-200 dark:bg-gray-600 rounded-full h-4">
              <div 
                className="bg-blue-500 h-4 rounded-full" 
                style={{ width: `${(participantsCount / maxParticipants) * 100}%` }}
              ></div>
            </div>
            <p className="ml-4 font-medium text-gray-700 dark:text-gray-300">
              {participantsCount} / {maxParticipants}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Score Criteria</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(scoreCriteria).map(([criterion, value]) => (
              <div key={criterion} className="text-center">
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{criterion}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentOverview;