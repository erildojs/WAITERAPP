import { Modal } from "react-native";
import { Text } from "../Text";
import { Container, OkButton } from "./styles";
import { CheckCircle } from "../Icons/CheckCircle";

type OrderConfirmModalProps = {
  visible: boolean
  onClose: () => void
}

export function OrderConfirmModal({ visible, onClose }: OrderConfirmModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>Pedido confirmado</Text>
        <Text opacity={0.9} color="#fff" style={{ marginTop: 4 }}>O pedido ja entrou na fila de produçao</Text>
        <OkButton onPress={onClose}><Text color="#D73035" weight="600">OK</Text></OkButton>
      </Container>
    </Modal>
  )
}