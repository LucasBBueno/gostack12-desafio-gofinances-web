import React from 'react';

import { NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <NavLink to="/transactions" activeStyle={{ color: '#ff872c' }}>
          Listagem
        </NavLink>

        <NavLink to="/import" activeStyle={{ color: '#ff872c' }}>
          Importar
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
