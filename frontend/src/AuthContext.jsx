import { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken } from './api'; // Import the setAuthToken function
import { useCookies } from 'react-cookie';
import { useMentee } from './MenteeContext'; // Import useMentee hook

// Create a context to manage authentication state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { setMenteeId } = useMentee(); // Use the setMenteeId function from MenteeContext

  // State variables to manage authentication status, access token, user role, user ID, and name
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['role', 'accessToken', 'userId', 'name']);
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState(""); // Add name state

  useEffect(() => {
    // Check if the access token is valid when the component is mounted
    const savedAccessToken = cookies.accessToken;
    const role1 = cookies.role;
    const savedUserId = cookies.userId;
    const savedName = cookies.name; // Retrieve name from cookies
    
    if (savedAccessToken) {
      setAuthenticated(true);
      setAccessToken(savedAccessToken);
      setAuthToken(savedAccessToken); // Set the authorization header
      setUserRole(role1);
      setUserId(savedUserId); // Set the userId retrieved from cookies
      setName(savedName); // Set the name retrieved from cookies
      
      // Set menteeId if role is mentee
      if (role1 === 'mentee') {
        setMenteeId(savedUserId);
      }
    }
  }, [cookies, setMenteeId]);

  const login = (token, role, id, userName) => {
    setCookie('accessToken', token, { path: '/', secure: true, sameSite: 'None' });
    setCookie('role', role, { path: '/', secure: true, sameSite: 'None' });
    setCookie('userId', id, { path: '/', secure: true, sameSite: 'None' });
    setCookie('name', userName, { path: '/', secure: true, sameSite: 'None' });
    setAccessToken(token);
    setAuthenticated(true);
    setUserRole(role);
    setUserId(id);
    setName(userName);
    setAuthToken(token);
    
    // Set menteeId if role is mentee
    if (role === 'mentee') {
      setMenteeId(id);
    }
  }

  const logout = () => {
    removeCookie('accessToken', { path: '/' });
    removeCookie('role', { path: '/' });
    removeCookie('userId', { path: '/' });
    removeCookie('name', { path: '/' });
    setAccessToken(null);
    setAuthenticated(false);
    setUserRole("");
    setUserId("");
    setName("");
    setAuthToken(null);
    window.location.href = '/'; // Redirect to login or home page
  }

  return (
    <AuthContext.Provider value={{ authenticated, accessToken, userRole, userId, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
