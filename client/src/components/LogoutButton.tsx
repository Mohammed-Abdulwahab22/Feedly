import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStorage } from '../utils/storage';
import { toast } from 'react-toastify';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await clearStorage();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default LogoutButton;
