import React, { useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4e41f0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #4e41f0;
  color: white;
  padding: 10px;
  text-align: left;
  white-space: nowrap; 
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;

const ThNome = styled(Th)`
  width: 300px; 
`;

const ThAcoes = styled(Th)`
  width: 100px; 
  text-align: center;
`;

const TdNome = styled(Td)`
  width: 250px;
`;

const TdAcoes = styled(Td)`
  width: 150px;
  text-align: center;
`;


const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  margin-left: 5px;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:first-child {
    background-color: #f0ad4e;
    color: white;
  }
  
  &:last-child {
    background-color: #d9534f;
    color: white;
  }
`;

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

const CadastroFuncionario: React.FC = () => {

  const navigate = useNavigate(); 

  const [funcionarios, setFuncionarios] = useState<{ id: number; nome: string }[]>([]);
  const [nome, setNome] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editando, setEditando] = useState<number | null>(null); 

  const itemsPerPage = 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    if (editando !== null) {
      
      setFuncionarios(funcionarios.map((func) => (func.id === editando ? { ...func, nome } : func)));
      setEditando(null);
    } else {
      
      setFuncionarios([...funcionarios, { id: Date.now(), nome }]);
    }

    setNome("");
  };

  const handleEdit = (id: number) => {
    const funcionario = funcionarios.find((func) => func.id === id);
    if (funcionario) {
      setNome(funcionario.nome);
      setEditando(id);
    }
  };

  const handleDelete = (id: number) => {
    setFuncionarios(funcionarios.filter((func) => func.id !== id));
  };

  const filteredFuncionarios = funcionarios.filter((func) =>
    func.nome.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFuncionarios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFuncionarios = filteredFuncionarios.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <ContentHeader title="Cadastro de Funcionário" lineColor="#4E41F0" >
        
      <BackButton onClick={() => navigate("/controle_estoque")}>
      <IoArrowBack size={16}/> Voltar
      </BackButton>

      </ContentHeader>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Button type="submit">{editando !== null ? "Salvar Edição" : "Cadastrar"}</Button>
      </Form>

      <Input
        type="text"
        placeholder="Pesquisar funcionário..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "20px" }}
      />

      <TableContainer>
        <Table>
        <thead>
  <tr>
    <ThNome>Nome</ThNome>
    <ThAcoes>Ações</ThAcoes>
  </tr>
</thead>
<tbody>
  {currentFuncionarios.map((func) => (
    <tr key={func.id}>
      <TdNome>{func.nome}</TdNome>
      <TdAcoes>
        <ActionButton onClick={() => handleEdit(func.id)}>Editar</ActionButton>
        <ActionButton onClick={() => handleDelete(func.id)}>Excluir</ActionButton>
      </TdAcoes>
    </tr>
  ))}
</tbody>

        </Table>
      </TableContainer>

      <Pagination>
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Próxima
        </Button>
      </Pagination>
    </Container>
  );
};

export default CadastroFuncionario;
