import React, { useState, useEffect } from 'react';


type ResultData = {
  totalScore: number;
  weakAreas: string[];
}
function Result() {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch('/api/results');
      if (response.ok) {
        const data= await response.json();
        setTotalScore(data.totalScore);
        setWeakAreas(data.weakAreas);
      }
    };

    void fetchResults();
  }, []);

  return (
    <div>
      <h2>Total Poengsum: {totalScore}</h2>
      <h3>Svake Områder:</h3>
      <ul>
        {weakAreas.map((area, index) => (
          <li key={index}>{area}</li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
