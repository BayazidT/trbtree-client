'use client';

import { useEffect, useState } from 'react';
import { getUser } from '../data/user';

export default function UsersPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>User Info</h1>
      {user && <p>{user.name}</p>}
    </div>
  );
}