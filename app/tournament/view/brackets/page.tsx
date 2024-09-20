"use client"

import TournamentBracketWrapper from '@/components/TournamentBracketWrapper'; 

const TournamentBracketPage: React.FC = () => {
  return (
    <div className='bg-slate-50'>
      <h1 className='ml-9 pt-8 text-3xl font-bold'>Tournament Brackets</h1>
      <TournamentBracketWrapper />
    </div>
  );
};

export default TournamentBracketPage;