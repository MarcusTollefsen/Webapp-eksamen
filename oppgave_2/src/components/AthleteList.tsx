import React, { useEffect, useState } from 'react';
import Athlete from "@/components/Athlete";

type Athlete = {
  id: string;
  gender: string;
  sport: string;
};

const AthleteList = () => {
  const [users, setUsers] = useState<Athlete[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/athletes');
        if (!response.ok) {
          throw new Error('Failed to fetch athletes');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching athletes:', error);
      }
    }

    void fetchUsers();
  }, []);

  return (
    <ul className="pl-4">
      {users.map(user => (
        <Athlete key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default AthleteList;
