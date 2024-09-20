"use client"

import TournamentBracketCardData from '@/components/TournamentBracketCardData'; 

const TournamentRoundPage: React.FC = () => {
  return (
    <div className='bg-slate-50'>
      <h1 className='ml-9 pt-8 text-3xl font-bold'>Tournament Rounds</h1>
      <TournamentBracketCardData/>
    </div>
  );
};

export default TournamentRoundPage;