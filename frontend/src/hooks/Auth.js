import React, { useContext, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignOut } from '../api/signOutAPI';
import { getSession } from '../utils/getSession';

// create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate()
  // create state values for user data and loading
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // get session data if there is an active session
    const { session, user, error } = getSession()

    if (error) {
      setUser(null)
      setLoading(false);
      return;
    } else if (session) {
      setUser(user);
      setLoading(false);
      return;
    }

  }, [navigate]);

  // create signUp, signIn, signOut functions
  const value = {
    signOut: async () => {
      const data = await userSignOut()
      if (data.status === 200) {
        console.log(data.data)
        navigate("/login")
      }
    },
    setUser: (user) => { setUser(user) },
    user,

  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};