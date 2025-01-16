import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  color: white;
  background-color: #004AAD; /* Primary color matching the header */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #00357d; /* Darker shade for hover */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(2px); /* Subtle press effect */
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 10px 20px; /* Slightly smaller padding for smaller screens */
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 8px 16px; /* Adjust for very small screens */
    font-size: 0.8rem;
  }
`;

const Button = ({ label, onClick }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
