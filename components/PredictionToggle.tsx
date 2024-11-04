"use client"

import { useTournamentContext } from '@/context/TournamentContext';
import { Switch } from '@/components/ui/switch';

const PredictionToggle = () => {
  const { showPrediction, setShowPrediction } = useTournamentContext();

  const handleToggle = () => {
    const newShowPrediction = !showPrediction; 
    setShowPrediction(newShowPrediction); 
    localStorage.setItem("showPrediction", JSON.stringify(newShowPrediction)); 
  };

  return (
    <div className='pl-3 flex space-x-1'>
      <p>AI Prediction</p>
      <Switch
        checked={showPrediction}
        onCheckedChange={handleToggle}
      />
    </div>
  );
};

export default PredictionToggle;
