import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100vw; /* Ensures the header spans the full viewport width */
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px 0; /* Adjust padding as needed */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 3rem;
  color: #F4C561;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  letter-spacing: 2px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
`;

const HeaderSubTitle = styled.p`
  font-size: 1.2rem;
  color: #fff;
  margin-top: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Plan Your Next Adventure</HeaderTitle>
      <HeaderSubTitle>Discover your perfect destination, explore weather details, and find exciting activities!</HeaderSubTitle>
    </HeaderContainer>
  );
};

export default Header;
