import { useFonts } from 'expo-font'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { Home } from '../screens/Home'

export default function Index() {
  const [isFontsLoaded] = useFonts({
    GeneralSans700: require('../assets/fonts/GeneralSans-Bold.otf'),
    GeneralSans400: require('../assets/fonts/GeneralSans-Regular.otf'),
    GeneralSans600: require('../assets/fonts/GeneralSans-Semibold.otf'),
  })
  if (!isFontsLoaded) return null
  return (
    <Home />
  );
}
