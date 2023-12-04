
import React, { useState } from 'react';
import { Competition } from '@/app/competitions';


type AddCompetitionProps = {
  onAddCompetition: (competition: Competition) => void;
}

const AddCompetition: React.FC<AddCompetitionProps> = ({ onAddCompetition }) => {
  const initialCompetitionState: Competition = {
    name: '',
    date: '',
    location: '',
    goal: '',
    type: '',
    priority: 'A',
    comments: '',
  };
  type Competition = {

    name: string;
    date: string;
    location: string;
    goal  : string;
    type :string;
    priority: string;
    comments : string
};

  const [competition, setCompetition] = useState<Competition>(initialCompetitionState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompetition({ ...competition, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCompetition(competition); 
    setCompetition(initialCompetitionState); 
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700">Navn:</label>
      <input type="text" id="name" name="name" value={competition.name} onChange={handleChange} className="w-full border rounded-md py-2 px-3" />
    </div>
    <div className="mb-4">
      <label htmlFor="date" className="block text-gray-700">Dato:</label>
      <input type="date" id="date" name="date" value={competition.date} onChange={handleChange} className="w-full border rounded-md py-2 px-3" />
    </div>
    <div className="mb-4">
      <label htmlFor="location" className="block text-gray-700">Sted:</label>
      <input type="text" id="location" name="location" value={competition.location} onChange={handleChange} className="w-full border rounded-md py-2 px-3" />
    </div>
    <div className="mb-4">
      <label htmlFor="goal" className="block text-gray-700">Mål:</label>
      <textarea id="goal" name="goal" value={competition.goal} onChange={handleChange} className="w-full border rounded-md py-2 px-3" />
    </div>
    <div className="mb-4">
      <label htmlFor="type" className="block text-gray-700">Type:</label>
      <input type="text" id="type" name="type" value={competition.type} onChange={handleChange} className="w-full border rounded-md py-2 px-3" />
    </div>
    <div className="mb-4">
      <label htmlFor="priority" className="block text-gray-700">Prioritet:</label>
      <select id="priority" name="priority" value={competition.priority} onChange={handleChange} className="w-full border rounded-md py-2 px-3">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </div>
    <div className="mb-4">
      <label htmlFor="comments" className="block text-gray-700">Kommentarer:</label>
      <textarea id="comments" name="comments" value={competition.comments} onChange={handleChange} className="w-full border rounded-md py-2 px-3" />
    </div>
    <div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Legg til Konkurranse
      </button>
    </div>
  </form>
);
};

export default AddCompetition;
