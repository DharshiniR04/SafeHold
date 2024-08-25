import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const SelectedUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};
