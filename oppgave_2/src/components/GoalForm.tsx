import { useState, ChangeEvent, FormEvent } from 'react';

interface GoalFormData {
  name: string;
  date: string; // for simplicity, using string here
  details: string;
  type: string;
  priority: string;
  comments: string;
  athleteId: string;
}

export default function GoalForm() {
  const [goalData, setGoalData] = useState<GoalFormData>({ name: '', date: '', details: '', type: '', priority: '', comments: '', athleteId: '' });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/goals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });
      if (!response.ok) throw new Error('Error in submission');
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGoalData({ ...goalData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={goalData.name} onChange={handleChange} placeholder="Goal Name" />
      <input type="date" name="date" value={goalData.date} onChange={handleChange} />
      <textarea name="details" value={goalData.details} onChange={handleChange} placeholder="Details" />
      <input name="type" value={goalData.type} onChange={handleChange} placeholder="Type" />
      <input name="priority" value={goalData.priority} onChange={handleChange} placeholder="Priority" />
      <textarea name="comments" value={goalData.comments} onChange={handleChange} placeholder="Comments" />
      <input name="athleteId" value={goalData.athleteId} onChange={handleChange} placeholder="Athlete ID" />
      <button type="submit">Create Goal/Competition</button>
    </form>
  );
}
