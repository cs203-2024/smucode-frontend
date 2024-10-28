"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTournamentContext } from "@/context/TournamentContext";
import { Skeleton } from "@/components/ui/skeleton";
import { getFormattedDateFromString } from '@/lib/utils';
import { Badge } from "@/components/ui/badge"
import { Calendar, LoaderCircle } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';
import { toast } from 'sonner';
import { removeSignUpForTournament, signUpForTournament } from '@/services/tournamentAPI';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@radix-ui/react-dialog';

const TournamentOverview: React.FC = () => {
  const { user } = useUserContext();
  const [error, setError] = useState<string | null>(null);
  const { loadingTournamentContext, overviewData } = useTournamentContext();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isRemovingSignUp, setIsRemovingSignUp] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [canSignUp, setCanSignUp] = useState(false);

  useEffect(() => {
    if(user){
      // User can only sign up when tournament has not started and when they have not sign up yet
      setCanSignUp(overviewData?.status === "UPCOMING" && user?.role === "ROLE_USER" && !signedUp);
    }
  }, [overviewData?.status, user]);
  
  const handleTournamentSignUp = async () => {
    
    if (canSignUp && !isSigningUp) {
      setIsSigningUp(true);
      try {

        await signUpForTournament(id);
        toast.success("Signed up successfully!");
        setSignedUp(true);
      } catch (error) {
        console.error("Failed to sign up:", error);
        toast.error("Failed to sign up. Please try again.");
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  const handleTournamentRemoveSignUp = async () => {
    
    if (signedUp && !isRemovingSignUp) {
      setIsRemovingSignUp(true);
      try {

        await removeSignUpForTournament(id);
        toast.success("Successfully Removed Registration!"); 
        setSignedUp(false);
        
      } catch (error) {
        console.error("Failed to remove registration:", error);
        toast.error("Failed to remove registration. Please try again.");
      } finally {
        setIsRemovingSignUp(false);
      }
    }
  };
  // Loading State
  if (loadingTournamentContext) {
    return (
      <div className="w-full">
        <Skeleton className="mt-10 mx-[calc(18%)] h-[260px]" />
        <div className='grid text-sm grid-cols-[minmax(auto,70%)_minmax(auto,30%)] w-[calc(60%)] mx-[calc(20%)] mt-14 gap-x-[6em] gap-y-[3em]'>
        <Skeleton className='w-full rounded-lg h-[300px]'/>
        <div className='w-[80%] mx-auto'>
        <Skeleton className="rounded-lg h-[300px]"/>
        </div>
        </div>
      </div> 
    );
  }

  // Error State
  if (error) {
    return <div className="text-center p-4 text-red-500 mt-10">{error}</div>;
  }

  // No Data State
  if (!overviewData) {
    return <div className="text-center p-4 mt-10">No tournament data available</div>;
  }

  // Destructure Overview Data
  const {
    id,
    icon,
    name,
    organiser,
    capacity,
    description,
    format,
    band,
    startDate,
    endDate,
    signupStartDate,
    signupEndDate,
    status,
    numberOfSignups,
    currentRound,
    scoreCriteria,
  } = overviewData;

  return (
    <div className="w-full overflow-y-auto">
      {/* Header Section */}
      <div className="bg-white h-[260px] text-sm shadow-sm p-6 rounded-lg flex justify-between mt-10 mx-[calc(18%)]">
        <div>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-bold">{name}</h1>
          <Badge className={`${status === 'ONGOING' ? "bg-green-500" : status === 'UPCOMING' ? "bg-yellow-500" : "bg-red-500"}`}>
            {status}
          </Badge>
        </div>
          <p className="text-gray-600 mt-8">
            Organized by {organiser}
          </p>
          <div className="flex items-center gap-1">
          <Calendar size={14} className='mt-2.5'></Calendar>
            <p className="text-gray-600 mt-2">
              {getFormattedDateFromString(startDate)} - {getFormattedDateFromString(endDate)}
            </p>
          </div>
          { signedUp &&
            <Button variant="outline" className="logo_gradient text-white font-semibold w-[100px] mt-8" onClick={() => setIsRemoveDialogOpen(true)}>
              Registered
            </Button>
          }
          { canSignUp &&
            <Button variant="outline" className="logo_gradient text-white font-semibold w-[110px] mt-8" onClick={() => setIsConfirmDialogOpen(true)}>
              Sign Up
            </Button>
          }
          

        </div>
        <Image
          src={icon || '/assets/images/tournament_default.png'}
          alt="Tournament Image"
          width={300}
          height={300}
          className="object-cover rounded-lg"
        />
      </div>
  
      <div className='mx-[calc(20%)] text-xl font-semibold mt-8 mb-6'>
        <p>Tournament Details</p>
      </div>
      <div className='grid text-sm grid-cols-[minmax(auto,70%)_minmax(auto,30%)] w-[calc(60%)] mx-[calc(20%)] gap-x-[6em] gap-y-[3em] mb-6'>
        <div className='w-full bg-transparent border-t-2'>
        <div className="space-y-2 mt-10">
            <p className="text-gray-700 mb-6">{description || 'No description available.'}</p>
            <p><b>Format:</b> {format}</p>
            <p><b>Band:</b> {band}</p>
            <p><b>Sign ups:</b> {numberOfSignups}/{capacity}</p>
            <p><b>Capacity:</b> {capacity}</p>
            <p><b>Current Round:</b> {currentRound || 'Not started'}</p>
            <div>
              <h3 className="font-semibold mb-1">Score Criteria:</h3>
              {scoreCriteria ? (
                <ul className="list-disc list-inside space-y-2">
                  {Object.entries(scoreCriteria).map(([criteria, points], index) => (
                    <li key={index}>
                      <b>{criteria.charAt(0).toUpperCase() + criteria.slice(1)}</b>: {points}%
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Not specified</p>
              )}
            </div>
          </div>
        </div>
        <div className='w-[100%] mx-auto rounded-lg'>
        <div className="bg-white shadow p-6 rounded-lg h-[300px] text-md">
          <h2 className="text-md font-semibold mb-4">Tournament Timeline</h2>
          <div className="space-y-2 text-sm">
            <div>
              <p><u>Sign-up period</u></p>
              <p>{getFormattedDateFromString(signupStartDate)} - {getFormattedDateFromString(signupEndDate)}</p>
            </div>
            <br></br>
            <div>
              <p><u>Tournament period</u></p>
              <p>{getFormattedDateFromString(startDate)} - {getFormattedDateFromString(endDate)}</p>
            </div>
          </div>
        </div>
        </div> 
      </div>


      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DialogContent className="bg-white p-6 rounded-md shadow-md w-[400px] text-sm">
            <DialogTitle className="font-medium text-md">Confirm Tournament Registration</DialogTitle>
                <br/>
                This action will confirm your registration for this tournament. 
                If you are accepted to participate in the tournament, you will be notified before the commencement of the first round.
                <br/>
                <br/>
                Please ensure that you will be available for the entire duration of the tournament. 
                Otherwise, you may choose to leave this tournament at any time before the registration deadline.
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
              <Button className="w-[110px]" onClick={handleTournamentSignUp} disabled={isSigningUp}>
                    {isSigningUp?(<LoaderCircle className="animate-spin" color="#FFF"/>):("Confirm")}
              </Button>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DialogContent className="bg-white p-6 rounded-md shadow-md w-[400px] text-sm">
            <DialogTitle className="font-medium text-md">Leave Tournament</DialogTitle>
                <br/>
                This action cannot be undone. 
                Your registration will be removed from the tournament system and you may not be able to participate in the tournament again.
                <br/>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>Cancel</Button>
              <Button className="w-[110px]" onClick={handleTournamentRemoveSignUp} disabled={isRemovingSignUp}>
                    {isRemovingSignUp?(<LoaderCircle className="animate-spin" color="#FFF"/>):("Leave")}
              </Button>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>

    
  );
};

export default TournamentOverview;
