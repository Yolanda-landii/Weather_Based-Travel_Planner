import React from "react";

const Button = ({ color, label, onClick }) => {
  return (
    <button
      className={`button ${color}`}
      onClick={onClick}
    >
      {label}
      <style jsx>{`
        .button {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #00357d;
        }

        .button.blue {
          background-color: #004aad;
          color: white;
        }

        .button.red {
          background-color: #f44336;
          color: white;
        }

        .button.green {
          background-color: #4caf50;
          color: white;
        }
      `}</style>
    </button>
  );
};

export default Button;
