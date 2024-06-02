
import React, { createContext, useContext, useState } from 'react';

const AcadContext = createContext();

export const MenteeProvider = ({ children }) => {
  const [menteeId, setMenteeId] = useState(null);

  return (
    <AcadContext.Provider value={{ menteeId, setMenteeId }}>
      {children}
    </AcadContext.Provider>
  );
};

export const useMentee = () => {
  return useContext(AcadContext);
};
