import { Stack } from "expo-router";
import './globals.css';
import { useFonts } from 'expo-font';

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Intero": require("../assets/fonts/Intero.otf"),
    "SFRegular": require("../assets/fonts/SF-Regular.otf"),
    "SFProBold" : require("../assets/fonts/SFProBold.ttf"),
    "SFProMedium" : require("../assets/fonts/SFProMedium.ttf"),
 });

  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
    
  </Stack>
}
