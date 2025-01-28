import { View } from "react-native";
import { useFonts } from 'expo-font'

export default function Index() {
  const [isFontsLoaded] = useFonts({
    GeneralSans400: require('../assets/fonts/GeneralSans-Regular.otf'),
    GeneralSans500: require('../assets/fonts/GeneralSans-Semibold.otf'),
    GeneralSans600: require('../assets/fonts/GeneralSans-Bold.otf'),
  })
  if (!isFontsLoaded) return null
  return (
    <View></View>
  );
}
