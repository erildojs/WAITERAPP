import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = []
export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕐" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👩‍🍳" title="Em Preparacao" orders={orders} />
      <OrdersBoard icon="💹" title="Pronto" orders={orders} />
    </Container>
  )
}