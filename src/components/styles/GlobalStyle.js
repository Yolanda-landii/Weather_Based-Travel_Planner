import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }

  .container {
    width: 80%;
    max-width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  input[type="text"], input[type="date"], input[type="time"] {
    padding: 10px;
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
  }

  input[type="text"]:focus, input[type="date"]:focus, input[type="time"]:focus {
    outline: none;
    border-color: #F4C561;
  }
  
  label {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;
