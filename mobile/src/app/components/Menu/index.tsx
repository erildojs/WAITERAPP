import { products } from "@/app/mocks/products";
import { FlatList, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { AddToCardButton, Image, Product, ProductDetails, Separator } from "./styles";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";

export function Menu() {
  return (
    <FlatList
      data={products}
      keyExtractor={product => product._id}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <Product>
          <Image
            //no mandroid o endereço é o ip
            source={{ uri: `http://192.168.0.252:3001/uploads/${product.imagePath}` }}
          />
          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text size={14} color="#666" style={{ marginVertical: 8 }}>{product.description}</Text>
            <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
          </ProductDetails>

          <AddToCardButton onPress={() => { }}>
            <PlusCircle />
          </AddToCardButton>
        </Product>
      )}
    />
  )
}