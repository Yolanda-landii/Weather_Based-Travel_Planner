import React from 'react'; 
import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: #000;
  color: #fff;
  padding: 10px;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Plan Your Journey</p>
    </FooterContainer>
  );
};

export default Footer;
