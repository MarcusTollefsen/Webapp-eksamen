import React, { useState, useEffect } from "react";

export default function Answer({ taskData, taskType, onTaskCompletion, onNextTask }: 
  { taskData: string, taskType: string, onTaskCompletion: (isCorrect: boolean) => void, onNextTask: () => void }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("0 av 3 forsøk"); 
  const [attempts, setAttempts] = useState(0);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);  
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const maxAttempts = 3;
  
  useEffect(() => {
    setFeedback("0 av 3 forsøk"); 
  }, [taskType, taskData]);

  const calculateAnswer = (data: string, type: string): number => {
    const numbers = data.split('|').map(Number);
    switch (type) {
      case 'add':
        return numbers.reduce((a, b) => a + b, 0);
      case 'multiply':
        return numbers.reduce((a, b) => a * b, 1);
      
      default:
        return 0;
    }
  };

  const correctAnswer = calculateAnswer(taskData, taskType);

  const handleCheckAnswer = () => {
    const isCorrect = correctAnswer === Number(answer);
    onTaskCompletion(isCorrect);
    setIsAnswerChecked(true);
    if (isCorrect) {
      setFeedback("Bra jobbet!");
      setShowCorrectAnswer(false);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= maxAttempts) {
        setFeedback("Ingen forsøk igjen. ");
        setShowCorrectAnswer(true);
      } else {
        setFeedback(`Feil svar. Forsøk igjen. (${newAttempts} av ${maxAttempts} forsøk brukt)`);
      }
    }
  };

  const showAnswer = () => {
    setFeedback(`Svaret er: ${correctAnswer}`);
    setShowCorrectAnswer(false);
  };

  return (
    <div className="p-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Svar
        <input
          name="answer"
          type="text"
          placeholder="Sett svar her"
          value={answer}
          onChange={(e) => { setAnswer(e.target.value); }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <button 
          onClick={handleCheckAnswer} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
        >
          Sjekk svar
        </button>
        <p className="mt-3">{feedback}</p>
        {showCorrectAnswer && (
          <button 
            onClick={showAnswer}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          >
            Se svaret
          </button>
        )}
        {isAnswerChecked && (
          <button 
            onClick={onNextTask}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          >
            Vis neste oppgave
          </button>
        )}
      </label>
    </div>
  );
}
