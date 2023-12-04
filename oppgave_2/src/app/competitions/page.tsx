"use client"
import React, { useState, useEffect } from 'react';
import AddCompetition from '@/components/AddCompetition';
import CompetitionList from '@/components/CompetitionList';


type Competition = {

    name: string;
    date: string;
    location: string;
    goal  : string;
    type :string;
    priority: string;
    comments : string
};
const CompetitionsPage: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);

    const handleAddCompetition = (newCompetition: Competition) => {
        setCompetitions(prevCompetitions => [...prevCompetitions, newCompetition]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold text-center mb-6">Konkurranser</h1>
    <AddCompetition onAddCompetition={handleAddCompetition} />
    <CompetitionList competitions={competitions} />
</div>

    );
};

export default CompetitionsPage;
