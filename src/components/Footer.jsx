import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: #000;
  color: #fff;
  padding: 10px;
  text-align: center;
  margin-top: 30px;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Plan Your Journey</p>
    </FooterContainer>
  );
};

export default Footer;
