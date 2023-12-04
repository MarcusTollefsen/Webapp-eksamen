import React, { useState, useEffect } from 'react';

function TaskComponent() {
  const [taskId, setTaskId] = useState('');
  const [taskText, setTaskText] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-current-task');
        if (response.ok) {
          const taskData = await response.json();
          setTaskId(taskData.id);
          setTaskText(taskData.text);
        } else {

          console.error('Feil ved henting av oppgave');
        }
      } catch (error) {
        console.error('En feil oppstod:', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchTask();
  }, []);

  const handleAnswer = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/register-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, userAnswer }),
      });
      if (response.ok) {
        const result = await response.json();
        setIsCorrect(result.isCorrect);
        setFeedback(result.isCorrect ? 'Riktig svar!' : 'Feil svar, prøv igjen.');
      } else {

        setFeedback('En feil oppstod ved innsending av svaret.');
      }
    } catch (error) {
      console.error('En feil oppstod:', error);
      setFeedback('En feil oppstod ved innsending av svaret.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>{taskText}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={e => { setUserAnswer(e.target.value); }}
        disabled={loading}
      />
      <button onClick={handleAnswer} disabled={loading}>
        Send inn svar
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default TaskComponent;
