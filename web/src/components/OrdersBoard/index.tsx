import { useState } from "react";
import { Order } from "../../types/Order";
import { Board, OrdersContainer } from "./styles";
import { OrderModal } from "../OrderModal";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

type OrdersBoardProps = {
  icon: string
  title: string
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)
  const [isLoading, setIsLoading] = useState(false)
  function handleOpenModal(order: Order) {
    setIsModalVisible(true)
    setSelectedOrder(order)
  }
  async function handleChangeOrderStatus() {
    setIsLoading(true)
    const newStatus = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE'
    await api.patch(`/orders/${selectedOrder?._id}`, { status: newStatus })
    toast.success(`Pedido da mesa ${selectedOrder!.table} teve o seu status alterado!`)
    onChangeOrderStatus(selectedOrder!._id, newStatus)
    setIsLoading(false)
    setIsModalVisible(false)
  }
  function handleCloseModal() {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }
  async function handleCancelOrder() {
    setIsLoading(true)
    await api.delete(`/orders/${selectedOrder?._id}`)
    toast.success(`Pedido da mesa ${selectedOrder!.table} foi cancelado!`)
    onCancelOrder(selectedOrder!._id)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder} onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} items</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  )
}