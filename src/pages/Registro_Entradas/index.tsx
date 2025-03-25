import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ContentHeader from "../../components/ContentHeader";

// Estilos com Styled Components
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
`;

const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.white};
`;

const SelectContainer = styled.div`
  margin-bottom: 20px;
  .react-select__control {
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: none;
    transition: all 0.3s ease;
  }
  .react-select__control:hover {
    border-color: #bbb;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListItemName = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
`;

const ListItemQuantity = styled.span`
  font-size: 1.1rem;
  color: #555;
`;

const BackButton = styled.button`
  width: 100px;
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

// Definindo interfaces
interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidade: number;
}

interface Funcionario {
  id: number;
  nome: string;
}

interface Categoria {
  value: string;
  label: string;
}

// Dados Mock
const mockProdutos: Produto[] = [
  { id: 1, nome: 'Produto 1', categoria: 'bebida', preco: 5.0, quantidade: 10 },
  { id: 2, nome: 'Produto 2', categoria: 'lanche', preco: 10.0, quantidade: 15 },
  { id: 3, nome: 'Produto 3', categoria: 'doce', preco: 3.0, quantidade: 20 },
];

const mockFuncionarios: Funcionario[] = [
  { id: 1, nome: 'Funcionário 1' },
  { id: 2, nome: 'Funcionário 2' },
];

const mockCategorias: Categoria[] = [
  { value: 'bebida', label: 'Bebida' },
  { value: 'lanche', label: 'Lanche' },
  { value: 'doce', label: 'Doce' },
];



const RegistroEntradas: React.FC = () => {

    const navigate = useNavigate(); 

  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(mockFuncionarios);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);
  const [data, setData] = useState<string>('');

  const handleAddVenda = () => {
    if (produtoSelecionado && funcionarioSelecionado && quantidade > 0 && data) {
      alert(`Venda registrada! Produto: ${produtoSelecionado.nome}, Funcionário: ${funcionarioSelecionado.nome}, Quantidade: ${quantidade}, Data: ${data}`);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (

    <div>

    <ContentHeader title="Registro" lineColor="#4E41F0">
    <h2></h2>
        <BackButton onClick={() => navigate("/controle_estoque")}>
        <IoArrowBack size={16}/> Voltar
        </BackButton>

  </ContentHeader>

    <Container>
      <ContainerForm>
        <Title>Registro de Entradas</Title>

        {/* Select Categoria */}
        <SelectContainer>
          <Select
            options={mockCategorias}
            onChange={(selected) => setCategoriaSelecionada(selected ? selected.value : '')}
            placeholder="Selecione a Categoria"
            value={mockCategorias.find((cat) => cat.value === categoriaSelecionada)}
          />
        </SelectContainer>

        {/* Select Produto */}
        <SelectContainer>
          <Select
            options={produtos.filter(produto => produto.categoria === categoriaSelecionada).map(produto => ({
              value: produto.id,
              label: produto.nome
            }))}
            onChange={(selected) => setProdutoSelecionado(produtos.find(prod => prod.id === selected?.value) || null)}
            placeholder="Selecione o Produto"
          />
        </SelectContainer>

        {/* Input Quantidade */}
        <Input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />

        {/* Input Data */}
        <Input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <Button onClick={handleAddVenda}>Registrar Venda</Button>
      </ContainerForm>

      <Title>Lista de Produtos</Title>
      <List>
        {produtos.map(produto => (
          <ListItem key={produto.id}>
            <ListItemName>{produto.nome}</ListItemName>
            <ListItemQuantity>{produto.quantidade}</ListItemQuantity>
          </ListItem>
        ))}
      </List>
    </Container>
    </div>
  );
};

export default RegistroEntradas;
