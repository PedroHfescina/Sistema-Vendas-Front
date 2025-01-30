import React, { useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import styled from "styled-components";

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
    variant === "edit" ? "#F7931B" : variant === "save" ? "#F7931B" : variant === "cancel" ? "#E44C4E" : "#E44C4E"};
  color: #fff;
  &:hover {
    opacity: 0.9;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductCard = styled.div`
  padding: 12px;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.warning};
`;

const ProductInfo = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 200px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4E41F0;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  margin-bottom: 7px;
  display: flex;
  flex-direction: column;
`;

const ProductDetailsEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-left: 300px;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
`;

const ProductDetailsEditLeft = styled.div`
  display: flex;
  gap: 10px;
`;


const ProductDetailsEditRight = styled.div`
  display: flex;
  gap: 10px;
`;

const List = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Coca-Cola", category: "Bebida", price: 5.00, quantity: 100 },
    { id: 2, name: "Chips", category: "Lanche", price: 3.00, quantity: 2000 },
    { id: 3, name: "Askov", category: "Bebida", price: 7.00, quantity: 15 },
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
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...editProduct, id } as Product : product)));
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
    filter === "all" ? products : products.filter((product) => product.category === filter);

  return (
    <div>
      <ContentHeader title="Lista de Produtos" lineColor="#4E41F0">
        <Select value={filter} onChange={handleFilterChange}>
          <option value="all">Todos</option>
          <option value="Bebida || Bebidas">Bebidas</option>
          <option value="Lanche || Lanches">Lanches</option>
          <option value="Doce || Doces">Doces</option>
        </Select>
      </ContentHeader>

      <ProductList>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            {editMode === product.id ? (
              <ProductDetailsEdit>
                <ProductDetailsEditLeft>
                <InputContainer>
                  <Label>Nome do Produto:</Label>
                  <Input
                    value={editProduct.name || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>Categoria:</Label>
                  <Input
                    value={editProduct.category || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                  />
                </InputContainer>
                </ProductDetailsEditLeft>
                <ProductDetailsEditRight>
                <InputContainer>
                  <Label>Preço:</Label>
                  <Input
                    type="number"
                    value={editProduct.price || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>Quantidade:</Label>
                  <Input
                    type="number"
                    value={editProduct.quantity || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, quantity: Number(e.target.value) })}
                  />
                </InputContainer>
                </ProductDetailsEditRight>
                <ProductActions>
                  <Button variant="save" onClick={() => handleSave(product.id)}>Salvar</Button>
                  <Button variant="cancel" onClick={handleCancel}>Cancelar</Button>
                </ProductActions>
              </ProductDetailsEdit>
            ) : (
              <>
                <ProductDetails>
                  <ProductName>{product.name}</ProductName>
                  <ProductInfo>Categoria: {product.category}</ProductInfo>
                  <ProductInfo>Preço: R$ {product.price.toFixed(2)}</ProductInfo>
                  <ProductInfo>Quantidade: {product.quantity}</ProductInfo>
                </ProductDetails>
                <ProductActions>
                  <Button variant="edit" onClick={() => handleEdit(product)}>Editar</Button>
                  <Button variant="delete" onClick={() => handleDelete(product.id)}>Excluir</Button>
                </ProductActions>
              </>
            )}
          </ProductCard>
        ))}
      </ProductList>
    </div>
  );
};

export default List;
