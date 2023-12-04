"use client"
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import TaskText from "@/components/Text";
import type { Task } from "@/types";

type ApiResponse = {
  success: boolean;
  data: Task[];
  error?: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false); 
  const [results, setResults] = useState({ totalScore: 0, weakAreas: [] });

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/restapi/tasks/`);

      const result = await response.json() as ApiResponse;
      if (result.success) {
        setTasks(result.data);
      } else {
        console.error("API-feil: ", result.error);
      }
    } catch (error) {
      console.error("Fetch-feil: ", error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/get-results');
      if (response.ok) {
        const resultData = await response.json();
        setResults(resultData.data);
      }
    } catch (error) {
      console.error("Feil ved henting av resultater: ", error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  useEffect(() => {
    if (completedTasks === tasks.length) {
      void fetchResults();
    }
  }, [completedTasks, tasks.length]);

  const handleTaskCompletion = (isCorrect) => {
    if (isCorrect) {
      setCompletedTasks((prevCompletedTasks) => prevCompletedTasks + 1);
      setTotalScore((prevScore) => prevScore + 1);
    }

  };


  const handleAllTasksCompleted = () => {
    console.log("Alle oppgaver fullført");
    setAllTasksCompleted(true);
  };


  const restart = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4 flex flex-col items-center h-screen mt2">
        <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        <Tasks
          tasks={tasks}
          onTaskCompleted={handleTaskCompletion}
          onAllTasksCompleted={handleAllTasksCompleted}
          updateTotalScore={setTotalScore}
        />
        {allTasksCompleted ? (
          <div>
            <p>Alle oppgaver er fullført!</p>
            <button
              onClick={restart}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Start på nytt
            </button>
          </div>
        ) : (
          <div>

          </div>
        )}
        {completedTasks === tasks.length && (
          <div>
            <h3>Total poengsum: {totalScore}</h3>
            <p>Svake områder: {results.weakAreas.join(", ")}</p>
          </div>
        )}
      </div>
    </main>
  );
}