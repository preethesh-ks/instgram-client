import React from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
const LogoutButton = () => {
  const handleLogout = () => {
    // Clear the local storage
    localStorage.clear();
  window.location.href = '/login'; 
  };

  return (
    <>
      <Button onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Button>
    </>
  );
   
};

export default LogoutButton;


export const handleLogout = () => {
  // Clear the local storage
  localStorage.clear();
  window.location.href = "/login"; 
};