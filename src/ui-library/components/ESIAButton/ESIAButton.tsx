import { styled } from '@mui/system';
import React, { FC } from 'react';
import logo from '../../../../public/images/ESIALogo.png';

const StyledESIAButton = styled('button')`
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 48px;
  width: 320px;
  font-size: 13pt;
  color: #0d4cd3;
  background: transparent;
  border: 1px solid #0d4cd3;
  border-radius: 14px;
  cursor: pointer;
  transition: ease-in-out background-color 200ms;

  & img {
    margin-right: 16px;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`;

interface ESIAButtonProps {
  onClick: () => void;
}

export const ESIAButton: FC<ESIAButtonProps> = ({ onClick }) => {
  return (
    <StyledESIAButton type="button" onClick={onClick}>
      <img src={logo} alt="ESIA logo" />
      <p> Войти через Госуслуги</p>
    </StyledESIAButton>
  );
};
