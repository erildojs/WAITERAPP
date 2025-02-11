import { Actions, ModalBody, OrderDetails, Overlay } from "./styles";
import closeIcon from '../../assets/images/close-icon.svg'
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect } from "react";

type OverlayProps = {
  visible: boolean
  order: Order | null
  onClose: () => void
  onCancelOrder: () => Promise<void>
  isLoading: boolean
  onChangeOrderStatus: () => void
}

export function OrderModal({ visible, order, onClose, onCancelOrder, isLoading, onChangeOrderStatus }: OverlayProps) {
  //fechar o modal com esc
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    })
  }, [onClose])
  if (!visible || !order) {
    return null
  }

  const total = order.products.reduce((accumulator, { product, quantity }) => {
    return accumulator + (quantity * product.price)
  }, 0)

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa 2</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕐'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em produçao'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img src={`http:localhost:3333/uploads/${product.imagePth}`} alt={product.name} width="56" height="28.51" />
                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button type="button" className="primary" disabled={isLoading} onClick={onChangeOrderStatus}>
              <span>{order.status === 'WAITING' && '👨‍🍳'}</span>
              <span>{order.status === 'IN_PRODUCTION' && '✅'}</span>
              <strong>
                <span>{order.status === 'WAITING' && 'Iniciar Produçao'}</span>
                <span>{order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}</span>
              </strong>
            </button>
          )}
          <button type="button" className="secondary" onClick={onCancelOrder} disabled={isLoading}>
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  )
}