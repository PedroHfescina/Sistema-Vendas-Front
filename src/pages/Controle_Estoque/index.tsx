import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaBoxOpen, FaSignInAlt, FaFileAlt, FaShoppingCart, FaSignOutAlt, FaUsers, FaClipboardList } from "react-icons/fa";
import styled from "styled-components";
import ContentHeader from "../../components/ContentHeader";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  padding: 25px;
  text-align: center;
`;



const Card = styled.div`
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 10px;
  margin-top: 20px;
  margin: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 40px;
    margin-bottom: 10px;
    color: #007bff;
  }
`;

const ControleEstoque = () => {
  const navigate = useNavigate();

  const options = [
    { icon: <FaUsers />, label: "Funcionários", path: "/funcionarios" },
    { icon: <FaBoxOpen />, label: "Estoque", path: "/estoque" },
    { icon: <FaClipboardList />, label: "Cadastro de Produto", path: "/cadastro_estoque" },
    { icon: <FaSignInAlt />, label: "Entradas", path: "/entradas" },
    { icon: <FaFileAlt />, label: "Registro de Entradas", path: "/registro-entradas" },
    { icon: <FaShoppingCart />, label: "Vendas", path: "/vendas" },
    { icon: <FaSignOutAlt />, label: "Saídas", path: "/saidas" },
  ];

  return (

   <div>

    <ContentHeader title="Painel de Controle" lineColor="#4E41F0" >
         <h2></h2>
    </ContentHeader>

    <Container>
      {options.map((item, index) => (
        <Card key={index} onClick={() => navigate(item.path)}>
          {item.icon}
          <span>{item.label}</span>
        </Card>
      ))}
    </Container>
    </div>
  );
};

export default ControleEstoque;
