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

type CartProps = {
  cartItems: CartItem[]
  onAdd: (product: Product) => void
  onDecrement: (product: Product) => void
  onConfirmOrder: () => void
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading] = useState(false)
  const total = cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0)
  function handleConfirmOrder() {
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
                  source={{ uri: `http://192.168.0.252:3001/uploads/${cartItem.product.imagePath}` }}
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