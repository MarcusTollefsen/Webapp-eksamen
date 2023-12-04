import React from 'react';
import type { Competition } from '@/app/competitions'; 

type CompetitionListProps = {
  competitions: Competition[];
}
type Competition ={

  name: string;
  date: string;
  location: string;
  goal  : string;
  type :string;
  priority: string;
  comments : string
};
const CompetitionList: React.FC<CompetitionListProps> = ({ competitions }) => {
  return (
    <div className="flex items-center justify-center h-full p-4">
    <div className="w-full max-w-4xl">
      {competitions.length === 0 ? (
        <p className="text-gray-500 text-center">Ingen konkurranser lagt til ennå.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitions.map((competition: Competition, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{competition.name}</h3>
              <p className="text-gray-600">Dato: {competition.date}</p>
              <p className="text-gray-600">Sted: {competition.location}</p>
              <p className="text-gray-600">Mål: {competition.goal}</p>
              <p className="text-gray-600">Type: {competition.type}</p>
              <p className="text-gray-600">Prioritet: {competition.priority}</p>
              <p className="text-gray-600">Kommentarer: {competition.comments}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  
  );
};

export default CompetitionList;
