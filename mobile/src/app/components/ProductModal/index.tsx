import React from "react";
import { FlatList, Modal } from "react-native";
import { Text } from "../Text";
import { CloseButton, Footer, FooterContainer, Header, Image, Ingredient, IngredientsContainer, ModalBody, PriceContainer } from "./styles";
import { Product } from "@/app/types/Product";
import { Close } from "../Icons/Close";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Button } from "../Button";

type ProductModalProps = {
  visible: boolean
  onClose: () => void
  product: null | Product
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
  if (!product) return null

  function handleAddToCart() {
    onAddToCart(product!)
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide"
      presentationStyle="pagrSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{ uri: `http://192.168.0.252:3001/uploads/${product.imagePath}` }}
      >
        <CloseButton onpress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text weight="600" size={24}>{product.name}</Text>
          <Text color="#666" style={{ marginTop: 8 }}>{product.description}</Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight="600" color="#666">Ingredients</Text>
            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text color="#666" size={14} style={{ marginLeft: 20 }}>{ingredient.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text weight="600" size={20}>{formatCurrency(product.price)}</Text>
          </PriceContainer>
          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  )
}