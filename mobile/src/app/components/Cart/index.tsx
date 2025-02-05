import React from "react";
import { CartItem } from "@/app/types/CartItem";
import { Text } from "../Text";
import { FlatList, TouchableOpacity } from "react-native";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from "./styles";
import { Button } from "../Button";

type CartProps = {
  cartItems: CartItem[]
}

export function Cart({ cartItems }: CartProps) {

  return (
    <>
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
                <TouchableOpacity style={{ marginRight: 24 }}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity>
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
              <Text size={20} weight="600">formatCurrency(120)</Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button onPress={() => alert()} disabled={cartItems.length === 0}>Confirmar pedido</Button>
      </Summary>
    </>
  )
}