"use client";

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { useTournamentContext } from "@/context/TournamentContext";
import { Skeleton } from "@/components/ui/skeleton";
import { getFormattedDateFromString } from '@/lib/utils';

const TournamentOverview: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { loadingTournamentContext, overviewData } = useTournamentContext();

  if (loadingTournamentContext) {
    return (
      <div className="w-full space-y-6">
        <h2 className="text-2xl font-bold text-black ml-[12px] mt-[2px]">Tournament Overview</h2>
        <Skeleton className="h-[85px] rounded-lg mx-6" />
        <div className="p-6 space-y-6 h-[65vh] overflow-y-scroll">
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full rounded-lg" /> 
            <Skeleton className="p-4 rounded-lg shadow"/>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[110px] p-4 rounded-lg shadow"/>
            <Skeleton className="h-[110px] p-4 rounded-lg shadow"/>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-20 p-4 rounded-lg shadow"/>
            <Skeleton className="h-20 p-4 rounded-lg shadow"/>
          </div>
          <Skeleton className="h-12 p-4 rounded-lg shadow"/>
          <Skeleton className="h-12 p-4 rounded-lg shadow"/>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-4 text-red-500 mt-10">{error}</div>;
  }

  if (!overviewData) {
    return <div className="text-center p-4 mt-10">No tournament data available</div>;
  }

  const {
    id,
    icon,
    name,
    capacity,
    description,
    format,
    band,
    startDate,
    endDate,
    signupStartDate,
    signupEndDate,
    status,
    signUpStatus,
    numberOfSignups,
    currentRound,
    scoreCriteria,
  } = overviewData;

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-black ml-[12px] mt-[2px]">Tournament Overview</h2>
      <div className="bg-blue-600 text-white p-6 rounded-lg mx-6">
        <h1 className="text-3xl font-bold text-center">{name}</h1>
      </div>

      <div className="p-6 space-y-6 h-[65vh] overflow-y-scroll">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative bg-white rounded-lg shadow h-64">
            <Image
              src={icon || '/assets/images/tournament_default.png'}
              alt="Tournament Image"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Description beside the image */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">{description || 'No description available.'}</p>
          </div>
        </div>

        {/* Period Information */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tournament Period */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow relative">
            <div className="absolute top-2 m-2 right-2 flex space-x-2">
              <Badge className={`text-sm px-2 py-1 ${status === 'ONGOING' ? 'bg-green-500' : status === 'UPCOMING' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                {status}
              </Badge>
              {currentRound && (
                <Badge className="text-sm px-2 py-1 bg-blue-500">{currentRound}</Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Tournament Period</h3>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Start:</span> {getFormattedDateFromString(startDate)}</p>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">End:</span> {getFormattedDateFromString(endDate)}</p>
          </div>

          {/* Sign Up Period */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow relative">
          {signUpStatus && (
            <div className="absolute top-2 right-2">
              <Badge className={`text-sm m-2 px-2 py-1 ${signUpStatus === 'OPEN' ? 'bg-green-500' : 'bg-red-500'}`}>
                {signUpStatus}
              </Badge>
            </div>
          )}
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Sign Up Period</h3>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Start:</span> {getFormattedDateFromString(signupStartDate)}</p>
            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Close:</span> {getFormattedDateFromString(signupEndDate)}</p>
          </div>
        </div>

        {/* Format and Band Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Format</h3>
            <p className="text-gray-600 dark:text-gray-300">{format || 'No format specified.'}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Band</h3>
            <p className="text-gray-600 dark:text-gray-300">{band || 'No band specified.'}</p>
          </div>
        </div>

        {/* Participants Section */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Sign Ups</h3>
          <div className="flex items-center">
            <div className="flex-grow bg-gray-200 dark:bg-gray-600 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${(numberOfSignups / capacity) * 100}%` }}
              ></div>
            </div>
            <p className="ml-4 font-medium text-gray-700 dark:text-gray-300">
              {numberOfSignups} / {capacity}
            </p>
          </div>
        </div>

        {/* Score Criteria Section */}
        { scoreCriteria && (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Score Criteria</h3>
          <div className="grid grid-cols-3 gap-4">
          {Object.entries(scoreCriteria).map(([criterion, value]) => (
            value !== undefined && (
              <div key={criterion} className="text-center">
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{criterion}</div>
              </div>
            )
           ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default TournamentOverview;
