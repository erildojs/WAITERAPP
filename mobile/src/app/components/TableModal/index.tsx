import { Modal, Platform, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Form, Header, Input, ModalBody, Overlay } from "./styles";
import { Close } from "../Icons/Close";
import { Button } from "../Button";
import { useState } from "react";

type TableModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
    setTable('');
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onchangeText={(value: any) => setTable(value)}
            />
            <Button
              onPress={handleSave} disabled={table.length === 0}

            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  )
}