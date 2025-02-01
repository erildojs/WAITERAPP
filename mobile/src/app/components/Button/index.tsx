import { Text } from "../Text";
import { Container } from "./styles";

type ButtonProps = {
  children: string
  onPress: () => void
  disabled?: boolean
}

export function Button({ children, onPress, disabled }: ButtonProps) {

  return (
    <Container onpress={onPress} disabled={disabled}>
      <Text weight="600" color="#fff">{children}</Text>
    </Container>
  )
}