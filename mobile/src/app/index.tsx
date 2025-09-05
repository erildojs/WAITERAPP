import { Button } from "@/src/components/Button";
import { Cart } from "@/src/components/Cart";
import { Categories } from "@/src/components/Categories";
import { Header } from "@/src/components/Header";
import { Empty } from "@/src/components/Icons/Empty";
import { Menu } from "@/src/components/Menu";
import { TableModal } from "@/src/components/TableModal";
import { Text } from "@/src/components/Text";
import { CartItem } from "@/src/types/CartItem";
import { Category } from "@/src/types/Category";
import { Product } from "@/src/types/Product";
import { api } from "@/src/utils/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from "./styles";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data as Category[])
      setProducts(productsResponse.data as Product[])
      setIsLoading(false)
    })
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId ? '/products' : `/categories/${categoryId}/products`
    setIsLoadingProducts(true)
    const { data } = await api.get(route)
    setProducts(data as Product[])
    setIsLoadingProducts(false)
  }
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
              <Categories categories={categories} onSelectCategory={handleSelectCategory} />
            </CategoriesContainer>
            <MenuContainer>
              <Menu onAddToCart={handleAddToCart} products={products} />
            </MenuContainer>
          </>
        )}
        {isLoadingProducts ? (
          <CenteredContainer>
            <ActivityIndicator size="large" color="#D73035" />
          </CenteredContainer>
        ) : (
          <>
            {products.length > 0 ? (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            ) : (
              <CenteredContainer>
                <Empty />
                <Text style={{ marginBottom: 34 }} color="#666">Nenhum produto foi encontrado</Text>
              </CenteredContainer>
            )}
          </>
        )}

      </Container>
      <Footer>
        <FooterContainer>{/** //se der erro eh so comentar isso */}
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
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>
      <TableModal visible={isTableModalVisible} onClose={() => setIsTableModalVisible(false)} onSave={handleSaveTable} />
    </>
  )
}
