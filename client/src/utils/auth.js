// auth.js

// Helper function to check if the user is logged in by checking the presence of a token
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return Boolean(token);
  };
  
  // Function to log the user in by storing the token
  export const login = (token) => {
    localStorage.setItem('token', token);
    window.location.assign('/');
    // Redirect or perform additional actions as needed after login
  };
  
  // Function to log the user out by removing the token
  export const logout = () => {
    localStorage.removeItem('token');
    window.location.assign('/'); // Redirect to home or login page
  };
  