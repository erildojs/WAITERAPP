import React, { useState } from "react";
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from "./styles";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { ActivityIndicator } from "react-native";
import { products as mockProducts } from "../mocks/products";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  function handleSaveTable(table: string) {
    setSelectedTable(table)
  }

  function handleCancelOrder() {
    setSelectedTable('')
    setCartItems([])
  }
  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true)
    }
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id)
      if (itemIndex < 0) {
        return prevState.concat({ product, quantity: 1 })
      }
      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      }
      return newCartItems
    })
  }

  function handleDecrementCartItem(product: Product) {

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id)
      const item = prevState[itemIndex]
      const newCartItems = [...prevState]
      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)
        return newCartItems
      }
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      }
      return newCartItems
    })
  }

  function handleResetOrder() {
    setSelectedTable('')
    setCartItems([])
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />
        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator size="large" color="#D73035" />
          </CenteredContainer>
        )}
        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>
            <MenuContainer>
              <Menu onAddToCart={handleAddToCart} products={products} />
            </MenuContainer>
          </>
        )}
        {products.length > 0 ? (
          <MenuContainer>
            <Menu onAddToCart={handleAddToCart} products={products} />
          </MenuContainer>
        ) : (
          <CenteredContainer>
            <Empty />
            <Text style={{ marginTop: 24 }} color="#666">Nenhum produto foi encontrado</Text>
          </CenteredContainer>
        )}
      </Container>
      <Footer>
        <FooterContainer>//se der erro eh so comentar isso
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal visible={isTableModalVisible} onClose={() => setIsTableModalVisible(false)} onSave={handleSaveTable} />
    </>
  )
}