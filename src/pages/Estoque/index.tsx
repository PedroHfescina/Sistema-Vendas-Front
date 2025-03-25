import React, { useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const Select = styled.select`
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  margin-right: 30px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  height: 27px;
  width: 120px;
  margin-left: auto;
`;

const Button = styled.button<{ variant: "edit" | "save" | "delete" | "cancel" }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${({ variant }) =>
    variant === "edit" ? "#F7931B" : variant === "save" ? "#4CAF50" : variant === "cancel" ? "#E44C4E" : "#E44C4E"};
  color: #fff;
  &:hover {
    opacity: 0.9;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
  padding: 10px;
`;

const ProductCard = styled.div`
  padding: 15px;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.warning};
  margin-bottom: 5px;
  text-align: center;
`;

const ProductInfo = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  margin: 4px 0;
  span {
    font-weight: normal;
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
`;

const Input = styled.input`
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  text-align: center;
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

const List = () => {

  const navigate = useNavigate(); 

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Coca-Cola", category: "Bebida", price: 5.0, quantity: 100 },
    { id: 2, name: "Chips", category: "Lanche", price: 3.0, quantity: 2000 },
    { id: 3, name: "Askov", category: "Bebida", price: 7.0, quantity: 15 },
    { id: 5, name: "Coca-Cola", category: "Bebida", price: 5.0, quantity: 100 },
    { id: 6, name: "Chips", category: "Lanche", price: 3.0, quantity: 2000 },
    { id: 7, name: "Askov", category: "Bebida", price: 7.0, quantity: 15 },
    { id: 8, name: "Coca-Cola", category: "Bebida", price: 5.0, quantity: 100 },
    { id: 9, name: "Chips", category: "Lanche", price: 3.0, quantity: 2000 },
    { id: 4, name: "Askov", category: "Bebida", price: 7.0, quantity: 15 },
  ]);

  const [filter, setFilter] = useState<string>("all");
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Partial<Product>>({});

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleEdit = (product: Product) => {
    setEditMode(product.id);
    setEditProduct(product);
  };

  const handleSave = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...editProduct, id } as Product : product
      )
    );
    setEditMode(null);
    setEditProduct({});
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditProduct({});
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const filteredProducts =
    filter === "all" ? products : products.filter((product) => product.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <ContentHeader title="Estoque Cantina" lineColor="#4E41F0">
        <Select value={filter} onChange={handleFilterChange}>
          <option value="all">Todos</option>
          <option value="Bebida">Bebidas</option>
          <option value="Lanche">Lanches</option>
          <option value="Doce">Doces</option>
        </Select>

            <BackButton onClick={() => navigate("/controle_estoque")}>
            <IoArrowBack size={16}/> Voltar
            </BackButton>

      </ContentHeader>

      <ProductList>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            {editMode === product.id ? (
              <Input 
                value={editProduct.name || ""} 
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} 
              />
            ) : (
              <ProductName>{product.name}</ProductName>
            )}
            <ProductInfo>Categoria: <span>{product.category}</span></ProductInfo>
            <ProductInfo>Preço: <span>R$ {product.price.toFixed(2)}</span></ProductInfo>
            <ProductInfo>Quantidade: <span>{product.quantity}</span></ProductInfo>
            <ProductActions>
              {editMode === product.id ? (
                <>
                  <Button variant="save" onClick={() => handleSave(product.id)}>Salvar</Button>
                  <Button variant="cancel" onClick={handleCancel}>Cancelar</Button>
                </>
              ) : (
                <>
                  <Button variant="edit" onClick={() => handleEdit(product)}>Editar</Button>
                  <Button variant="delete" onClick={() => handleDelete(product.id)}>Excluir</Button>
                </>
              )}
            </ProductActions>
          </ProductCard>
        ))}
      </ProductList>
    </div>
  );
};

export default List;
