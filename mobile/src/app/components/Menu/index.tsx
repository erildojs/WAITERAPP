import { products } from "@/app/mocks/products";
import { FlatList } from "react-native";
import { Text } from "../Text";
import { AddToCardButton, Image, ProductContainer, ProductDetails, Separator } from "./styles";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import React, { useState } from "react";
import { Product } from "@/app/types/Product";

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
          <ProductContainer onpress={() => handleOpenModal(product)}
          >
            <Image
              //no mandroid o endereço é o ip
              source={{ uri: `http://192.168.0.252:3001/uploads/${product.imagePath}` }}
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