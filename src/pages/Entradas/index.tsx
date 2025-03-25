import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import ContentHeader from "../../components/ContentHeader";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { StylesConfig } from "react-select";

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: ${(props) => props.theme.colors.warning};
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const BackButton = styled.button`
  width: 105px;
  padding: 10px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    text-decoration: none;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#4E41F0" : "#ddd")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;

  &:hover {
    background-color: ${(props) => (props.active ? "#3C35D2" : "#ccc")};
  }
`;

 const Span = styled.span`
 margin-top: 5px;
 padding: 5px;
 `

const customStyles: StylesConfig<{ value: string; label: string }, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    color: "#000",
    borderColor: state.isFocused ? "#4E41F0" : "#ccc",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(78, 65, 240, 0.5)" : "none",
    "&:hover": {
      borderColor: "#4E41F0",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    color: "#000",
  }),
};

const entradasMock = [
  { produto: "Refrigerante", quantidade: 50, data: "2025-02-15" },
  { produto: "Salgado", quantidade: 30, data: "2025-02-10" },
  { produto: "Chocolate", quantidade: 20, data: "2025-02-05" },
  { produto: "Suco", quantidade: 25, data: "2025-01-20" },
  { produto: "Bolo", quantidade: 15, data: "2025-03-01" },
  { produto: "Café", quantidade: 40, data: "2025-02-28" },
  { produto: "Pão de queijo", quantidade: 35, data: "2025-01-15" },
  { produto: "Água", quantidade: 60, data: "2025-02-18" },
  { produto: "Chá", quantidade: 22, data: "2025-03-03" },
  { produto: "Sorvete", quantidade: 18, data: "2025-01-25" },
  { produto: "Biscoito", quantidade: 27, data: "2025-02-22" },
  { produto: "Hambúrguer", quantidade: 12, data: "2025-03-05" },
  { produto: "Pizza", quantidade: 10, data: "2025-02-07" },
  { produto: "Milkshake", quantidade: 19, data: "2025-01-30" },
  { produto: "Misto quente", quantidade: 23, data: "2025-02-12" }
];

const Entradas = () => {
  const navigate = useNavigate();
  
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Itens por página

  const meses = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  const anos = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
  ];

  const entradasFiltradas = entradasMock.filter((entrada) => {
    const [ano, mes] = entrada.data.split("-");
    return (
      (filtroMes ? mes === filtroMes : true) &&
      (filtroAno ? ano === filtroAno : true)
    );
  });

  const totalPages = Math.ceil(entradasFiltradas.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  
  const currentData = entradasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div>
      <ContentHeader title="Entradas" lineColor="#4E41F0">
        <BackButton onClick={() => navigate("/controle_estoque")}>
          <IoArrowBack size={16}/> Voltar
        </BackButton>
      </ContentHeader>

      <Container>
        <Title>Entradas de Produtos</Title>
        <FilterContainer>
          <Select
            options={meses}
            placeholder="Filtrar por mês"
            onChange={(option) => setFiltroMes(option?.value || "")}
            styles={customStyles}
          />
          <Select
            options={anos}
            placeholder="Filtrar por ano"
            onChange={(option) => setFiltroAno(option?.value || "")}
            styles={customStyles}
          />
        </FilterContainer>
        <Table>
          <thead>
            <tr>
              <Th>Produto</Th>
              <Th>Quantidade</Th>
              <Th>Data</Th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entrada, index) => (
              <tr key={index}>
                <Td>{entrada.produto}</Td>
                <Td>{entrada.quantidade}</Td>
                <Td>{entrada.data.split("-").reverse().join("/")}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <PaginationButton
            active={currentPage > 1}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </PaginationButton>
          <Span>
            Página {currentPage} de {totalPages}
          </Span>
          <PaginationButton
            active={currentPage < totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </PaginationButton>
        </PaginationContainer>
      </Container>
    </div>
  );
};

export default Entradas;
