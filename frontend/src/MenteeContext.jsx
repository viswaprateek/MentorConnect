// MenteeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const MenteeContext = createContext();

export const MenteeProvider = ({ children }) => {
  const [menteeId, setMenteeId] = useState(null);

  return (
    <MenteeContext.Provider value={{ menteeId, setMenteeId }}>
      {children}
    </MenteeContext.Provider>
  );
};

export const useMentee = () => {
  return useContext(MenteeContext);
};
