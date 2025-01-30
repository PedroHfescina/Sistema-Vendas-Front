import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import styled from "styled-components";

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
  name: string;
  category: string;
  price: string;
  quantity: string;
};

const CadastroProdutos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>({
    name: "",
    category: "",
    price: "",
    quantity: "",
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

      setFormData({ name: "", category: "", price: "", quantity: "" });

      console.log("Produto cadastrado com sucesso!", newProduct);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  const handleClick = () => {
    navigate("/list/entry-balance");
  };

  return (
    <Container>
      <ContentHeader title="Cadastro" lineColor="#E44C4E">
        <Page type="button" onClick={handleClick}>Ver Produtos</Page>
      </ContentHeader>

      <Questionario>
        <Title>Produtos</Title>
        <Form onSubmit={handleAddProduct}>
          <Select name="category" value={formData.category} onChange={handleInputChange} required>
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="bebidas">Bebidas</option>
            <option value="lanches">Lanches</option>
            <option value="doces">Doces</option>
          </Select>

          <Input type="text" name="name" placeholder="Nome do produto" value={formData.name} onChange={handleInputChange} required />

          <Input type="number" name="price" placeholder="Preço unitário" value={formData.price} onChange={handleInputChange} required />

          <Input type="number" name="quantity" placeholder="Quantidade inicial" value={formData.quantity} onChange={handleInputChange} required />

          <Button type="submit">Adicionar Produto</Button>
        </Form>
      </Questionario>
    </Container>
  );
};

export default CadastroProdutos;
