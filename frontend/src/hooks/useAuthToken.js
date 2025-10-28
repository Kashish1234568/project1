import { useContext } from 'react';
import { AuthContext } from '../App.jsx';

// Function to generate a simple mock JWT token for testing
const generateMockToken = (user) => {
    if (!user) return null;
    
    // In a real app, this would be a secure token from the server.
    // Here, we create a simple base64 encoded string containing the user's role.
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ role: user.role, email: user.email, iat: Date.now() }));
    
    return `${header}.${payload}.MOCK_SIGNATURE`;
};

// Custom hook to provide the auth token
const useAuthToken = () => {
    const { user } = useContext(AuthContext);
    
    // Generate the token based on the currently logged-in user
    const token = generateMockToken(user);

    return token;
};

export default useAuthToken;
