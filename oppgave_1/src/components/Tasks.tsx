import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import Progress from "./Progress";
import type { Task } from "@/types";

type TasksProps = {
  tasks: Task[];
  onAllTasksCompleted: () => void;
  updateTotalScore: (newScore: number) => void;
};

export default function Tasks({ tasks, onAllTasksCompleted, updateTotalScore }: TasksProps) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isAnswerCorrectAndChecked, setIsAnswerCorrectAndChecked] = useState(false);

  useEffect(() => {
    if (correctAnswersCount === 3) {
      setShowScore(true);
      onAllTasksCompleted();
      updateTotalScore(score);
    }
  }, [correctAnswersCount, score, onAllTasksCompleted, updateTotalScore]);

  const onTaskCompleted = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setCorrectAnswersCount(prevCount => prevCount + 1);
      setIsAnswerCorrectAndChecked(true); 
    } else {
      setIsAnswerCorrectAndChecked(false);
    }
  };

  const onNextTask = () => {
    setCurrentTaskIndex(prevIndex => prevIndex + 1);
    setIsAnswerCorrectAndChecked(false);
  };

  if (tasks.length === 0) {
    return <div>Laster oppgaver...</div>;
  }

  const currentTask = tasks[currentTaskIndex];

  return (
    <section className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {showScore && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Du har nådd 3 riktige svar! Din poengsum er: {score}</span>
        </div>
      )}

      {currentTask ? (
        <>
          <article key={currentTask.id} className="p-4 mb-6 bg-gray-100 rounded-lg">
            <p className="text-sm font-semibold text-blue-600 mb-2">{currentTask.type}</p>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{currentTask.text}</h3>
            <p className="text-gray-600">{currentTask.data}</p>
          </article>

          <Answer
            taskData={currentTask.data}
            taskType={currentTask.type}
            onTaskCompletion={onTaskCompleted}
            onNextTask={onNextTask}
          />
        </>
      ) : (
        <p>Ingen flere oppgaver.</p>
      )}

      <Progress
        currentIndex={currentTaskIndex}
        setCurrentIndex={setCurrentTaskIndex}
        totalTasks={tasks.length}
        showNext={currentTaskIndex < tasks.length - 1 && isAnswerCorrectAndChecked}
      />
    </section>

  );
}
