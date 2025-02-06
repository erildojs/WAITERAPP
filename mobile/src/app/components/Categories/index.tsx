import { useState } from "react";
import { Text } from "../Text";
import { CategoryContainer, Icon } from "./styles";
import { FlatList } from "react-native";
import { Category } from "@/app/types/Category";

type CategoryProps = {
  categories?: Category[]
}

export function Categories({ categories }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState('')
  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? null : categoryId
    setSelectedCategory(categoryId)
  }

  return (
    <FlatList horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id
        return (
          <CategoryContainer
            onPress={() => handleSelectCategory(category._id)}
          >
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>
            <Text size={14} weight="600">{category.name}</Text>
          </CategoryContainer>
        )
      }}
    />
  )
}