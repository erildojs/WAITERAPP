import React, { useState } from "react";
import { CartItem } from "@/app/types/CartItem";
import { Text } from "../Text";
import { FlatList, TouchableOpacity } from "react-native";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from "./styles";
import { Button } from "../Button";
import { Product } from "@/app/types/Product";
import { OrderConfirmModal } from "../OrderConfirmModal";
import { api } from "@/app/utils/api";

type CartProps = {
  cartItems: CartItem[]
  onAdd: (product: Product) => void
  onDecrement: (product: Product) => void
  onConfirmOrder: () => void
  selectedTable: string
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const total = cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0)
  async function handleConfirmOrder() {
    setIsLoading(true)
    const payload = {
      table: selectedTable,
      products: cartItems.map(cartItem => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    }
    await api.post('/orders', payload)
    setIsLoading(false)
    setIsModalVisible(true)
  }
  function handleOk() {
    onConfirmOrder()
    setIsModalVisible(false)
  }

  return (
    <>
      <OrderConfirmModal visible={isModalVisible} onClose={handleOk} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{ uri: `http://172.30.232.76:8081/uploads/${cartItem.product.imagePath}` }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">{cartItem.quantity}</Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">formatCurrency(total)</Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  )
}