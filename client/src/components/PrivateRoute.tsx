import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../utils/storage"; 

const PrivateRoute = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkToken = async () => {
      const token = await getItem<string>("token"); // Specify the expected type of the token
      setIsAuthenticated(!!token); // Convert token (string | null) to boolean
    };

    checkToken();
  }, []); 

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;