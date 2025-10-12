import React, { useState } from "react";
import { FlatList } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";
import { AddToCardButton, Image, ProductContainer, ProductDetails, Separator } from "./styles";

type MenuProps = {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product)
  }

  return (
    <>
      <ProductModal visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        keyExtractor={product => product._id}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}
          >
            <Image
              //no android o endereço é o ip
              source={{ uri: `http://192.168.8.32:3333/uploads/${product.imagePath}` }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>{product.description}</Text>
              <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCardButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCardButton>
          </ProductContainer>
        )
        }
      />
    </>
  )
}