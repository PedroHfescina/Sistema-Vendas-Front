import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import ContentHeader from "../../components/ContentHeader";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

// Estilos com styled-components
const Container = styled.div``;

const ContainerForm = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`;

const Label = styled.label`
  display: block;
  padding: 12px 0px;
  color: ${(props) => props.theme.colors.white};
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 50%;
  padding: 12px;
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  border: none;
  margin: auto;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.theme.colors.danger};
  }
`;

const Button2 = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  border: none;
  margin-top: 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.theme.colors.danger};
  }
`;

const Resumo = styled.div`
  margin-bottom: 18px;
  margin-top: 30px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

// Estilos para o react-select
const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#fff", 
    borderRadius: "4px", 
    borderColor: "#ccc", 
    padding: "3px",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#E44C4E" : state.isFocused ? "#F1F1F1" : "#fff", 
    color: state.isSelected ? "#fff" : "#333", 
    padding: "10px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#333",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
};

// Definição dos tipos de dados
interface Funcionario {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface ItemVenda {
  funcionarioId: number;
  nome: string;
  produtoId: number;
  quantidade: number;
  preco: number;
  subtotal: number;
}

interface Venda {
  funcionarioId: string;
  itens: ItemVenda[];
  formaPagamento: string;
}

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


const Vendas = () => {

  const navigate = useNavigate(); 

  const [funcionarios] = useState<Funcionario[]>([
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Oliveira" },
    { id: 3, nome: "Carlos Pereira" },
    { id: 4, nome: "João Silva" },
    { id: 5, nome: "Maria Oliveira" },
    { id: 6, nome: "Carlos Pereira" },
    { id: 7, nome: "João Silva" },
    { id: 8, nome: "Maria Oliveira" },
    { id: 9, nome: "Carlos Pereira" },
    { id: 10, nome: "João Silva" },
    { id: 11, nome: "Maria Oliveira" },
    { id: 12, nome: "Carlos Pereira" },
  ]);

  const [produtos] = useState<Produto[]>([
    { id: 1, nome: "Lanche", preco: 5 },
    { id: 2, nome: "Refrigerante", preco: 3 },
    { id: 3, nome: "Doce", preco: 2 },
  ]);

  const [venda, setVenda] = useState<Venda>({
    funcionarioId: "",
    itens: [],
    formaPagamento: "",
  });

  const [itemTemp, setItemTemp] = useState<ItemVenda | null>(null); 

  // Função para adicionar item e resetar o formulário
  const adicionarItem = () => {
    if (!itemTemp) return;
    setVenda({
      ...venda,
      itens: [...venda.itens, itemTemp],
    });

    // Resetando os campos após adicionar
    setItemTemp({
      funcionarioId: 0,
      nome: "",
      produtoId: 0,
      quantidade: 0,
      preco: 0,
      subtotal: 0,
    });
  };

  const calcularTotalVenda = () => {
    return venda.itens.reduce((total, item) => total + item.subtotal, 0);
  };

  const funcionarioOptions = funcionarios.map((f) => ({
    value: f.id,
    label: f.nome,
  }));

  const produtoOptions = produtos.map((p) => ({
    value: p.id,
    label: `${p.nome} - R$${p.preco}`,
  }));

  const formaPagamentoOptions = [
    { value: "Desconto em folha", label: "Desconto em folha" },
    { value: "Pix", label: "Pix" },
    { value: "Débito", label: "Débito" },
    { value: "Crédito", label: "Crédito" },
  ];

  return (
    <Container>
      <ContentHeader title="Registro Vendas" lineColor="#E44C4E" >
        
       <BackButton onClick={() => navigate("/controle_estoque")}>
            <IoArrowBack size={16}/> Voltar
            </BackButton>

      </ContentHeader>
      <ContainerForm>
        <Title>Vendas</Title>

        {/* Selecionar Funcionário */}
        <Label>Funcionário:</Label>
        <Select
          styles={customSelectStyles}
          options={funcionarioOptions}
          onChange={(selectedOption: any) =>
            setItemTemp({ ...itemTemp, funcionarioId: selectedOption.value } as ItemVenda)
          }
        />

        {/* Adicionar Produtos */}
        <Label>Produto:</Label>
        <Select
          styles={customSelectStyles}
          options={produtoOptions}
          onChange={(selectedOption: any) =>
            setItemTemp({ ...itemTemp, produtoId: selectedOption.value, nome: selectedOption.label, preco: produtos.find(p => p.id === selectedOption.value)?.preco || 0 } as ItemVenda)
          }
        />
         <Label>Quantidade:</Label>
        <Input
          type="number"
          id="quantidade"
          min="1"
          onChange={(e) =>
            setItemTemp({ ...itemTemp, quantidade: parseInt(e.target.value) } as ItemVenda)
          }
        />

        <ButtonContainer>
          <Button onClick={adicionarItem}>Adicionar</Button>
        </ButtonContainer>

        {/* Resumo da Venda */}
        <Resumo>
          <h3>Resumo da Venda</h3>
          <List>
            {venda.itens.map((item, index) => (
              <ListItem key={index}> 
                {item.funcionarioId} | {item.nome}  |  {item.quantidade}x | R${(item.preco * item.quantidade).toFixed(2)}
              </ListItem>
            ))}
          </List>
        </Resumo>

        {/* Forma de Pagamento */}
        <Label>Forma de Pagamento:</Label>
        <Select
          styles={customSelectStyles}
          options={formaPagamentoOptions}
          onChange={(selectedOption: any) =>
            setVenda({ ...venda, formaPagamento: selectedOption.value })
          }
        />

        {/* Botão de Finalizar Venda */}
        <Button2>Finalizar Venda</Button2>
      </ContainerForm>
    </Container>
  );
};

export default Vendas;
