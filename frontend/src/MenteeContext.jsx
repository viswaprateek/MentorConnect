// MenteeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const MenteeContext = createContext();

export const MenteeProvider = ({ children }) => {
  const [menteeId, setMenteeId] = useState(null);
  const [selectedMenteeIds, setSelectedMenteeIds] = useState([]);

  return (
    <MenteeContext.Provider value={{ menteeId, setMenteeId, selectedMenteeIds, setSelectedMenteeIds }}>
      {children}
    </MenteeContext.Provider>
  );
};

export const useMentee = () => {
  return useContext(MenteeContext);
};
