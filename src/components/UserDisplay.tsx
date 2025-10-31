import React, { useState, useEffect } from 'react';
import { fetchUserName } from '../utils/api';

const UserDisplay: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    fetchUserName().then((name) => setUserName(name));
  }, []);

  if (!userName) {
    return <div>Loading...</div>;
  }

  return <h1>User: {userName}</h1>;
};

export default UserDisplay;
