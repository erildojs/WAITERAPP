import { useFonts } from 'expo-font'
import { Main } from "./Main";
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

export default function Index() {
  const [isFontsLoaded] = useFonts({
    GeneralSans400: require('./assets/fonts/GeneralSans-Regular.otf'),
    GeneralSans600: require('./assets/fonts/GeneralSans-Semibold.otf'),
    GeneralSans700: require('./assets/fonts/GeneralSans-Bold.otf'),
  })
  if (!isFontsLoaded) return null
  return (
    <Main />
  );
}
