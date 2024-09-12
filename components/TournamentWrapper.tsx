"use client"

import TournamentRound from './TournamentRound';
import { TournamentProps } from './types';

const TournamentWrapper = ({ rounds } : TournamentProps) => {
  return (
    <div className="flex flex-row space-x-4 overflow-x-auto p-4">
    {rounds.map((round) => (
      <div key={round.id} className="flex-shrink-0">
       <TournamentRound key={round.id} name={round.name} id={round.id} brackets={round.brackets} />
      </div>
    ))}
  </div>
  )
}

export default TournamentWrapper