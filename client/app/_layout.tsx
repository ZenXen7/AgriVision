import { Stack } from "expo-router";
import './globals.css';
import { useFonts } from 'expo-font';

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "SFRegular": require("../assets/fonts/SF-Regular.otf"),
    "SFProBold" : require("../assets/fonts/SFProBold.ttf"),
    "SFProMedium" : require("../assets/fonts/SFProMedium.ttf"),
 });

  return <Stack />;
}
