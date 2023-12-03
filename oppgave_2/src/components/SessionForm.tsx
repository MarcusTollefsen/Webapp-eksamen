import { useState, ChangeEvent, FormEvent } from 'react';

interface SessionFormData {
  name: string;
  date: string; // for simplicity, using string here
  type: string;
  tags: string[];
  athleteId: string;
}

export default function SessionForm() {
  const [sessionData, setSessionData] = useState<SessionFormData>({ name: '', date: '', type: '', tags: [], athleteId: '' });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/sessions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });
      if (!response.ok) throw new Error('Error in submission');
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSessionData({ ...sessionData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={sessionData.name} onChange={handleChange} placeholder="Session Name" />
      <input type="date" name="date" value={sessionData.date} onChange={handleChange} />
      <input name="type" value={sessionData.type} onChange={handleChange} placeholder="Session Type" />
      <input name="tags" value={sessionData.tags.join(', ')} onChange={(e) => setSessionData({ ...sessionData, tags: e.target.value.split(', ') })} placeholder="Tags (comma-separated)" />
      <input name="athleteId" value={sessionData.athleteId} onChange={handleChange} placeholder="Athlete ID" />
      <button type="submit">Create Session</button>
    </form>
  );
}
