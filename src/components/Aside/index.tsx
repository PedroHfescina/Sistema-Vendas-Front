import React, { useState } from "react";
import LogoImg from "../../assets/logo.svg";
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdAddShoppingCart,  MdClose, MdMenu, MdBusiness } from 'react-icons/md';
import { Container, Header, LogImg, MenuContainer, MenuItemLink, Title, MenuItemButton, ToggleMenu, ThemeToggleFooter } from './styles';
import Toggle from "../Toggler";
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import { useNavigate } from 'react-router-dom'; 

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);
  const navigate = useNavigate(); 

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  const handleLogout = () => {
    signOut();                                  // Realiza o botao logout
    navigate('/');                              // Redireciona para a pagina de login
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>

        <LogImg src={LogoImg} alt="Logo minha carteira" />
        <Title>Sistema de Vendas</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink as={Link} to="/">
          <MdDashboard />
          Dashboard
        </MenuItemLink>

        <MenuItemLink as={Link} to="/controle_estoque">
          <MdBusiness />
         Controle Estoque
        </MenuItemLink>

        <MenuItemButton onClick={handleLogout}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>

      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <Toggle
          labelLeft="Light"
          labelRight="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
