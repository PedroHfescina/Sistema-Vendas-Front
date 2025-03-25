import React, { useState, ChangeEvent, FormEvent } from "react";
import ContentHeader from "../../components/ContentHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Container = styled.div``;

const Questionario = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 42px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 7px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => props.theme.colors.warning};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const Page = styled.button`
  width: 110px;
  height: 40px;
  margin-right: 43px;
  margin-top: 5px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.theme.colors.danger};
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px 2px ${(props) => props.theme.colors.primary};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.danger};
    transform: scale(0.98);
  }
`;

type Product = {
  nome: string;
  categoria: string;
  data: string; 
  preco: string;
};

const BackButton = styled.button`
  width: 105px;
  padding: 10px;
  border-radius: 7px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    text-decoration: none;
  }
`;

const CadastroProdutos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>({
    nome: "",
    categoria: "",
    data: "", 
    preco: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]);

      setFormData({ nome: "", categoria: "", data: "", preco: "" });

      console.log("Produto cadastrado com sucesso!", newProduct);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  const handleClick = () => {
    navigate("/estoque");
  };

  return (
    <Container>
      <ContentHeader title="Cadastro" lineColor="#E44C4E">
        <Page type="button" onClick={handleClick}>
          Ver Produtos
        </Page>

                      <BackButton onClick={() => navigate("/controle_estoque")}>
                      <IoArrowBack size={16}/> Voltar
                      </BackButton>

      </ContentHeader>

      <Questionario>
        <Title>Produtos</Title>
        <Form onSubmit={handleAddProduct}>
          <Select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="BEBIDAS">Bebidas</option>
            <option value="LANCHES">Lanches</option>
            <option value="DOCES">Doces</option>
          </Select>

          <Input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />

          <Input
            type="number"
            name="preco"
            placeholder="Preço unitário"
            value={formData.preco}
            onChange={handleInputChange}
            required
          />

          <Input
            type="date" 
            name="data"
            placeholder="Data (dia/mês/ano)"
            value={formData.data}
            onChange={handleInputChange}
            required
          />

          <Button type="submit">Adicionar Produto</Button>
        </Form>
      </Questionario>
    </Container>
  );
};

export default CadastroProdutos;
