import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";
import { Container, Content, OrderHeader, Table } from "./styles";
import React from "react";

type HeaderProps = {
  selectedTable: string;
}

export function Header({ selectedTable }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
          <Text size={24} weight='700'>WAITER<Text size={24}>APP</Text></Text>
        </>
      )}
      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text size={24} weght="600">
              Pedido
            </Text>
            <TouchableOpacity>
              <Text color="#D73035" weght="600" size={14}>cancelar pedido</Text>
            </TouchableOpacity>
          </OrderHeader>
          <Table>
            <Text color="#666">Mesa {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  )
}