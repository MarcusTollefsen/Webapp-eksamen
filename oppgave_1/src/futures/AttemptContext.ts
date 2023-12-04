import React, { createContext, useContext, useState } from 'react';

const AttemptContext = createContext();

export const useAttempts = () => useContext(AttemptContext);

export const AttemptProvider = ({ children }) => {
  const [attempts, setAttempts] = useState({}); 

  const registerAttempt = (taskId, wasCorrect) => {
    setAttempts(prevAttempts => ({
      ...prevAttempts,
      [taskId]: (prevAttempts[taskId] || 0) + (wasCorrect ? 0 : 1) 
    }));
  };

  const getAttemptsForTask = (taskId) => {
    return attempts[taskId] || 0;
  };

  return (
    <AttemptContext.Provider value={{ registerAttempt, getAttemptsForTask }}>
      {children}
    </AttemptContext.Provider>
  );
};
